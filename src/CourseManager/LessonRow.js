import React from 'react';
import logo from '../Images/logo.jpg'


export default class LessonRow extends React.Component {

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


    render(){

        return (




                    <div className="col-sm-3">



                        <div className="card " >
                            <img className="card-img-top" src={logo} style={{height: "12px;"}}/>
                            <div className="card-body">

                                <h5 className="card-title" style={{textAlign: "center"}}>
                                    {this.props.lesson.title}
                                    <span className="float-right">
                                <button  className="btn btn-primary" >
                                    <i className="fa fa-ellipsis-h"></i>
                                </button>
                                        &nbsp;
                                        <button  className="btn btn-danger" onClick={()=>{this.abc(this.props.lesson.id)}}>
                                    <i className="fa fa-minus"></i>
                                </button>
                                                </span>
                                </h5>



                            </div>


                        </div>


                        <div className="modal5" id={"myModal"+this.props.lesson.id} style={{display: "none", zIndex: "78", width: "100%"}}>
                            <div className="modal-dialog">
                                <div className="modal-content" style={{width: "100%"}}>


                                    <div className="modal-body">
                                        Are You Sure?
                                        <span className="float-right">
                                <i className="fa fa-times" onClick={()=>{this.abc(this.props.lesson.id)}}></i>&nbsp;&nbsp;
                                            <i className="fa fa-check" onClick={()=>{this.delete(this.props.lesson.id)}}></i>
                                    </span>

                                    </div>

                                </div>
                            </div>
                        </div>




                    </div>








        )




    }
}