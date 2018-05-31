import React from 'react'

export const Image = ({widget,preview,headingTextChanged,nameChanged}) => {

    let inputElem
    let nameElem
    return(

        <div>
            <h2> Image </h2>
            <div hidden={preview}>
                <div className="WidgetName">
                    <input className="form-control" onChange={() => nameChanged(widget.id, nameElem.value)}
                           value={widget.widget_Name}
                           ref={node => nameElem = node} placeholder="Enter Widget Name"/>
                </div>

                <input className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                       value={widget.text}
                       ref={node => inputElem = node}/>

                <h3>Preview</h3>
            </div>
            <div className="form-control">
                {<img src={widget.text} alt=" " height="150" width="199" style={{overflow: "hidden"}}/>}
            </div>

        </div>
    )
}