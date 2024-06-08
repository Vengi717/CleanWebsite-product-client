import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Lazy loading
import App from './App';

// CSS Imports
import '../_services_data/assets/css/font-awesome.min.css';
import '../_services_data/assets/css/line-awesome.min.css';
import '../_services_data/assets/css/bootstrap.min.css';
import '../_services_data/assets/css/select2.min.css';
import '../_services_data/assets/css/style.css';

// JavaScript Imports
//import '../_services_data/assets/js/app.js';
import '../_services_data/assets/js/bootstrap.min.js';
import '../_services_data/assets/js/select2.min.js';
import '../_services_data/assets/js/jquery-3.2.1.min.js';
import '../_services_data/assets/js/jquery.slimscroll.min.js';
import '../_services_data/assets/js/bootstrap-datetimepicker.min.js';
import '../_services_data/assets/js/jquery-ui.min.js';
import '../_services_data/assets/js/task.js';
import '../_services_data/assets/js/multiselect.min.js';

// Plugin Imports
import '../_services_data/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css';

const MainApp = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};
export default MainApp;



/*// main.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Lazy loading
import App from './App';

// Import CSS files
import '../_services_data/assets/css/font-awesome.min.css';
import '../_services_data/assets/css/line-awesome.min.css';
import '../_services_data/assets/css/bootstrap.min.css';
import '../_services_data/assets/css/select2.min.css';
import '../_services_data/assets/css/style.css';

// Import JavaScript files
import '../_services_data/assets/js/bootstrap.min.js';
import '../_services_data/assets/js/select2.min.js';
import '../_services_data/assets/js/jquery-3.2.1.min.js';
import '../_services_data/assets/js/jquery.slimscroll.min.js';
import '../_services_data/assets/js/bootstrap-datetimepicker.min.js';
import '../_services_data/assets/js/jquery-ui.min.js';
import '../_services_data/assets/js/task.js';
import '../_services_data/assets/js/multiselect.min.js';
import '../_services_data/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css';

const MainApp = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};
export default MainApp;*/