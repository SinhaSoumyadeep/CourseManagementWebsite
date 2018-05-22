import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'







export default class ModuleRow extends React.Component
{

    constructor(props){

        super(props)





    }

    active(id)
    {

        $(".list-group-item-action").removeClass("active");
        $(".fa-folder").css("color","");
        $(".moduleLink").css("color","");

        var classId = $("#moduleLink".concat(this.props.module.id)).attr('class')
        if(classId.includes("active"))
        {
            $("#moduleLink".concat(this.props.module.id)).removeClass("active");
            $("#folder".concat(this.props.module.id)).css("color","");
            $("#moduleTitle".concat(this.props.module.id)).css("color","");
        }
        else
        {
            $("#moduleLink".concat(this.props.module.id)).addClass("active");
            $("#folder".concat(this.props.module.id)).css("color","white");
            $("#moduleTitle".concat(this.props.module.id)).css("color","white");

        }


    }



    abc(id)
    {

        var x = document.getElementById("myModalmodule"+id);
        if (x.style.display == "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }

    }

    delete(id)
    {
        this.props.delete(id);
        this.abc(id);
    }



    ModuleRows() {
        return (

            <div className="list-group" >
                <a  className="list-group-item list-group-item-action"  id={"moduleLink"+this.props.module.id} >

                    <Link to={`/course/${this.props.courseid}/module/${this.props.module.id}`} onClick={()=>{this.active(this.props.module.id)}} style={{textDecoration: "none"}}>
                        <i className="fa fa-folder" id={"folder"+this.props.module.id} ></i>
                        <span className={"moduleLink"} id={"moduleTitle"+this.props.module.id} style={{marginLeft: "21px",fontSize : "small"}}> {this.props.module.title}</span>
                    </Link>


                    <span className="float-right">
                    <i className="fa fa-times" id={this.props.module.id} onClick={()=>{this.abc(this.props.module.id)}}></i>
                    </span>

                </a>





                <div className="modal2" id={"myModalmodule"+this.props.module.id} style={{display: "none", position: "fixed", zIndex: "45", width: "100%"}}>
                    <div className="modal-dialog">
                        <div className="modal-content">


                            <div className="modal-body">
                                Are You Sure?
                                <span className="float-right">
                                <i className="fa fa-times" onClick={()=>{this.abc(this.props.module.id)}}></i>&nbsp;&nbsp;
                                    <i className="fa fa-check" onClick={()=>{this.delete(this.props.module.id)}}></i>
                                    </span>

                            </div>





                        </div>
                    </div>
                </div>






            </div>





        )
    }


    render()
    {
        return(

            <div>

                {this.ModuleRows()}
            </div>



        )
    }

}