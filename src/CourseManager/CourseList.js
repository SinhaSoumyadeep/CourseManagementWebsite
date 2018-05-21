import React from 'react'
import CourseRow from "./CourseRow";
import  CourseService from "../CourseService/CourseService"
import '../CSS/style.css'
import '../JS/modal.css'
import $ from 'jquery';



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
                 <div className="navbar">
                     <table >
                         <tr>
                                <td width="5%">
                                    <i className="fa fa-home"></i>
                                </td>
                             <td width="11%">
                                 CourseManager
                             </td>
                             <td width="65%">

                                 <input className="form-control" placeholder="Course" onChange={this.addCourse} value={this.state.courses.title}/>
                             </td>
                             <td width="11%">

                                 <button className="btn btn-danger btn-block" onClick={this.createModule}>
                                     <i className="fa fa-plus"></i>
                                 </button>
                             </td>


                         </tr>


                     </table>
                 </div>

                 <div className="navbartitle">
                     <table >
                         <tr>
                             <td width="7%">

                             </td>
                             <td width="11%">
                                 Title
                             </td>

                         </tr>


                     </table>
                 </div>


                 <div className="main">
                     <table className="table">


                         <tbody>
                         <tr>

                             <td >
                                 <ul id="sortable">
                                 {this.courseRows()}


                                 </ul>
                             </td>

                         </tr>



                         </tbody>
                     </table>
                 </div>










             </div>



         )



     }




 }