import React from 'react'
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import $ from 'jquery'








const headingTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: 'HEADING_TEXT_CHANGED',
        id: widgetId,
        text: newText
    })
)


const linkTextChanged = (dispatch, widgetId, newlinkText) => (
    dispatch({
        type: 'LINK_TEXT_CHANGED',
        id: widgetId,
        linktext: newlinkText
    })
)

const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: 'HEADING_SIZE_CHANGED',
        id: widgetId,
        size: newSize})
)

const Heading = ({widget,preview,headingTextChanged, headingSizeChanged}) => {
    let selectElem
    let inputElem
    return(

        <div>
            <h2> Heading </h2>
            <div hidden={preview}>

                <div className="heading">
                    <div className="headingInput">
                        <input className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                               value={widget.text}
                               ref={node => inputElem = node}/>
                    </div>
                    <div className="headingSelect">
                        <select className="form-control" onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                                value={widget.size}
                                ref={node => selectElem = node}>
                            <option value="1">Heading 1</option>
                            <option value="2">Heading 2</option>
                            <option value="3">Heading 3</option>
                            <option value="4">Heading 4</option>
                            <option value="5">Heading 5</option>
                            <option value="6">Heading 6</option>
                        </select>
                    </div>
                </div>
                <br/>
                <br/>

                <h3>Preview</h3>
            </div>


            <div className="form-control">
                {widget.size == 1 && <h1>{widget.text}</h1>}
                {widget.size == 2 && <h2>{widget.text}</h2>}
                {widget.size == 3 && <h3>{widget.text}</h3>}
                {widget.size == 4 && <h4>{widget.text}</h4>}
                {widget.size == 5 && <h5>{widget.text}</h5>}
                {widget.size == 6 && <h6>{widget.text}</h6>}
            </div>
        </div>
    )
}


const Paragraph = ({widget,preview,headingTextChanged, headingSizeChanged}) => {
    let selectElem
    let inputElem
    return(

        <div>
            <h2> Paragraph </h2>
            <div hidden={preview}>

                <textarea className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                       value={widget.text}
                       ref={node => inputElem = node}/>

                <h3>Preview</h3>
            </div>

            <div className="form-control">
                {<p>{widget.text}</p>}
            </div>

        </div>
    )
}



const Image = ({widget,preview,headingTextChanged}) => {

    let inputElem
    return(

        <div>
            <h2> Image </h2>
            <div hidden={preview}>

                <input className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                          value={widget.text}
                          ref={node => inputElem = node}/>

                <h3>Preview</h3>
            </div>
            <div className="form-control">
                {<img src={widget.text} alt=" " height="199" width="199"/>}
            </div>

        </div>
    )
}

const Link = ({widget,preview,headingTextChanged,linkTextChanged}) => {

    let inputElem
    let linkElem
    return(

        <div>
            <h2> Link</h2>
            <div hidden={preview}>

                <input className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                       value={widget.text}
                       ref={node => inputElem = node}/>
                <br/>
                <input className="form-control" onChange={() => linkTextChanged(widget.id, linkElem.value)}
                       value={widget.linktext}
                       ref={node => linkElem = node}/>

                <h3>Preview</h3>
            </div>
            <div className="form-control">
                {<a href={widget.text} style={{color: "blue"}}>{widget.linktext}</a>}
            </div>

        </div>
    )
}




const changeOptn = (dispatch, widgetId, newText) => (
    dispatch({
        type: 'LIST_CHANGED',
        id: widgetId,
        listType: newText
    })
)


const List = ({widget,preview,headingTextChanged,changeOptn}) => {
    let selectElemLink
    let inputElem



    return(

        <div>
            <h2> List </h2>
            <div hidden={preview}>

                <div className="heading">
                    <div className="headingInput">
                        <textarea className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                               value={widget.text}
                               ref={node => inputElem = node}/>
                    </div>
                    <div className="headingSelect">
                        <select className="form-control selOptn" onChange={()=>changeOptn(widget.id, selectElemLink.value)}
                                value={widget.listType}
                                ref={node => selectElemLink = node}>
                            <option value="1">Unordered</option>
                            <option value="2">Ordered</option>

                        </select>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <h3>Preview</h3>
            </div>


            <div className="form-control unordered">
                {
                    <ul>
                        {widget.listType == 1 && widget.text.split("\n").map((listItem) => {

                            return(
                                <li>
                                    {listItem}
                                </li>

                            )

                        })}

                    </ul>
                }
                {
                    <ol>
                        {widget.listType == 2 && widget.text.split("\n").map((listItem) => {

                            return(
                                <li>
                                    {listItem}
                                </li>

                            )

                        })}

                    </ol>
                }


            </div>

        </div>
    )
}





const dispathToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId, newText) => headingTextChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) => headingSizeChanged(dispatch, widgetId, newSize),
    linkTextChanged: (widgetId, newText) => linkTextChanged(dispatch, widgetId, newText),
    changeOptn: (widgetId, newText)=> changeOptn(dispatch, widgetId, newText)
})

const stateToPropsMapper = state => ({preview: state.widgets.preview})


const HeadingContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Heading)
const ParagraphContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Paragraph)
const ImageContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Image)
const LinkContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Link)
const ListContainer = connect(stateToPropsMapper, dispathToPropsMapper)(List)



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
export const preview = dispatch => (
    dispatch({type: 'WIDGET_PREVIEW'})
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
                <div className="ControlBtn">
                    <div className="saveBtn">
                        <button className="btn btn-primary" onClick={this.props.save}>
                            Save
                        </button>
                    </div>
                    <div className="previewBtn">
                        <label className="switch">
                            <input type="checkbox" onClick={this.props.preview}></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>


            <ul>
                {this.props.widgetListprops.widgets.map(widget => <WidgetContainer widgetList={this.props.widgetListprops.widgets} key={widget.id} preview={this.props.previewMode} widget={widget}/>)}
            </ul>
            </div>

        )
    }


}




const Widget = ({ widget,widgetList,preview,dispatch}) => {
    let select
    let editing





    return(

        <div className="widgetDiv">
            <div hidden={preview}>

                <div className="form-control" style={{height: "49px", paddingLeft: "781px"}}>



                    <div className="UpBtn" style={{display: widget.widgetOrder == '0'?'none':''}}>
                        <button className="btn btn-warning" onClick={() => {dispatch(moveUp(widget))}}><i
                            className="fa fa-arrow-up"></i></button>
                    </div>
                    <div className="DwnBtn" style={{display: widget.widgetOrder == (widgetList.length-1)?'none':''}}>
                        <button className="btn btn-warning" onClick={() => {dispatch(moveDown(widget))}}><i
                            className="fa fa-arrow-down"></i></button>
                    </div>
                    <div className="selectWidget">

                        <select className="form-control" ref={node => select = node} value={widget.widgetType}
                                onChange={e => {dispatch(setWidgetType(widget.id, select.value))}}>
                            <option>Heading</option>
                            <option>Paragraph</option>
                            <option>Image</option>
                            <option>List</option>
                            <option>Link</option>
                        </select>

                    </div>

                    <div className="DeleteBtn">
                        <button className="btn btn-danger " onClick={e => {dispatch({type: 'DELETE_WIDGET', id: widget.id})}}>
                            <i className="fa fa-times" style={{color: "white"}}></i></button>
                    </div>



                    <label>
                        <input ref={node => editing = node}
                               type="checkbox"
                               onChange={e => {
                                   dispatch(toggleEditing
                                   (widget.id, editing.checked))}}
                               checked={widget.editing}/> Editing
                    </label>
                </div>
            </div>
            <div>
                {widget.widgetType==='Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType==='Paragraph' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType==='Image' && <ImageContainer widget={widget}/>}
                {widget.widgetType==='Link' && <LinkContainer widget={widget}/>}
                {widget.widgetType==='List' && <ListContainer widget={widget}/>}
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

                <button style={{position: "sticky", zIndex: "56"}} className="btn btn-danger AddWidget" type="submit" onClick={e => {this.props.dispatch({ type: 'ADD_WIDGET', id: nextWidgetId++, topicId: this.props.topicId})}}>Add Widget
                </button>
            </div>
        )
    }

}





const widgets = (state = {widgets: [], preview: false}, action) => {
    switch (action.type) {

        case 'HEADING_TEXT_CHANGED':
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            }

        case 'LINK_TEXT_CHANGED':
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.linktext = action.linktext
                    }
                    return Object.assign({}, widget)
                })
            }

        case 'LIST_CHANGED':
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.listType = action.listType
                    }
                    return Object.assign({}, widget)
                })
            }
        case 'HEADING_SIZE_CHANGED':
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            }


        case 'WIDGET_PREVIEW':
            return {
                widgets: state.widgets,
                preview: !state.preview
            }

        case 'WIDGET_SAVE':
            let topicIdcheat= $(".storeTopic").val()
            let saveUrl= 'http://localhost:8080/api/widget/save/TID'
            saveUrl= saveUrl.replace('TID',topicIdcheat)
            alert(saveUrl)
            fetch(saveUrl, {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'}
            }).then(
                window.location.replace("/topics/TID/widget".replace('TID',topicIdcheat))
            )







            newState = JSON.parse(JSON.stringify(state))
            return newState

        case 'ADD_WIDGET':
            return {widgets: [...state.widgets,
                {id: action.id,
                    widgetType: 'Heading',
                    topicId: action.topicId,
                    text: 'New Widget',
                    size: '2',
                    linktext: 'Link Text',
                    listType: '1',
                    widgetOrder: state.widgets.length

                }]}
        case 'DELETE_WIDGET':
            let delArr= state.widgets
            let widgetArr = delArr.filter(widget => widget.id == action.id)
            let widgetObj = widgetArr[0]
            fetch('http://localhost:8080/api/widget/delete', {
                method: 'DELETE',
                body: JSON.stringify(widgetObj),
                headers: {
                    'content-type': 'application/json'}
            })
            newState = JSON.parse(JSON.stringify(state))
            newState.widgets = state.widgets.filter(widget => widget.id != action.id)
            return newState
        case 'MOVE_UP':
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


        case 'MOVE_DOWN':
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

        case 'SET_WIDGET_TYPE':
            let newState = JSON.parse(JSON.stringify(state))
            index = newState.widgets.findIndex(function (widget) {
                return widget.id === action.id})
            newState.widgets[index].widgetType = action.widgetType
            return newState
        case 'TOGGLE_EDITING':
            newState = JSON.parse(JSON.stringify(state))
            index = newState.widgets.findIndex(
                function (widget) {
                    return widget.id === action.id
                })
            newState.widgets[index].editing = action.editing
            return newState
        case 'FIND_ALL_WIDGETS':
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






const mapStateToProps = state => ({
    widgetListprops: state.widgets ,
    previewMode: state.widgets.preview
})

const dispatcherToPropsMapper = dispatch => ({
    findAllWidgets: (topicId) => findAllWidgets({topicId,dispatch}),
    save: () => save(dispatch),
    preview: () => preview(dispatch)

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


