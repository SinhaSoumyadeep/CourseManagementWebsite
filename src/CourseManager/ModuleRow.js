import React from 'react'
import { Link } from 'react-router-dom'



export default class ModuleRow extends React.Component
{

    constructor(props){

        super(props)





    }


    ModuleRows() {
        return (


            <li className="list-group-item">

                    {this.props.module.title}

                <span className="float-right">
                    <i className="fa fa-trash" id={this.props.module.id} onClick={()=>{this.props.delete(this.props.module.id)}}></i>
                    </span>

            </li>


        )
    }


    render()
    {
        return(

            <div>

                {this.ModuleRows()}
            </div>



        )
    }

}