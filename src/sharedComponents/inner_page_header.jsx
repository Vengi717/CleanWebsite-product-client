import React from 'react';
import { Link } from 'react-router-dom';


export default function main(props) {

    return <div className="page-header">
        <div className="row">
            <div className="col-sm-12">
                <h3 className="page-title">{props.title}</h3>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/access_job_seeker/dashboard">{props.sub_title}</Link></li>
                </ul>
            </div>
        </div>
    </div>



}