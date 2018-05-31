import * as constants from "../constants/constants";

export const headingTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.HEADING_TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
)

export const nameChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.NAME_CHANGED,
        id: widgetId,
        widget_Name: newText
    })
)

export const linkTextChanged = (dispatch, widgetId, newlinkText) => (
    dispatch({
        type: constants.LINK_TEXT_CHANGED,
        id: widgetId,
        linktext: newlinkText
    })
)

export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize})
)

export const changeOptn = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.LIST_CHANGED,
        id: widgetId,
        listType: newText
    })
)


export const findAllWidgets = ({topicId,dispatch}) => {
    let fetchUrl = 'https://webdev-summer1-2018-sinha-sou.herokuapp.com/api/widget/TID'
    fetchUrl = fetchUrl.replace('TID',topicId)
    fetch(fetchUrl)
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets }))
}

export const save = dispatch => (
    dispatch({type: constants.WIDGET_SAVE})
)


export const preview = dispatch => (
    dispatch({type: constants.WIDGET_PREVIEW})
)



export const setTextWidget = (id, text) => ({type: 'SET_TEXT_WIDGET', id: id, text: text})


export const toggleEditing = (id, checked) => {
    return {
        type: constants.TOGGLE_EDITING,
        id: id,
        editing: checked
    }}


export const setWidgetType = (id, widgetType) => {
    return {
        type: constants.SET_WIDGET_TYPE,
        widgetType: widgetType, id: id
    }
}



export const moveUp = widget => {
    return {
        type: constants.MOVE_UP, widget: widget
    }
}

export const moveDown = widget => {
    return {
        type: constants.MOVE_DOWN, widget: widget
    }
}
