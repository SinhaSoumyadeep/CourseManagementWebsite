import React from 'react'
import CourseRow from "./CourseRow";
import  CourseService from "../CourseService/CourseService"
import ModuleList from "../ModuleManager/ModuleList"

 export default class CourseList extends React.Component
 {


     constructor() {
         super()
         this.addCourse = this.addCourse.bind(this);
         this.createModule = this.createModule.bind(this);
         this.deleteCourse = this.deleteCourse.bind(this);
         this.courseService = CourseService.instance;
         this.state = {
             courses: []
         };
     }

     componentDidMount() {

            this.findAllCourses()
     }




     findAllCourses()
     {
         this.courseService.findAllCourses()
             .then((courses) => {
                 console.log(this.state)
                 this.setState({courses: courses});
             });
     }


     deleteCourse(id) {
         this.courseService
             .deleteCourse(id)
             .then(() => { this.findAllCourses(); });


     }




     courseRows() {
         var rows = this.state.courses.map((course) => {
             return ( <CourseRow delete={this.deleteCourse} course={course} key={course.id} />)

         });
         return (
             rows
         )
     }


     addCourse(event) {
         this.setState({
             course: { title: event.target.value }
         });

     }







     createModule() {
         this.courseService
             .createCourse(this.state.course)
             .then(() => { this.findAllCourses(); });

     }





     render(){

         return(

             <div>

                 <div>
                     <div>
                         <h3>Course {this.state.courseId}
                         </h3>
                     </div>

                     <table className="table">

                         <tr>

                             <td>
                                 <input className="form-control" placeholder="Course" onChange={this.addCourse} value={this.state.courses.title}/>
                             </td>
                         </tr>
                         <tr>
                             <td>
                                 <button className="btn btn-primary btn-block" onClick={this.createModule}>
                                     <i className="fa fa-plus"></i>
                                 </button>
                             </td>
                         </tr>

                         <tbody>
                         <tr>
                             <td>
                                    {this.courseRows()}
                             </td>
                         </tr>



                         </tbody>
                     </table>
                 </div>

             </div>



         )



     }




 }