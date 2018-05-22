import React from 'react'
import CourseRow from "./CourseRow";
import  CourseService from "../Service/CourseService"
import '../CSS/style.css'
import '../JS/modal.css'
import $ from 'jquery';
import CourseGrid from "./CourseGrid";


$(document).on("click","#toggleView",function () {



    if($('.dispGrid').css('display') == 'none')
    {
        $('.dispGrid').css('display','')
        $('.dispRow').css('display','none')
    }
    else
    {
        $('.dispRow').css('display','')
        $('.dispGrid').css('display','none')
    }


})


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

     courseGrid() {
         var grid = this.state.courses.map((course) => {
             return ( <CourseGrid delete={this.deleteCourse} course={course} key={course.id} />)

         });
         return (
             grid
         )
     }


     addCourse(event) {


                this.setState({
                    course: { title: event.target.value }
                });



     }







     createModule() {


            var crse = this.refs.courseInput.value;

            if(crse!=''){

                this.courseService
                    .createCourse(this.state.course)
                    .then(() => { this.findAllCourses(); });
            }
            else {

                var courseObj = {title: "DefaultCourse"};

                this.courseService
                    .createCourse(courseObj)
                    .then(() => { this.findAllCourses(); });
            }



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

                                 <input className="form-control" ref="courseInput" placeholder="Course" onChange={this.addCourse} value={this.state.courses.title}/>
                             </td>
                             <td width="11%">

                                 <button className="btn btn-danger btn-block" onClick={this.createModule}>
                                     <i className="fa fa-plus"></i>
                                 </button>
                             </td>


                         </tr>


                     </table>
                 </div>

                 <div className="navbartitle" style={{paddingLeft: "45px"}}>
                     <div id="courseFolder" style={{display: "inline-block"}}></div>
                     <div id="courseTitle" style={{display: "inline-block"}}>Title</div>
                     <div id="courseOwner" style={{display: "inline-block"}}>Owner</div>
                     <div id="courseCreated" style={{display: "inline-block"}}>Created</div>
                     <div id="" style={{display: "inline-block"}} >


                         <button className="btn btn-outline-dark btn-block" id="toggleView">
                             <i className="fa fa-th"></i>
                         </button>
                     </div>
                 </div>


                 <div className="main">
                     <table className="table">


                         <tbody>
                         <tr className="dispRow">

                             <td >
                                 <ul id="sortable">
                                 {this.courseRows()}


                                 </ul>
                             </td>


                         </tr>

                         <tr className="dispGrid" style={{display: "none"}}>

                             <td>
                                 <div className="row">
                                     <div className="card-deck" style={{margin: "0px"}}>
                                    {this.courseGrid()}
                                     </div>
                                 </div>
                             </td>


                         </tr>



                         </tbody>
                     </table>
                 </div>










             </div>



         )



     }




 }