import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { headerlogo } from '../../../_services_data/imagepath.jsx'
import { getDays } from "../../../_services/momentHelper";
import api from '../../../_services_data/api/_handler';
import Header from '../header';

function JobsList() {
  const [data, setData] = useState(null);
  const reduxData = useSelector((state) => state.data);


  async function loadInitialData() {
    try {
      const response = await api({ data: { only_active: true }, route: 'accessJobSeekerJobListsGetJobPosts', reduxData });
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
    loadInitialData();
  }, []);
  return (
    <div className="page-wrapper" style={{ marginLeft: '0px' }}>
      <div className="content container-fluid">
        <Helmet>
          <title>Jobs - Utopia Tech PTY LTD</title>
          <meta name="description" content="Login page" />
        </Helmet>


        <Header />


        <div className="row">

          <div className="col-md-12">
            {data?.map(job => (
              <Link className="job-list" to={`/applyjob/job-details/` + job.id_job_posts} key={job.id_job_posts}>
                <div className="job-list-det">
                  <div className="job-list-desc">
                    <h3 className="job-list-title">{job.company_title_name}</h3>
                    <h4 className="job-department">{job.department_name}</h4> {/* Updated key */}
                  </div>
                  <div className="job-type-info">
                    <span className="job-types">{job.job_type_name}</span> {/* Updated key */}
                  </div>
                </div>
                <div className="job-list-footer">
                  <ul>
                    <li><i className="fa fa-map-signs" /> {job.location}</li>
                    <li><i className="fa fa-money" /> ${job.min_salary}-${job.max_salary}</li>
                    <li><i className="fa fa-clock-o" />{String(getDays(job.created_at)).charAt(0).toUpperCase() + String(getDays(job.created_at)).slice(1)}</li>
                  </ul>
                </div>
              </Link>
            ))}
          </div>




        </div>
      </div>
    </div>

  );
}


export default JobsList
