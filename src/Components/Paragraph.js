import React from 'react'
export const Paragraph = ({widget,preview,headingTextChanged, headingSizeChanged,nameChanged}) => {
    let selectElem
    let inputElem
    let nameElem
    return(

        <div>
            <h2> Paragraph </h2>
            <div hidden={preview}>

                <div className="WidgetName">
                    <input className="form-control" onChange={() => nameChanged(widget.id, nameElem.value)}
                           value={widget.widget_Name}
                           ref={node => nameElem = node}
                           placeholder="Enter Widget Name"/>
                </div>
                <textarea className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                          value={widget.text}
                          ref={node => inputElem = node} placeholder="Enter Text..."/>

                <h3>Preview</h3>
            </div>

            <div className="form-control">
                {<p>{widget.text}</p>}
            </div>

        </div>
    )
}