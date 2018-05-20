import React from 'react';
import logo from '../Images/lesson.png'


export default class LessonRow extends React.Component {

    constructor(props){

        super(props)

    }


    render(){

        return (




                    <div className="col-sm-3">
                    <div className="card ">
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
                            <button  className="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    </div>

                    </div>


        )




    }
}