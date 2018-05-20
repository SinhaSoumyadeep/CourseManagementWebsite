import React, {Component} from 'react'
import CourseList from './CourseList';
import CourseEditor from './CourseEditor'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LessonList from "./LessonList";
import $ from 'jquery';




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



                </div>
            </Router>
        )
    }
}