

import React, { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';

const JobSeekerDashboardHeader = (props) => {

    const location = useLocation(); let pathname = location.pathname

    return (
        <div className="card">
            <div className="card-body">
                <ul className="nav nav-tabs nav-tabs-solid nav-justified">
                    <li className="nav-item"><Link className={`nav-link ${pathname.includes('/access_job_seeker/dashboard') ? "active" : ""}`} to="/access_job_seeker/dashboard">Dashboard</Link></li>
                    <li className="nav-item"><Link className={`nav-link ${pathname.includes('job_posts_all') ? "active" : ""}`} to="/access_job_seeker/job_posts_all">Job Posts All</Link></li>
                    <li className="nav-item"><Link className={`nav-link ${pathname.includes('job_post_applied') ? "active" : ""}`} to="/access_job_seeker/job_post_applied">Applied</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default JobSeekerDashboardHeader