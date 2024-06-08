import React, { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  //  { path: '/access_admin/general', label: 'General' },
    { path: '/access_admin/departments', label: 'Departments' },
    { path: '/access_admin/titles', label: 'Titles' },
    { path: '/access_admin/permissions_and_defaults', label: 'Access Defaults' },
];

const JobSeekerDashboardHeader = (props) => {
    const location = useLocation();
    let pathname = location.pathname;

    return (
        <div className="card">
            <div className="card-body">
                <ul className="nav nav-tabs nav-tabs-solid nav-justified">
                    {tabs.map((tab, index) => (
                        <li key={index} className="nav-item">
                            <Link
                                className={`nav-link ${pathname.includes(tab.path) ? "active" : ""}`}
                                to={tab.path}
                            >
                                {tab.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default JobSeekerDashboardHeader;
