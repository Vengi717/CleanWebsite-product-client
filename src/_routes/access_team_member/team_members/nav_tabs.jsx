

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