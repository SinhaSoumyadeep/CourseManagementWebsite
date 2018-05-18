import React from 'react'
import { Link } from 'react-router-dom'



export default class CourseRow extends React.Component
{

    constructor(props){

        super(props)





    }






    courseRows() {
        return (


                <li className="list-group-item">
                    <Link to={`/course/${this.props.course.id}`}>
                        {this.props.course.title}
                    </Link>
                    <span className="float-right">
                    <i className="fa fa-trash" id={this.props.course.id} onClick={()=>{this.props.delete(this.props.course.id)}}></i>
                    </span>

               </li>


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