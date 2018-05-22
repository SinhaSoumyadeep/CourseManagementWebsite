import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import '../node_modules/react-bootstrap/dist/react-bootstrap'
import  '../node_modules/font-awesome/css/font-awesome.min.css'
import CourseManager from "./Containers/CourseManager";







ReactDOM.render(
    <div className="container-fluid">
        <CourseManager/>
    </div>,
    document.getElementById('root')
);
