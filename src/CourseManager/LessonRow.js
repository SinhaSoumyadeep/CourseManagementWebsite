import React from 'react';
import logo from '../Images/lesson.png'


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
                                <h5 className="card-title">
                                    {this.props.lesson.title}
                                </h5>
                                <p className="card-text">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </p>
                                <a href="#" className="btn btn-primary">
                                    More...
                                </a>

                                <button  className="btn btn-danger" onClick={()=>{this.abc(this.props.lesson.id)}}>
                                    Delete
                                </button>

                                {/*<button  className="btn btn-danger" onClick={()=> {this.props.delete(this.props.lesson.id)}}>
                                    Delete
                                </button>*/}

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