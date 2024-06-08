import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { headerlogo } from '../../_services_data/imagepath.jsx'


export default function Header() {
    return <div className="header">
        <div className="header-left">
            <Link to="/access_job_seeker/welcome" className="logo">
                <img src={headerlogo} width={40} height={40} alt="" />
            </Link>
        </div>

        <div className="page-title-box float-left">
            <h3>Utopia Tech PTY LTD</h3>
        </div>

        <ul className="nav user-menu">
            <li hidden className="nav-item">
                <div className="top-nav-search">
                    <a href=";" className="responsive-search">
                        <i className="fa fa-search" />
                    </a>
                    <form action="/pages/search">
                        <input className="form-control" type="text" placeholder="Search here" />
                        <button className="btn" type="submit"><i className="fa fa-search" /></button>
                    </form>
                </div>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/applyjob/job-list">Jobs</Link>
            </li>
        </ul>

        <div className="dropdown mobile-user-menu">
            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
            <div className="dropdown-menu dropdown-menu-right">
                <Link className="dropdown-item" to="/login">Login</Link>
                <Link className="dropdown-item" to="/register">Register</Link>
            </div>
        </div>
    </div>
}