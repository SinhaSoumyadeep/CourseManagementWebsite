import React from 'react';
import ModuleEditor from '../CourseManager/ModuleEditor';
import ModuleService from '../CourseService/ModuleService';
import ModuleRow from "../CourseManager/ModuleRow";
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
        this.moduleService.createModule(this.state.courseId, this.state.module)
            .then(() => { this.findAllModules(this.state.courseId) });
    }







    render() {


        return (


                <div className="module">


                    <div className="navbar">
                        <table >
                            <tr>
                                <td width="5%">
                                    <a href="http://localhost:3000/courses">
                                    <i className="fa fa-home"></i>
                                    </a>

                                </td>
                                <td width="11%">
                                    Course Id {this.state.courseId}
                                </td>
                                <td width="65%">

                                    <input className="form-control" placeholder="Module" onChange={this.setModuleTitle}/>
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
                        <tr >
                            <td className="moduleRow">
                                <ul id="sortable">
                                {this.moduleRows()}
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
