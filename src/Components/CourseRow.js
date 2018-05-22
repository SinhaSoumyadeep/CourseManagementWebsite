
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Images/logo.jpg'



export default class CourseRow extends React.Component
{

    constructor(props){

        super(props)


    }

    abc(id)
    {

        var x = document.getElementById("myModal"+id);
        if (x.style.display == "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }

    }

    delete(id)
    {
        this.props.delete(id);
        this.abc(id);
    }

    courseRows() {

        var id = this.props.course.id;
        var createdDate = this.props.course.created;
        var cd= String(createdDate).substring(0,10)
        var navurl = "/course/".concat(id);

        return (








            <div className="list-group">

                <a  className="list-group-item list-group-item-action">

                    <Link to={`/course/${this.props.course.id}`} style={{textDecoration: "none"}}>

                            <div id="courseFolder" style={{display: "inline-block"}}><i className="fa fa-folder"></i></div>
                            <div id="courseTitle" style={{display: "inline-block"}}> {this.props.course.title}</div>
                            <div id="courseOwner" style={{display: "inline-block"}}> {this.props.course.owner}</div>
                            <div id="courseCreated" style={{display: "inline-block"}}> {cd}</div>




                    </Link>
                    <span className="float-right">

                <i className="fa fa-times" id={this.props.course.id} onClick={()=>{this.abc(this.props.course.id)}}></i>


                    </span>


                </a>



                <div className="modal2" id={"myModal"+this.props.course.id} style={{display: "none", position: "fixed", zIndex: "45", width: "100%"}}>
                    <div className="modal-dialog">
                        <div className="modal-content">


                            <div className="modal-body">
                                Are You Sure?
                                <span className="float-right">
                                <i className="fa fa-times" onClick={()=>{this.abc(this.props.course.id)}}></i>&nbsp;&nbsp;
                                <i className="fa fa-check" onClick={()=>{this.delete(this.props.course.id)}}></i>
                                    </span>

                            </div>





                        </div>
                    </div>
                </div>

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