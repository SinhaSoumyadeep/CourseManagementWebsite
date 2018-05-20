import React from 'react'
import { Link } from 'react-router-dom'



export default class CourseRow extends React.Component
{

    constructor(props){

        super(props)





    }






    courseRows() {

        var id = this.props.course.id;
        var navurl = "/course/".concat(id);
        return (


            <div className="list-group">
                <a  className="list-group-item list-group-item-action">

                    <Link to={`/course/${this.props.course.id}`}>
                        <i className="fa fa-folder"></i>
                        <span id="courseTitle"> {this.props.course.title}</span>


                    </Link>
                    <span className="float-right">


                    <i className="fa fa-times" id={this.props.course.id} onClick={()=>{this.props.delete(this.props.course.id)}}></i>

                    </span>

                </a>


            </div>




        )
    }


    render()
    {
        return(

            <div>

                {this.courseRows()}
            </div>



        )
    }
}