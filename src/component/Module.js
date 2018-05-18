
import React from 'react';


class  Module extends React.Component {


    constructor() { super();

        this.state = {

            modules: [
                {title: 'Module 1 - jQuery', id: 123},
                {title: 'Module 2 - React', id: 234},
                {title: 'Module 3 - Redux', id: 345},
                {title: 'Module 4 - Angular', id: 456},
                {title: 'Module 5 - Node.js', id: 567},
                {title: 'Module 6 - MongoDB', id: 678},]
        };

    }

    renderListofModule(){


        let module = <div className="container-fluid">

            <div className="card" style={{width: '18rem;'}}>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </div>

        </div>

        return module


    }


    render() {
        return(


            <div>

                {this.renderListofModule()}
            </div>


        );
    }
}
export default Module;





