import React from 'react';
import logo from '../Images/lesson.png'
import LessonRow from "./LessonRow";
import LessonService from "../CourseService/LessonService";



export default class LessonList extends React.Component {



    constructor(props) {
        super(props);

        this.setIds = this.setIds.bind(this);
        this.setLessonTitle= this.setLessonTitle.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.lessonService = LessonService.instance;
        this.state = {courseId:'', moduleId: '', lessons:[]};


    }

    deleteLesson(lessonid)
    {

        this.lessonService
            .deleteLesson(lessonid).then(() => { this.findAllLessons() });



    }

    setLessonTitle(event)
    {

        console.log(event.target.value)
        this.setState({
            lesson: { title: event.target.value }
        });

    }

    abc()
    {

        var x = document.getElementById("myModallesson");
        if (x.style.display == "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }

    }

    createLesson(courseid, moduleid)
    {


        if(courseid!=''&&moduleid!='')
        {
            this.lessonService.createLessonForModule(courseid,moduleid,this.state.lesson)
                .then(() => { this.findAllLessons() });
        }

        this.abc();

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
            return ( <LessonRow delete={this.deleteLesson}  lesson={lesson} key={lesson.id} />)

        });
        return (
            rows
        )
    }




    render(){

        return (

                <div className="container-fluid" >


                    <div className="row">


                            <div className="card-deck" style={{margin: "80px"}}>
                                {this.lessonRows()}
                            </div>

                        <div className="modal3" id={"myModallesson"} style={{ display: "none",position: "fixed", zIndex: "45", width: "100%"}}>
                            <div className="modal-dialog">
                                <div className="modal-content" style={{height:"233px"}}>


                                    <div class="modal-header">
                                        <h4 class="modal-title">Add Lesson for {this.state.moduleId}</h4>
                                        <button type="button" class="close" onClick={()=>{this.abc()}}>&times;</button>
                                    </div>


                                    <div class="modal-body">
                                        <input className="form-control" placeholder="Lesson" onChange={this.setLessonTitle}/>
                                    </div>


                                    <div class="modal-footer">
                                        <button type="button" className="btn btn-danger" onClick={()=>{this.abc()}}>Close</button>

                                        <button type="button" className="btn btn-primary" onClick={()=>{this.createLesson(this.state.courseId,this.state.moduleId)}}>Create</button>

                                    </div>



                                </div>
                            </div>
                        </div>

                        <div className="lessonButton" style={{ position:"fixed", zIndex: "45", float: "right"}}>
                            <button className="btn btn-danger btn-block" onClick={()=>{this.abc()}}>
                                <i className="fa fa-plus" ></i>
                            </button>
                        </div>






                    </div>





                </div>

            )




    }
}