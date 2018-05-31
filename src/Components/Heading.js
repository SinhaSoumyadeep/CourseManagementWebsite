
import React from 'react'
export const Heading = ({widget,preview,headingTextChanged,nameChanged,headingSizeChanged}) => {
    let selectElem
    let inputElem
    let nameElem
    return(

        <div>
            <h2> Heading </h2>
            <div hidden={preview}>

                <div className="heading">
                    <div className="WidgetName">
                        <input className="form-control" onChange={() => nameChanged(widget.id, nameElem.value)}
                               value={widget.widget_Name}
                               ref={node => nameElem = node}  placeholder="Enter Widget Name"/>
                    </div>
                    <div className="headingInput">
                        <input className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                               value={widget.text}
                               ref={node => inputElem = node}
                               placeholder="Enter Heading"/>
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

