import * as constants from "../constants/constants";
import $ from "jquery";

export const widgets = (state = {widgets: [], preview: false}, action) => {
    switch (action.type) {

        case constants.HEADING_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.NAME_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.widget_Name = action.widget_Name
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.LINK_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.linktext = action.linktext
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.LIST_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.listType = action.listType
                    }
                    return Object.assign({}, widget)
                })
            }
        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            }


        case constants.WIDGET_PREVIEW:
            return {
                widgets: state.widgets,
                preview: !state.preview
            }

        case constants.WIDGET_SAVE:
            let topicIdcheat= $(".storeTopic").val()
            let saveUrl= 'https://webdev-summer1-2018-sinha-sou.herokuapp.com/api/widget/save/TID'
            saveUrl= saveUrl.replace('TID',topicIdcheat)
            //alert(saveUrl)
            fetch(saveUrl, {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'}
            }).then(
                    window.location.replace("/topics/TID/widget".replace('TID',topicIdcheat))

            )

            return newState

        case constants.ADD_WIDGET:

            let wo
            if(state.widgets.length == 0)
            {
                wo = 0;
            }
            else
            {
                wo = state.widgets[state.widgets.length-1].widgetOrder+1
            }
            return {widgets: [...state.widgets,
                    {id: action.id,
                        widgetType: 'Heading',
                        topicId: action.topicId,
                        text: 'New Widget',
                        size: '1',
                        linktext: 'Link Text',
                        listType: '1',
                        widgetOrder: wo,
                        widget_Name: 'Default Name'

                    }]}
        case constants.DELETE_WIDGET:
            let delArr= state.widgets
            let widgetArr = delArr.filter(widget => widget.id == action.id)
            let widgetObj = widgetArr[0]
            fetch('https://webdev-summer1-2018-sinha-sou.herokuapp.com/api/widget/delete', {
                method: 'DELETE',
                body: JSON.stringify(widgetObj),
                headers: {
                    'content-type': 'application/json'}
            })
            newState = JSON.parse(JSON.stringify(state))
            newState.widgets = state.widgets.filter(widget => widget.id != action.id)
            return newState
        case constants.MOVE_UP:
            let index = state.widgets.indexOf(action.widget);
            if(index==0){
                return state;
            }
            else{

                newState = JSON.parse(JSON.stringify(state))
                newState.widgets.move(index, index - 1);
                newState.widgets[index].widgetOrder = index;
                newState.widgets[index - 1].widgetOrder = index - 1;
                return newState;
            }


        case constants.MOVE_DOWN:
            index = state.widgets.indexOf(action.widget);
            if(index == state.widgets.length-1)
            {
                return state;
            }
            else
            {
                newState = JSON.parse(JSON.stringify(state))
                newState.widgets.move(index, index + 1);
                newState.widgets[index].widgetOrder = index;
                newState.widgets[index + 1].widgetOrder = index + 1;
                return newState;
            }

        case constants.SET_WIDGET_TYPE:
            let newState = JSON.parse(JSON.stringify(state))
            index = newState.widgets.findIndex(function (widget) {
                return widget.id === action.id})
            newState.widgets[index].widgetType = action.widgetType
            return newState
        case constants.TOGGLE_EDITING:
            newState = JSON.parse(JSON.stringify(state))
            index = newState.widgets.findIndex(
                function (widget) {
                    return widget.id === action.id
                })
            newState.widgets[index].editing = action.editing
            return newState
        case constants.FIND_ALL_WIDGETS:
            newState = JSON.parse(JSON.stringify(state))
            newState.widgets = action.widgets
            return newState


        default: return state
    }
}

Array.prototype.move
    = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
