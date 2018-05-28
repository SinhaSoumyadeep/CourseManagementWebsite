import React from 'react'
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import $ from 'jquery'

const Heading = () => (
    <div>
        <h2>Heading</h2>
        <textarea></textarea>
    </div>
)
const Paragraph = () => (
    <div>
        <h2>Paragraph</h2>
        <textarea></textarea>
    </div>
)

const Image = () => (
    <div>
        <h2>Image</h2>
        <textarea></textarea>
    </div>

)

const List = () => (
    <div>
        <h2>List</h2>
        <textarea></textarea>
    </div>

)
export const findAllWidgets = ({topicId,dispatch}) => {
    let fetchUrl = 'http://localhost:8080/api/widget/TID'
    fetchUrl = fetchUrl.replace('TID',topicId)
    fetch(fetchUrl)
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: "FIND_ALL_WIDGETS",
            widgets: widgets }))
}

export const save = dispatch => (
    dispatch({type: 'WIDGET_SAVE'})
)



 class WidgetList extends React.Component{

    constructor(props)
    {
        super(props)
        this.props.findAllWidgets(this.props.topicId)
    }


     render(){

        return(
            <div>

                <button onClick={this.props.save}>
                    Save
                </button>
            <ul>
                {this.props.widgetListprops.map(widget => <WidgetContainer key={widget.id} widget={widget}/>)}
            </ul>
            </div>

        )
    }


}




const Widget = ({ widget, dispatch }) => {
    let select
    let editing
    return(

        <div>

            <div className="UpBtn">
                <button onClick={() => {dispatch(moveUp(widget))}}>^</button>
            </div>
            <div className="DwnBtn">
                <button onClick={() => {dispatch(moveDown(widget))}}>$</button>
            </div>
            <div className="selectWidget">

                <select ref={node => select = node} value={widget.widgetType}
                        onChange={e => {dispatch(setWidgetType(widget.id, select.value))}}>
                    <option>Heading</option>
                    <option>Paragraph</option>
                    <option>Image</option>
                    <option>List</option>
                </select>

            </div>

            <div className="DeleteBtn">
                <button onClick={e => {dispatch({type: 'DELETE_WIDGET', id: widget.id})}}>
                    Delete</button>
            </div>


            <label>
                <input ref={node => editing = node}
                       type="checkbox"
                       onChange={e => {
                           dispatch(toggleEditing
                           (widget.id, editing.checked))}}
                       checked={widget.editing}/> Editing
            </label>
            <div>
                {widget.widgetType==='Heading' && <Heading/>}
                {widget.widgetType==='Paragraph' && <Paragraph/>}
                {widget.widgetType==='List' && <List/>}
                {widget.widgetType==='Image' && <Image/>}
            </div>



            <div style={{display: widget.editing ? 'block': 'none'}}>
                <div style={{display: widget.widgetType ==='Heading' ? 'block': 'none'}}>
                    Heading
                </div>
                <div style={{display: widget.widgetType ==='Paragraph' ? 'block': 'none'}}>
                    Paragraph
                </div>
            </div>




        </div>


    )


}





const setTextWidget = (id, text) => ({type: 'SET_TEXT_WIDGET', id: id, text: text})


const toggleEditing = (id, checked) => {
    return {
        type: 'TOGGLE_EDITING',
        id: id,
        editing: checked
    }}


const setWidgetType = (id, widgetType) => {
    return {
        type: 'SET_WIDGET_TYPE',
        widgetType: widgetType, id: id
    }
}



const moveUp = widget => {
    return {
        type: 'MOVE_UP', widget: widget
    }
}

const moveDown = widget => {
    return {
        type: 'MOVE_DOWN', widget: widget
    }
}





let nextWidgetId =1000
class AddWidgetComponent extends React.Component {



    render(){
        return (

            <div>

                <button className="btn btn-danger AddWidget" type="submit" onClick={e => {this.props.dispatch({ type: 'ADD_WIDGET', id: nextWidgetId++, topicId: this.props.topicId})}}>Add Widget
                </button>
            </div>
        )
    }

}





const widgets = (state = [], action) => {
    switch (action.type) {

        case 'WIDGET_SAVE':
            let topicIdcheat= $(".storeTopic").val()
            let saveUrl= 'http://localhost:8080/api/widget/save/TID'
            saveUrl= saveUrl.replace('TID',topicIdcheat)
            alert(saveUrl)
            fetch(saveUrl, {
                method: 'post',
                body: JSON.stringify(state),
                headers: {
                    'content-type': 'application/json'}
            })

            newState = JSON.parse(JSON.stringify(state))
            return newState

        case 'ADD_WIDGET':
            return [...state,
                {id: action.id,
                    widgetType: 'Heading',
                    topicId: action.topicId}]
        case 'DELETE_WIDGET':
            let delArr= state.filter(widget => widget.id == action.id)
            let widgetObj = delArr[0]
            fetch('http://localhost:8080/api/widget/delete', {
                method: 'DELETE',
                body: JSON.stringify(widgetObj),
                headers: {
                    'content-type': 'application/json'}
            })
            return state.filter(widget => widget.id != action.id)
        case 'MOVE_UP':
            let index = state.indexOf(action.widget);
            if(index==0)
                return state;

            state.move(index, index - 1);
            return state.splice(0);

        case 'MOVE_DOWN':
            index = state.indexOf(action.widget);
            state.move(index, index + 1);
            return state.splice(0);
        case 'SET_WIDGET_TYPE':
            let newState = JSON.parse(JSON.stringify(state))
            index = newState.findIndex(function (widget) {
                return widget.id === action.id})
            newState[index].widgetType = action.widgetType
            return newState
        case 'TOGGLE_EDITING':
            newState = JSON.parse(JSON.stringify(state))
            index = newState.findIndex(
                function (widget) {
                    return widget.id === action.id
                })
            newState[index].editing = action.editing
            console.log(newState)
            return newState
        case 'FIND_ALL_WIDGETS':
            newState = JSON.parse(JSON.stringify(state))
            newState.widgets = action.widgets
            return newState.widgets


        default: return state
    }
}

Array.prototype.move
    = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};






const mapStateToProps = state => ({widgetListprops: state.widgets })

const dispatcherToPropsMapper = dispatch => ({
    findAllWidgets: (topicId) => findAllWidgets({topicId,dispatch}),
    save: () => save(dispatch)

})
const AddWidgetContainer = connect()(AddWidgetComponent)
const WidgetListContainer = connect(mapStateToProps,dispatcherToPropsMapper)(WidgetList)
const WidgetContainer = connect()(Widget)

const rootReducer = combineReducers({ widgets })
const store = createStore(rootReducer)


class App extends React.Component{


    render(){

        return(

            <div>
                <WidgetListContainer topicId={this.props.topicId}/>
                <AddWidgetContainer topicId={this.props.topicId}/>
            </div>

        )
    }






}










export default class WidgetListModule extends React.Component{

    constructor(props)
    {
        super(props)

    }
    componentDidMount() {
        $(".storeTopic").val(this.props.match.params.topicId)



    }


    render()
    {

        return(
                    <div>
                        <input className="storeTopic" hidden/>
                        <Provider store={store}><App topicId={this.props.match.params.topicId}/></Provider>
                    </div>


        )
    }

}


