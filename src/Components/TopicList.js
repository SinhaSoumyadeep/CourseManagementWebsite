import React from 'react';
import logo from '../Images/lesson.png'
import TopicService from "../Service/TopicService";
import TopicRows from "./TopicRows";




export default class TopicList extends React.Component {



    constructor(props) {
        super(props);

        this.topicService = TopicService.instance;
        this.deleteTopic = this.deleteTopic.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.state = {lessonId:'', topics:[]};


    }

    setIds(lessonId)
    {

        this.state.lessonId = lessonId;
        this.findAllTopics()


    }

    componentDidMount() {
        this.setIds(this.props.match.params.lessonId);

    }

    componentWillReceiveProps(newProps){
        this.setIds(newProps.match.params.lessonId);

    }

    findAllTopics() {

        if(this.state.lessonId!='') {
            console.log(this.state.lessonId)

            this.topicService.findAllTopicsForLessons(this.state.lessonId).then((topics) => {
                this.setState({topics: topics});
            });



        }

    }

    topicRows() {
        var rows = this.state.topics.map((topics) => {
            return ( <TopicRows delete={this.deleteTopic}topics={topics} key={topics.id} />)

        });
        return (
            rows
        )
    }

    createTopic() {

        var topicValIn = this.refs.topicInput.value;

        if(topicValIn!='')
        {
            var topicObjUser = {title: topicValIn};
            this.topicService.createTopicForLesson(this.state.lessonId, topicObjUser)
                .then(() => { this.findAllTopics() });
        }
        else {

            var topicObj = {title: "DefaultTopic"};

            this.topicService.createTopicForLesson(this.state.lessonId, topicObj)
                .then(() => { this.findAllTopics() });
        }


    }

    deleteTopic(id) {
        console.log("inside delete module "+id)
        this.topicService
            .deleteTopic(id).then(() => { this.findAllTopics() });

    }









    render(){

        return (

            <div>

                <div className="navbar">
                    <div id ="home">
                        <a href="http://localhost:3000/courses">
                            <i className="fa fa-home"></i>
                        </a>
                    </div>
                    <div id="text">
                        <h6>Topics</h6>
                    </div>
                    <div id="inputFld">
                        <input className="form-control" ref="topicInput" placeholder="Topics"/>
                    </div>
                    <div id="btnFld">
                        <button className="btn btn-danger btn-block" onClick={this.createTopic}>
                            <i className="fa fa-plus" ></i>
                        </button>
                    </div>
                    <div id="extra">

                    </div>

                </div>


                <div className="row">


                    <div className="card-deck" style={{margin: "80px"}}>
                        {this.topicRows()}
                    </div>

                </div>


            </div>

        )




    }
}