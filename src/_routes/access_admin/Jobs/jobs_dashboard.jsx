//TODO: add in actions. change status. send offer, view resume etc 

import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { timeStampToDate } from '../../../_services/momentHelper';
import JobSeekerDashboardHeader from "./nav_tabs"
import { useDispatch, useSelector } from 'react-redux';

import services_data from '../../../_services_data/_services_data.js'
import api from '../../../_services_data/api/_handler';



const JobsDashboard = () => {
  const [data, setData] = useState("");
  const reduxData = useSelector((state) => state.data);

  async function loadInitialData() {
    try {
      const response = await api({ data: {}, route: 'adminAccessJobsDashboard', reduxData });
      if (response.success) {
        console.log(response.data)
        setData(response.data);

      } else {
        console.log('Handled error', response);
      }
    } catch (e) {
      console.log('Unhandled Error: ', e);
    }
  }

  useEffect(() => {
    loadInitialData()
  }, []);

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <Helmet>
          <title>Job Dashboard</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Dashboard</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/access_admin/job-dashboard">Admin Job Dashboard</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <JobSeekerDashboardHeader />

          {/* /Page Header */}
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-briefcase" /></span>
                  <div className="dash-widget-info">
                    <h3>{data.vacancyQTY}</h3>
                    <span>Vacancies</span>




                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-users" /></span>
                  <div className="dash-widget-info">
                    <h3>{data.jobSeekerQTY}</h3>
                    <span>Job Seekers</span>



                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-user" /></span>
                  <div className="dash-widget-info">
                    <h3>{data.teamMembersQTY}</h3>


                    <span>Team Members</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-clipboard" /></span>
                  <div className="dash-widget-info">
                    <h3>{data.actvieApplicationsQTY ? data.actvieApplicationsQTY : 0}</h3>

                    <span>Active Apps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="row">

                <div className="col-md-12">
                  <div className="card flex-fill">
                    <div className="card-body">
                      <h3 className="card-title text-center">
                        <Link to="/access_admin/jobs">Latest Vacancies</Link>
                      </h3>
                      <ul style={{ textAlign: "center" }} className="list-group">
                        {
                          data?.vacancies?.map((item, index) => {
                            return <li key={index} className="list-group-item list-group-item-action">
                              <Link to={"/access_admin/job-details/" + item.id_job_posts}>{item.department_name + "  -  " + item.title_name}</Link>
                            </li>
                          })
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-table">
                <div className="card-header">
                  <h3 className="card-title mb-0">
                    <Link to="/access_admin/job-applicants">Applications</Link>
                  </h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-nowrap custom-table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th >Dept & Title</th>
                          <th>Name</th>
                          <th className="text-center">App Status</th>
                        </tr>
                      </thead>


                      <tbody>
                        {data?.activeApplications?.map((item, index) => {
                          return (
                            <tr key={item.id_title_master}>
                              <td>{index + 1}</td>
                              <td>
                                <Link
                                  to={`/access_admin/job-details/${item?.id_job_posts}/job-application/${item?.id_job_posts_application}`}
                                >
                                  {item.department_name + "  -  " + item.title_name}
                                </Link>
                              </td>
                              <td hidden>{item.mobile}</td>
                              <td>
                                <Link
                                  to={`/access_admin/job-details/${item?.id_job_posts}/job-application/${item?.id_job_posts_application}`}
                                >
                                  {item.first_name + " " + item.last_name}
                                </Link>
                              </td>
                              <td className="text-center">{item.status_name}</td>
                            </tr>
                          );
                        })}
                      </tbody>



                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobsDashboard;
