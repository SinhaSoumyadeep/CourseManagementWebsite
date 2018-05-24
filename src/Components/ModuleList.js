import React from 'react';
import ModuleEditor from './ModuleEditor';
import ModuleService from '../Service/ModuleService';
import ModuleRow from "./ModuleRow";
import $ from 'jquery'







export default class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.setCourseId = this.setCourseId.bind(this);
        this.state = {courseId: '', modules:[]};
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.createModule = this.createModule.bind(this);
        this.moduleService = ModuleService.instance;
        this.deleteModule = this.deleteModule.bind(this);

    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
        this.findAllModules(courseId);

    }

    deleteModule(id) {
        console.log("inside delete module "+id)
        this.moduleService
            .deleteCourse(id).then(() => { this.findAllModules(this.state.courseId) });

        window.location.replace("/course/"+this.state.courseId);



    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);



    }

    findAllModules(courseId) {

        if(courseId!='') {
            console.log(courseId)
            this.moduleService.findAllModulesForCourse(courseId).then((modules) => {
                console.log(this.state)
                this.setState({modules: modules});
            });
        }

    }




    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
    }

    setModuleTitle(event) {

       console.log(event.target.value)
        this.setState({
            module: { title: event.target.value }
        });
    }


    moduleRows() {
        if(module.title!='') {
            var rows = this.state.modules.map((module) => {
                return ( <ModuleRow delete={this.deleteModule} courseid={this.state.courseId} module={module} key={module.id} />)

            });
            return (
                rows
            )
        }

    }

    createModule() {

        var modValIn = this.refs.moduleInput.value;

        if(modValIn!='')
        {
            this.moduleService.createModule(this.state.courseId, this.state.module)
                .then(() => { this.findAllModules(this.state.courseId) });
        }
        else {

            var moduleObj = {title: "DefaultModule"};

            this.moduleService.createModule(this.state.courseId, moduleObj)
                .then(() => { this.findAllModules(this.state.courseId) });
        }
        this.refs.moduleInput.value='';


    }







    render() {


        return (


                <div className="module">


                    <div className="navbar">
                        <div id ="home">
                            <a href="/courses">
                                <i className="fa fa-home"></i>
                            </a>
                        </div>
                        <div id="text">
                            <h6>Module</h6>
                        </div>
                        <div id="inputFld">
                            <input className="form-control" ref="moduleInput" placeholder="Module" onChange={this.setModuleTitle}/>
                        </div>
                        <div id="btnFld">
                            <button className="btn btn-danger btn-block" onClick={this.createModule}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                        <div id="extra">

                        </div>

                    </div>




                    <div className="navbartitle" style={{paddingLeft: "45px"}}>
                        <div id="courseFolder" style={{display: "inline-block"}}></div>
                        <div id="courseTitle" style={{display: "inline-block"}}>Title</div>
                        <div id="courseOwner" style={{display: "inline-block"}}>Owner</div>
                        <div id="courseCreated" style={{display: "inline-block"}}>Created</div>
                    </div>



                    <div className="main">
                        <div className="moduleRow">
                                <ul id="sortable">
                                    {this.moduleRows()}
                                </ul>
                        </div>

                    </div>




                </div>



    )



    }

}
