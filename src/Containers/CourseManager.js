import React, {Component} from 'react'
import CourseList from '../Components/CourseList';
import CourseEditor from './CourseEditor'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LessonList from "../Components/LessonList";
import TopicList from "../Components/TopicList";
import WidgetListModule from "../Components/WidgetList";



export default class CourseManager
    extends Component {







    render() {
        return (
            <Router>
                <div>

                    <Route path="/courses"
                           component={CourseList}>
                    </Route>
                    <Route path="/course/:courseId" component={CourseEditor}>
                    </Route>
                    <Route path="/course/:courseId/module/:moduleId" component={LessonList}>
                    </Route>
                    <Route path="/lesson/:lessonId/topics" component={TopicList}>
                    </Route>
                    <Route path="/topics/:topicId/widget" component={WidgetListModule}>
                    </Route>




                </div>
            </Router>
        )
    }
}