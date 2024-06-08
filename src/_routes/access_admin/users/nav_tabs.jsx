

import React, { Component } from 'react';
import { Link,useLocation } from 'react-router-dom';

const JobSeekerDashboardHeader = (props) => {

    const location = useLocation();    let pathname = location.pathname

    return (
        <div className="card">
            <div className="card-body">
                <ul className="nav nav-tabs nav-tabs-solid nav-justified">
                    <li className="nav-item"><Link className={`nav-link ${pathname.includes('/team_members_all') ? "active" : ""}`} to="/access_admin/team_members_all">Team Members</Link></li>
                    <li className="nav-item"><Link className={`nav-link ${pathname.includes('/users_other') ? "active" : ""}`} to="/access_admin/users_other">Other Users</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default JobSeekerDashboardHeader





/**
 *                     <li className="nav-item"><Link className={`nav-link ${pathname.includes('offered-jobs') ? "active" : ""}`} to="/access_admin/offered-jobs">Offered</Link></li>

 *       <li className="nav-item"><Link className={`nav-link ${pathname.includes('visited-jobs') ?"active" :""}`} to="/access_admin/visited-jobs">Visitied </Link></li>
                   <li className="nav-item"><Link className={`nav-link ${pathname.includes('archived-jobs') ?"active" :""}`} to="/access_admin/archived-jobs">Archived </Link></li>
                <li className="nav-item"><Link className={`nav-link ${pathname === ('/access_admin/interviewing') 
                   ||pathname.includes('job-aptitude') || pathname.includes('questions') ?"active" :""}`} to="/access_admin/interviewing">Interviewing</Link></li>
             
 *                     <li className="nav-item"><Link className={`nav-link ${pathname.includes('saved-jobs') ?"active" :""}`} to="/access_admin/saved-jobs">Saved</Link></li>


 */