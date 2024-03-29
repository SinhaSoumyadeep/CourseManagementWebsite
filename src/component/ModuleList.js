import React from 'react';
import ModuleListItem from "./ModuleListItem";



class ModuleList extends React.Component {

    constructor() {
        super();

        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
        this.state = {

            module: { title: '' },
            modules: [
                {title: 'Module 1 - jQuery', id: 123},
                {title: 'Module 2 - React', id: 234},
                {title: 'Module 3 - Redux', id: 345},
                {title: 'Module 4 - Angular', id: 456},
                {title: 'Module 5 - Node.js', id: 567},
                {title: 'Module 6 - MongoDB', id: 678},]
        }

    }




    renderList(){

        let modules = this.state.modules
            .map(function(module){
                return <ModuleListItem
                    title={module.title} key={module.id}/>
            });
        return modules;




    }

    titleChanged(event) {
        this.setState(

                {
                    module: {title: event.target.value}
                }

            );
    }

    createModule() {
        console.log(this.state.module);

        this.setState(

            {
                modules: [this.state.module]
            }

        );

    }



    render() {

        return (



            <div>

                <input className="form-control" placeholder="title" onChange={this.titleChanged} value={this.state.module.title}/>
                <button className="btn btn-primary btn-block" onClick={this.createModule}>
                    <i className="fa fa-plus"></i>
                </button>
                {this.renderList()}



            </div>


        )

    }
}
export default ModuleList
