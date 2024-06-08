import React, { useState, useEffect, useRef } from 'react';

import { Helmet } from 'react-helmet';
import { Skeleton } from 'antd';
import jwtDecode from 'jwt-decode';
import { timeStampToDate, createTimeStamp } from '../../../_services/momentHelper';
import { Link, dispatch } from 'react-router-dom';
import { Route, Routes, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    headerlogo
} from '../../../_services_data/imagepath'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../_services_data/api/_handler';
import { set } from '../../../_services_data/new redux';

import DDDepTitle from '../../../sharedComponents/dependentDropdown/depertmentTitle';

const dateToCounter = (date) => {
    const eventTime = new Date(date).getTime();
    const currentTime = new Date().getTime();
    const diffTime = eventTime - currentTime;
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

    return days + "d " + hours + "h " + minutes + "m";
};



function JobDetail(props) {

    const [selectedTitle, setselectedTitle] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const reduxData = useSelector((state) => state.data);
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const id_job_posts = pathSegments[3];

    let isMounted = true;

    async function loadInitialData() {
        try {

            const response = await api({ data: {}, route: 'accessAdminJobDetailsEdit/' + id_job_posts, reduxData });
            if (isMounted) {

                if (response.success) {
                    setData(response.data);
                } else {
                    console.log('Handled error', response);
                }
            }
        } catch (e) {
            console.log('Unhandled Error: ', e);
        }
    }
    useEffect(() => {
        loadInitialData();
        return () => {
            isMounted = false;
        };
    }, []);

    const editJobPostFormRef = useRef(null);
    async function updateJobPostSubmit({ event }) {
        event.preventDefault();

        const formData = new FormData(editJobPostFormRef.current);
        const data = {};

        formData?.forEach((value, key) => {
            data[key] = value;
        });

        console.log(data)

        try {
            /*    const response = await api({ data: { id_job_posts }, route: 'accessJobSeekerCreateApplication/', notif: true, reduxData });
                if (response.success) {
                    setData(response.data);
                } else {
                    console.log('Handled error', response);
                }*/

        } catch (e) {
            console.log('Unhandled Error: ', e);
        }


        $('#editJob').modal('hide');
        loadInitialData();
    }




    const [formattedDate, setFormattedDate] = useState('');
    useEffect(() => {
        if (data?.jobPost?.end_date) {
            const date = new Date(data.jobPost.end_date);
            const formatted = date.toISOString().split('T')[0];
            setFormattedDate(formatted);
        } else {
            setFormattedDate('');
        }
    }, [data?.jobPost?.end_date]);

    return (
        <div className="page-wrapper">
            <div className="content container-fluid">


                <Helmet>
                    <title>Edit Job Post - Utopia Tech PTY LTD</title>
                    <meta name="description" content="Login page" />
                </Helmet>



                <div className="content container">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">




                                <h3 className="page-title">Job Details</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/access_admin/job-dashboard">Job Admin Dashboard</Link></li>
                                    <li className="breadcrumb-item"><Link to="/access_admin/job_post_manage">Manage Jobs</Link></li>
                                    <li className="breadcrumb-item active">Job Details</li>

                                </ul>
                            </div>
                        </div>
                    </div>










                    <Skeleton loading={props.loading} active>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="job-info job-widget">
                                    <h3 className="job-title">{data?.jobPost?.title}</h3>
                                    <span className="job-dept">{props.departments?.find(department => department.id === data?.jobPost?.id_department_master)?.department_name}</span>
                                    <ul className="job-post-det">
                                        <li><i className="fa fa-calendar" /> Post Date: <span className="text-blue">{timeStampToDate(data?.jobPost?.start_date)}</span></li>
                                        <li><i className="fa fa-calendar" /> Closes On: <span className="text-blue">{timeStampToDate(data?.jobPost?.end_date)}</span></li>
                                    </ul>
                                </div>

                                <div className="job-content job-widget">
                                    <div className="job-desc-title"><h4>Job Description</h4></div>
                                    <div className="job-description">
                                        <p>{data?.jobPost?.desc}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="job-det-info job-widget">
                                    {

                                        <a
                                            data-target="#editJob"
                                            data-toggle="modal"
                                            className="btn job-btn"
                                            href="#"
                                        >
                                            Edit
                                        </a>
                                    }





                                    <div className="info-list">
                                        <span><i className="fa fa-clock-o" /></span>
                                        <h5>Type</h5>
                                        <p> {data?.jobPost?.job_type_name}</p>
                                    </div>

                                    <div className="info-list">
                                        <span><i className="fa fa-tags" /></span>
                                        <h5>Department</h5>
                                        <p> {data?.jobPost?.department_name}</p>
                                    </div>

                                    <div className="info-list">
                                        <span><i className="fa fa-tag" /></span>
                                        <h5>Title</h5>
                                        <p> {data?.jobPost?.company_title_name}</p>
                                    </div>

                                    <div className="info-list">
                                        <span><i className="fa fa-money" /></span>
                                        <h5>Salary</h5>
                                        <p>${data?.jobPost?.min_salary}k - ${data?.jobPost?.max_salary}k</p>
                                    </div>

                                    <div className="info-list">
                                        <span><i className="fa fa-suitcase" /></span>
                                        <h5>Experience</h5>
                                        <p>{data?.jobPost?.exp_required}</p>
                                    </div>

                                    <div hidden className="info-list">
                                        <span><i className="fa fa-ticket" /></span>
                                        <h5>Vacancy</h5>
                                        <p>{data?.jobPost?.vaccancy}</p>
                                    </div>

                                    <div className="info-list">
                                        <span><i className="fa fa-map-signs" /></span>
                                        <h5>Location</h5>
                                        <p>{data?.jobPost?.location}</p>
                                    </div>

                                    <div className="info-list text-center" style={{ margin: "0px", overflowWrap: "break-word" }}>
                                        <div style={{ margin: "0px !important" }}> {process.env.COMPANY_HR_EMAIL}
                                            <br /> {process.env.COMPANY_HR_URL}
                                        </div>
                                    </div>

                                    <div className="info-list text-center">
                                        <div className="app-ends">Expires<br />  {dateToCounter(data?.jobPost?.end_date)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Skeleton>
                </div>
            </div>


            <div id="editJob" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content modal-md">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Job Posting</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form ref={editJobPostFormRef} onSubmit={(event) => updateJobPostSubmit({ event })}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Status<span className="text-danger">*</span></label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="status" // Add the name attribute
                                            value={data?.jobPost?.status || ''}
                                            onChange={(e) => handleInputChange(e, 'status')}
                                        />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>Closes on<span className="text-danger">*</span></label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="end_date" // Add the name attribute
                                            defaultValue={formattedDate}
                                            onChange={(e) => handleInputChange(e, 'end_date')}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Min Salary</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="min_salary" // Add the name attribute
                                            value={data?.jobPost?.min_salary || ''}
                                            onChange={(e) => handleInputChange(e, 'min_salary')}
                                        />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>Max Salary</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="max_salary" // Add the name attribute
                                            value={data?.jobPost?.max_salary || ''}
                                            onChange={(e) => handleInputChange(e, 'max_salary')}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label>Experience</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="exp_required" // Add the name attribute
                                            value={data?.jobPost?.exp_required || ''}
                                            onChange={(e) => handleInputChange(e, 'exp_required')}
                                        />
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Location</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="location" // Add the name attribute
                                            value={data?.jobPost?.location || ''}
                                            onChange={(e) => handleInputChange(e, 'location')}
                                        />
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Type</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="type" // Add the name attribute
                                            value={data?.jobPost?.job_type_name || ''}
                                            onChange={(e) => handleInputChange(e, 'type')}
                                        />
                                    </div>
                                </div>

                                <DDDepTitle
                                    setselectedTitle={setselectedTitle}
                                    data={data}
                                />

                                <div className="form-row">

                                </div>

                                <div className="submit-section">
                                    <button
                                        type="submit"
                                        className="btn btn-primary submit-btn"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default JobDetail;