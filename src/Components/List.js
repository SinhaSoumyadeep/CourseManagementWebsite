import React from 'react'

export const List = ({widget,preview,headingTextChanged,changeOptn,nameChanged}) => {
    let selectElemLink
    let inputElem
    let nameElem



    return(

        <div>
            <h2> List </h2>
            <div hidden={preview}>

                <div className="heading">
                    <div className="WidgetName">
                        <input className="form-control" onChange={() => nameChanged(widget.id, nameElem.value)}
                               value={widget.widget_Name}
                               ref={node => nameElem = node} placeholder="Enter Widget Name"/>
                    </div>
                    <div className="headingInput">
                        <textarea className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                                  value={widget.text}
                                  ref={node => inputElem = node}
                                  placeholder="Enter Text..."/>
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

