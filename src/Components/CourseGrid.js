
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Images/logo.jpg'



export default class CourseGrid extends React.Component
{

    constructor(props){

        super(props)


    }

    abc(id)
    {

        var x = document.getElementById("myModalForCourse"+id);

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


    render(){

        return (




            <div >



                <div className="card " >
                    <img className="card-img-top" src={logo} style={{height: "12px;"}}/>
                    <div className="card-body">

                        <h6 className="card-title" style={{textAlign: "center"}}>
                            {this.props.course.title}
                            <span className="float-right">
                                <Link to={`/course/${this.props.course.id}`} style={{textDecoration: "none"}}>
                                <button  className="btn btn-primary" >
                                    <i className="fa fa-ellipsis-h"></i>
                                </button>
                                </Link>
                                &nbsp;
                                <button  className="btn btn-danger" onClick={()=>{this.abc(this.props.course.id)}}>
                                    <i className="fa fa-minus" ></i>
                                </button>
                                                </span>
                        </h6>



                    </div>


                </div>
                <div className="modal5" id={"myModalForCourse"+this.props.course.id} style={{ display: "none",zIndex: "78", width: "100%"}}>
                    <div className="modal-dialog">
                        <div className="modal-content" style={{width: "100%"}}>


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


}