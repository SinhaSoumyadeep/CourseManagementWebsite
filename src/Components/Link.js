import React from 'react'


export const Link = ({widget,preview,headingTextChanged,linkTextChanged,nameChanged}) => {

    let inputElem
    let linkElem
    let nameElem
    return(

        <div>
            <h2> Link</h2>
            <div hidden={preview}>

                <div className="WidgetName">
                    <input className="form-control" onChange={() => nameChanged(widget.id, nameElem.value)}
                           value={widget.widget_Name}
                           ref={node => nameElem = node}
                           placeholder="Enter Widget Name"/>
                </div>

                <input className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                       value={widget.text}
                       ref={node => inputElem = node}
                       placeholder="Enter URL"/>
                <br/>
                <input className="form-control" onChange={() => linkTextChanged(widget.id, linkElem.value)}
                       value={widget.linktext}
                       ref={node => linkElem = node}
                       placeholder="Enter Link Name"/>

                <h3>Preview</h3>
            </div>
            <div className="form-control">
                {<a href={widget.text} style={{color: "blue"}}>{widget.linktext}</a>}
            </div>

        </div>
    )
}
