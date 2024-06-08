//TODO: create app needs to be updated
import React, { useState, useEffect, useRef } from 'react';
import Card from '../../../sharedComponents/card'
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
  const pathSegments = location.pathname.split('/');
  const id_job_posts = pathSegments[3];
  const idApplication = pathSegments[5];


  useEffect(() => {
    let isMounted = true;
    async function loadInitialData() {
      try {
        const response = await api({
          data: {}, route: 'accessJobSeekerJobApplication/' + id_job_posts + "/" + idApplication, reduxData
        });
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
    loadInitialData();
    return () => {
      isMounted = false;
    };
  }, []);

  const ApplyJobFormRef = useRef(null);
  async function applyJobSubmit({ event }) {
    event.preventDefault();


    try {
      const id_job_posts = location.pathname.split('/').pop();
      const response = await api({ data: { id_job_posts }, route: 'accessJobSeekerCreateApplication/', notif: true, reduxData });
      if (response.success) {
        setData(response.data);
      } else {
        console.log('Handled error', response);
      }

    } catch (e) {
      console.log('Unhandled Error: ', e);
    }


    $('#applyJobSubmitid').modal('hide');
    loadInitialData();
  }



  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Helmet>
          <title>Jobs - Utopia Tech PTY LTD</title>
          <meta name="description" content="Login page" />
        </Helmet>
        <div className="content container">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Job Details</h3>
                <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/access_admin/job-dashboard">Admin Job Dashboard</Link></li>
                  <li className="breadcrumb-item"><Link to="/access_admin/job-applicants">Applications</Link></li>
                  <li className="breadcrumb-item active">Job Application</li>
                </ul>
              </div>
            </div>
          </div>
          <Skeleton loading={props.loading} active>



            <div className="row">
              <div className="col-md-6 d-flex">
                <Card
                  modal_data={
                    { modal_name: "personal_informaion" }
                  }
                  title={"Application Details"}
                  nonEdit={true}
                  data={[
                    { name: "Application", value: timeStampToDate(data?.application.applied_at) },
                    {
                      name: "Status", value:


                        <div className="dropdown action-label text-center">
                          <a className="btn btn-white btn-sm btn-rounded" aria-expanded="false">
                            <i
                              className={
                                data?.application.application_status === "Open" ? "fa fa-dot-circle-o text-success" : data?.application.application_status === "Closed" ?
                                  "fa fa-dot-circle-o text-danger" : "fa fa-dot-circle-o text-info"
                              }
                            />
                            {data?.application.application_status}
                          </a>
                        </div>
                    },
                  ]}
                ></Card>
              </div>

            </div>



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


    </div>

  );
}

export default JobDetail;