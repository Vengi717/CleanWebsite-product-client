

import React, { Component } from 'react';
import { Link,useLocation } from 'react-router-dom';

const JobSeekerDashboardHeader = (props) => {

    const location = useLocation();
    let pathname = location.pathname

    return (
        <div className="card">
            <div className="card-body">
                <ul className="nav nav-tabs nav-tabs-solid nav-justified">
                    <li className="nav-item"><Link className={`nav-link ${pathname.includes('/access_admin/job-dashboard') ? "active" : ""}`} to="/access_admin/job-dashboard">Dashboard</Link></li>
                    <li className="nav-item"><Link className={`nav-link ${pathname.includes('/access_admin/job_post_manage') ? "active" : ""}`} to="/access_admin/job_post_manage">Manage Jobs</Link></li>
                    <li className="nav-item"><Link className={`nav-link ${pathname.includes('/access_admin/job_post_document_manage') ? "active" : ""}`} to="/access_admin/job_post_document_manage">Manage Documents</Link></li>
                    <li className="nav-item"><Link className={`nav-link ${pathname.includes('/access_admin/job-applicants') ? "active" : ""}`} to="/access_admin/job-applicants">Applications</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default JobSeekerDashboardHeader;
