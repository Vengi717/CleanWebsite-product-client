import React, { useState, useEffect } from 'react';
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

import Header from '../header';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const reduxData = useSelector((state) => state.data);
  const location = useLocation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [cvName, setCvName] = useState('');



  useEffect(() => {
    let isMounted = true; // Add a variable to track if the component is mounted

    async function loadInitialData() {
      try {
        const requestedId = location.pathname.split('/').pop();

        const response = await api({ data: {}, route: 'accessPublicJobDetails/' + requestedId, reduxData });

        if (isMounted) {
          // Check if the component is still mounted before updating the state
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

    loadInitialData();

    // Cleanup function to cancel any ongoing operations when the component unmounts
    return () => {
      isMounted = false; // Mark the component as unmounted
    };
  }, []);




  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      message,
      cv_name: cvName,
      applied_at: createTimeStamp(),
      id_job_posts: parseInt(props.match.params.id),
    };

    const temp = JSON.parse(localStorage.getItem('redux'));
    const emp_id = jwtDecode(temp.bearer).sub;
    data.id_employee = emp_id;
    data.id_applicantion_status = 1; // [APPLIED]

    const filename = `${emp_id}_cv_${Date.now()}`;

  //ADD SERVER CALL TO UPLAOD DOCS

    $('#apply_job').modal('hide');
    e.target.reset();
  };

  const applyJob = () => {
    const { authenticated } = props;
    if (!authenticated) {
      // Redirect to login or handle authentication as needed
      return;
    } else {
      // Show the apply job modal
      $('#apply_job').modal('show');
    }
  };



  async function LoginRedirect() {
    const requestedId = location.pathname.split('/').pop();

    console.log("here: ", requestedId)
    await dispatch(set("Redirector", {
      from: ["/login", "/register"],
      to: "/access_job_seeker/job-details/" + requestedId
    }));
    navigate("/login");
  }




  return (
    <div className="page-wrapper" style={{ marginLeft: '0px' }}>
      <div className="content container-fluid">


        <Helmet>
          <title>Jobs - Utopia Tech PTY LTD</title>
          <meta name="description" content="Login page" />
        </Helmet>

        <Header />

        <div className="row">
          <div className="content container">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 hidden className="page-title">Job Post</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/applyjob/job-list">Job Posts</Link></li>
                    <li className="breadcrumb-item active">Job Post</li>
                  </ul>
                </div>
              </div>
            </div>

            <Skeleton loading={props.loading} active>
              <div className="row">
                <div className="col-md-8">
                  <div className="job-info job-widget">
                    <h3 className="job-title">{data?.title}</h3>
                    <span className="job-dept">{props.departments?.find(department => department.id === data?.id_department_master)?.department_name}</span>
                    <ul className="job-post-det">
                      <li><i className="fa fa-calendar" /> Post Date: <span className="text-blue">{timeStampToDate(data?.start_date)}</span></li>
                      <li><i className="fa fa-calendar" /> Closes On: <span className="text-blue">{timeStampToDate(data?.end_date)}</span></li>
                    </ul>
                  </div>

                  <div className="job-content job-widget">
                    <div className="job-desc-title"><h4>Job Description</h4></div>
                    <div className="job-description">
                      <p>{data?.desc}</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="job-det-info job-widget">

                    <Link className="btn job-btn" to="#" onClick={LoginRedirect}>
                      Apply For This Job
                    </Link>



                    <div className="info-list">
                      <span><i className="fa fa-clock-o" /></span>
                      <h5>Type</h5>
                      <p> {data?.job_type_name}</p>
                    </div>

                    <div className="info-list">
                      <span><i className="fa fa-tags" /></span>
                      <h5>Department</h5>
                      <p> {data?.department_name}</p>
                    </div>

                    <div className="info-list">
                      <span><i className="fa fa-tag" /></span>
                      <h5>Title</h5>
                      <p> {data?.company_title_name}</p>
                    </div>

                    <div className="info-list">
                      <span><i className="fa fa-money" /></span>
                      <h5>Salary</h5>
                      <p>${data?.min_salary}k - ${data?.max_salary}k</p>
                    </div>

                    <div className="info-list">
                      <span><i className="fa fa-suitcase" /></span>
                      <h5>Experience</h5>
                      <p>{data?.exp_required}</p>
                    </div>

                    <div hidden className="info-list">
                      <span><i className="fa fa-ticket" /></span>
                      <h5>Vacancy</h5>
                      <p>{data?.vaccancy}</p>
                    </div>

                    <div className="info-list">
                      <span><i className="fa fa-map-signs" /></span>
                      <h5>Location</h5>
                      <p>{data?.location}</p>
                    </div>

                    <div className="info-list text-center" style={{ margin: "0px", overflowWrap: "break-word" }}>
                      <div style={{ margin: "0px !important" }}> {process.env.COMPANY_HR_EMAIL}
                        <br /> {process.env.COMPANY_HR_URL}
                      </div>
                    </div>

                    <div className="info-list text-center">
                      <div className="app-ends">Expires<br />  {dateToCounter(data?.end_date)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Skeleton>
          </div>
        </div>
      </div>    </div>

  );
}

export default JobDetail;