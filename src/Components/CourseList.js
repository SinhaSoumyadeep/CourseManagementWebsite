import React from 'react'
import CourseRow from "./CourseRow";
import  CourseService from "../Service/CourseService"
import '../CSS/style.css'
import '../JS/modal.css'
import $ from 'jquery';
import CourseGrid from "./CourseGrid";


var todayCount=0;
var yesterdayCount=0;
var weekCount=0;
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
         this.Search = this.Search.bind(this);
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

         todayCount=0;
         yesterdayCount=0;
         weekCount =0;

         var rows = this.state.courses.map((course) => {

             return (


                 <div >

                    {this.checktime(course)}

                     <CourseRow delete={this.deleteCourse} course={course} key={course.id} />



                 </div>



             )

         });
         return (
             rows
         )
     }


     formatDate(date) {
     var d = new Date(date),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

     return [year, month, day].join('-');
    }


     checktime(course)
     {



       var coursedate = String(course.created).substring(0,10)
       var systemdate = this.formatDate(new Date())
         var courseday=String(course.created).substring(8,10)
         var coursemonth = String(course.created).substring(5,7)
         var courseyear = String(course.created).substring(0,4)
         var systemday=systemdate.substring(8,10)
         var systemmonth = systemdate.substring(5,7)
         var systemyear = systemdate.substring(0,4)


         if(coursedate == systemdate)
         {
             if(todayCount == 0) {
                 todayCount++;
                 $("#courseCard".concat(course.id)).removeClass("col-sm-3")
                 return (
                        <div>
                            <h6 style={{fontSize: "small"}}>Today</h6>
                        </div>

                 )
             }


         }
         else if( courseyear==systemyear&&coursemonth==systemmonth&&parseInt(courseday)==(parseInt(systemday)-1))
         {
             if(yesterdayCount == 0) {
                 yesterdayCount++;
                 $("#courseCard".concat(course.id)).removeClass("col-sm-3")
                 return(
                        <div>
                         <h6 style={{fontSize: "small"}}>Yesterday</h6>
                        </div>

                 )
             }



         }
         else if(courseyear==systemyear&&coursemonth==systemmonth&&parseInt(courseday)<=(parseInt(systemday)-2))
         {
             if(weekCount == 0) {
                 weekCount++;
                 $("#courseCard".concat(course.id)).removeClass("col-sm-3")
                 return(
                     <div>
                         <h6 style={{fontSize: "small"}}>Previous 7 days</h6>
                     </div>

                 )
             }
         }




     }
     courseGrid() {
         todayCount=0;
         yesterdayCount=0;
         var grid = this.state.courses.map((course) => {

             return (


                <div className="col-sm-3">


                 <CourseGrid delete={this.deleteCourse} course={course} key={course.id} />


                </div>


             )

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
         this.refs.courseInput.value='';



     }

     Search(event)
     {
        var key = event.target.value


         this.courseService.findByCourseName(key).then((courses) => {

             this.setState({courses: courses});


         })

         $('table> tbody:last').append(this.courseRows());



     }





     render(){

         return(

             <div>
                 <div className="navbar">
                     <div id ="home">
                         <i className="fa fa-home"></i>
                     </div>
                     <div id="text">
                            <h6>CourseManager</h6>
                     </div>
                     <div id="inputFld">
                         <input className="form-control" ref="courseInput" placeholder="Course" onChange={this.addCourse} value={this.state.courses.title}/>
                     </div>
                     <div id="btnFld">
                         <button className="btn btn-danger btn-block" onClick={this.createModule}>
                             <i className="fa fa-plus"></i>
                         </button>
                     </div>
                     <div id="extra">
                         <input className="form-control"  id="searchBar" name="search" placeholder="Search..." onChange={this.Search}/>
                     </div>

                 </div>



                 <div className="navbartitle" style={{paddingLeft: "45px",paddingTop: "14px",paddingBottom: "15px"}}>
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
                     <div className="dispRow">

                         <ul id="sortable">
                             {this.courseRows()}
                         </ul>

                     </div>
                     <div className="dispGrid" style={{display: "none"}}>
                         <div className="row">
                             <div className="card-deck" style={{margin: "0px"}}>
                                 {this.courseGrid()}
                             </div>
                         </div>

                     </div>
                 </div>













             </div>



         )



     }




 }