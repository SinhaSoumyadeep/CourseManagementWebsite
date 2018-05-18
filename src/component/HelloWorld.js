import React from 'react';
import Name from "./Name";
import Listofcourses from "./Listofcourses";
import Message from "./Message";
import ModuleList from "./ModuleList";




class HelloWorld extends React.Component {
    render() {
       return(

           <div className="container-fluid">


               <div className="row">
                   <div className="col-4">


                       <div>
                           <ModuleList/>
                       </div>


                   </div>
                   <div className="col-8">


                       <div className="card-deck">
                           <Name/>
                           <Name/>
                           <Name/>

                       </div>


                   </div>
               </div>

           </div>



       );
    }
}
export default HelloWorld;