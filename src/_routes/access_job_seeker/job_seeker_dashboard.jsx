

import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import JobSeekerDashboardHeader from "./nav_tabs"
import Inner_header from '../../sharedComponents/inner_page_header'
import services_data from '../../_services_data/_services_data'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../_services_data/api/_handler';

const UserDashboard = (props) => {
  const reduxData = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const page_title = 'Job Seeker Dashboard'
  useEffect(() => {
  }, []);

  const [data, setData] = useState([]);
  const [company_provided_urls, setcompany_provided_urls] = useState([]);

  function toJSONLocal(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }



  let isMounted = true;
  async function loadInitialData() {
    try {
      const response = await api({ data: { only_active: true }, route: 'accessJobSeekerDashboard', reduxData });
      if (isMounted) {
        if (response.success) {
          console.log(response.data)
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



  const linkURL = (item) => `/access_job_seeker/job-details/${item.id_job_posts}/jobApplication/${item.id_job_posts_application}`;


  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <Helmet>
          <title>DASHBOARD</title>
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <Inner_header
            title="Dashboard"
            sub_title={page_title}
          ></Inner_header>
          {/* /Page Header */}
          {/* Content Starts */}
          <JobSeekerDashboardHeader />

          <div className="row">

            <div className="col-md-6 text-center d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-file-text-o" /></span>
                  <div className="dash-widget-info">
                    <h3 style={{ color: data.pendingResponse && data.pendingResponse.length > 0 ? 'green' : 'default-color' }}>
                      {data.pendingResponse ? data.pendingResponse.length : 0}
                    </h3>
                    <span>Pending Your Response</span>
                  </div>
                </div>
              </div>
            </div>



            <div className="col-md-6 text-center d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-clipboard" /></span>
                  <div className="dash-widget-info">
                    <h3>{data?.totalApplied}</h3>
                    <span>Submitted</span>
                  </div>
                </div>
              </div>
            </div>
            <div hidden className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-retweet" /></span>
                  <div className="dash-widget-info">
                    <h3 ></h3>
                    <span>Feature coming soon....</span>
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

                        <Link to="/access_job_seeker/job_posts_all">Latest Jobs</Link>

                      </h3>
                      <ul style={{ textAlign: "center" }} className="list-group">
                        {
                          data.jobPosts?.map(item =>
                            <li key={item.id_job_posts} className="list-group-item list-group-item-action">
                              <Link to={"/access_job_seeker/job-details/" + item.id_job_posts}>{item.department_name + "  -  " + item.title_name}</Link>


                              <span className="float-right text-sm text-muted"></span></li>

                          )}
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
                    <div to="#">Pending Your Response</div>
                  </h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">

                    <table className="table table-nowrap custom-table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Job Title</th>
                          <th>Department</th>
                          <th className="text-center">Job Type</th>
                          <th className="text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.pendingResponse?.length > 0 ? (
                          data?.pendingResponse?.map((item) => (
                            <tr key={item.id_job_posts_application}>
                              <td>
                                <Link to={linkURL(item)}>
                                  {item.id_job_posts_application}
                                </Link>
                              </td>
                              <td>
                                <Link to={linkURL(item)}>
                                  <div>{item.title_name}</div>
                                </Link>
                              </td>
                              <td>
                                <Link to={linkURL(item)}>
                                  {item.department_name}
                                </Link>
                              </td>
                              <td className="text-center">
                                <Link to={linkURL(item)}>
                                  <div className="action-label">
                                    <div
                                      className="btn btn-white btn-sm btn-rounded"
                                      aria-expanded="false"
                                    >
                                      {item.master_job_type_name}
                                    </div>
                                  </div>
                                </Link>
                              </td>
                              <td className="text-center">
                                <Link to={linkURL(item)}>
                                  <div className="action-label">
                                    <div
                                      className="btn btn-white btn-sm btn-rounded"
                                      aria-expanded="false"
                                    >
                                      <i
                                        className={
                                          item.status_name === "Onboarded"
                                            ? "fa fa-dot-circle-o text-success"
                                            : item.status_name === "Rejected"
                                              ? "fa fa-dot-circle-o text-danger"
                                              : "fa fa-dot-circle-o text-info"
                                        }
                                      />{" "}
                                      {item.status_name}
                                    </div>
                                  </div>
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td>No Pending Applications ...</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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
                    <Link to="/access_job_seeker/job_post_applied">Applied Jobs</Link>
                  </h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-nowrap custom-table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Job Title</th>
                          <th>Department</th>
                          <th>Expire Date</th>
                          <th className="text-center">Job Type</th>
                        </tr>
                      </thead>
                      <tbody>




                        {

                          data?.recentThreeApplications?.length > 0 ?

                            data?.recentThreeApplications?.map(item => <tr key={item.id_job_posts}>

                              <td>{item.id_applicants}</td>
                              <td><Link to={"/access_job_seeker/job-details/" + item.id_job_posts}>{item.title_name}</Link></td>
                              <td>{item.department_name}</td>
                              <td>{toJSONLocal(new Date(item.end_date))} </td>
                              <td className="text-center">
                                <div className="action-label">
                                  <div className="btn btn-white btn-sm btn-rounded" aria-expanded="false">
                                    {item.master_job_type_name}
                                  </div>
                                </div>
                              </td>
                            </tr>
                            )

                            :
                            <tr>
                              <td>No Applied Jobs ...</td>
                            </tr>



                        }




                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Content End */}
        </div>
        {/* /Page Content */}
      </div>
      {/* /Page Wrapper */}
    </>
  );
}

export default UserDashboard;
/*  <table className="table table-nowrap custom-table mb-0">
                     <thead>
                       <tr>
                         <th>#</th>
                         <th>Job Title</th>
                         <th>Department</th>
                         <th className="text-center">Job Type</th>
                         <th className="text-center">Status</th>
                       </tr>
                     </thead>
                     <tbody>

                       {
                         data?.pendingResponse

                           ?.length > 0 ?
                           data?.pendingResponse

                             ?.map(item => <tr >
                               <Link>
                               <td>{item.id_job_posts_application}</td>
                               <td><div>{item.title_name}</div></td>
                               <td>{item.department_name
                               }</td>
                               <td className="text-center">
                                 <div className="action-label">



                                   <div className="btn btn-white btn-sm btn-rounded" aria-expanded="false">
                                     {item.master_job_type_name}
                                   </div>
                                 </div>
                               </td>
                               <td className="text-center">
                                 <div className="action-label">
                                   <div className="btn btn-white btn-sm btn-rounded" aria-expanded="false">
                                     <i className={item.status_name === "Onboarded" ? "fa fa-dot-circle-o text-success" : item.status_name === "Rejected" ?
                                       "fa fa-dot-circle-o text-danger" : "fa fa-dot-circle-o text-info"} /> {item.status_name}
                                   </div>
                                 </div>
                               </td>
                         
                               </Link>
                             </tr>
                             )
                           :
                           <tr>
                             <td>No Pending Applications ...</td>
                           </tr>
                       }
                     </tbody>
                   </table>*/