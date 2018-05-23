import React from 'react';
import logo from '../Images/logo.jpg'


export default class TopicRows extends React.Component {

    constructor(props){

        super(props)

    }


    render(){

        return(

            <div>


                <div className="jumbotron">
                    <i className="fa fa-times" style={{float:"right"}} onClick={()=>{this.props.delete(this.props.topics.id)}}></i>
                    <h1 className="display-4">{this.props.topics.title}</h1>
                    <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra
                        attention to featured content or information.</p>
                    <hr className="my-4"/>
                        <p>It uses utility classes for typography and spacing to space content out within the larger
                            container.</p>
                        <p className="lead">
                            <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                        </p>

                </div>
            </div>








                )




    }
}