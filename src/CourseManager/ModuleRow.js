import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'




export default class ModuleRow extends React.Component
{

    constructor(props){

        super(props)





    }


    ModuleRows() {
        return (

            <div className="list-group">
                <a  className="list-group-item list-group-item-action">

                    <Link to={`/course/${this.props.courseid}/module/${this.props.module.id}`}>
                        <i className="fa fa-folder"></i>
                        <span id="courseTitle"> {this.props.module.title}</span>
                    </Link>


                    <span className="float-right">
                    <i className="fa fa-times" id={this.props.module.id} onClick={()=>{this.props.delete(this.props.module.id)}}></i>
                    </span>

                </a>


            </div>





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