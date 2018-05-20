import React from 'react';
import logo from '../Images/lesson.png'
import LessonRow from "./LessonRow";
import LessonService from "../CourseService/LessonService";



export default class LessonList extends React.Component {



    constructor(props) {
        super(props);

        this.setIds = this.setIds.bind(this);
        this.lessonService = LessonService.instance;
        this.state = {courseId:'', moduleId: '', lessons:[]};


    }

    setIds(courseId, moduleId)
    {
        this.state.moduleId = moduleId;
        this.state.courseId  = courseId;
        this.findAllLessons()

    }

    componentDidMount() {
        this.setIds(this.props.match.params.courseId, this.props.match.params.moduleId);

    }

    componentWillReceiveProps(newProps){
        this.setIds(newProps.match.params.courseId, newProps.match.params.moduleId);

    }

    findAllLessons() {

        if(this.state.moduleId!='') {
            console.log(this.state.moduleId)
            this.lessonService.findAllLessonsForModule(this.state.courseId,this.state.moduleId).then((lessons) => {
                this.setState({lessons: lessons});
            });

        }

    }

    lessonRows() {
        var rows = this.state.lessons.map((lesson) => {
            return ( <LessonRow  lesson={lesson} key={lesson.id} />)

        });
        return (
            rows
        )
    }




    render(){

        return (

                <div>
                    <div className="row">


                            <div className="card-deck">
                                {this.lessonRows()}
                            </div>


                    </div>

                </div>

            )




    }
}