import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { Skeleton } from 'antd';

import {
  createTimeStamp,
  dateToCounter,
  dateToTimeStamp,
  timeStampToDate,
} from '../../../_services/momentHelper';
import Input from '../../../sharedComponents/Input';
import Button from '../../../sharedComponents/Button';

function JobDetails() {
  const [jobDetails, setJobDetails] = useState({
    comp_id: null,
    id_department_master: null,
    title_id: null,
    location: '',
    vaccancy: '',
    exp_required: '',
    age: 0,
    min_salary: '',
    max_salary: '',
    type: 'Full Time',
    status: 'Open',
    start_date: '',
    end_date: '',
    desc: '',
  });

  const { id } = useParams();

  useEffect(() => {
    // Simulate fetching job data
    const fetchJobData = async () => {
      // Replace this with actual API calls or data fetching logic
      const response = await fetch(`/api/jobs/${id}`);
      const data = await response.json();
      setJobDetails(data); // Update jobDetails state with fetched data
    };

    fetchJobData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate updating job data
    const updateJobData = async () => {
      // Replace this with actual API calls or data updating logic
      await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(jobDetails),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };

    updateJobData();

    $('#edit_job').modal('hide');
    e.target.reset();
  };

  const handleChange = (evt) => {
    evt.persist();
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [evt.target.name]: evt.target.value,
    }));
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Jobs - Utopia Tech PTY LTD</title>
        <meta name="description" content="Login page" />
      </Helmet>

      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Job Detailsaaa</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/access_admin/job-dashboard">Job Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Job Details</li>
              </ul>
            </div>
          </div>
        </div>

        <Skeleton loading={false} active>
          <div className="row">
            <div className="col-md-8">
              <div className="job-content job-widget">
                <div className="job-desc-title">
                  <h4>Job Description</h4>
                </div>
                <div className="job-description">
                  <p style={{ whiteSpace: 'pre-wrap' }}>
                    {/* Replace with job details */}
                  </p>
                </div>
              </div>
              <div className="job-info job-widget">
                <h3 className="job-title">{/* Replace with job title */}</h3>
                <span className="job-dept">
                  {/* Replace with department */}
                </span>
                <ul className="job-post-det">
                  <li>
                    <i className="fa fa-calendar" /> Post Date:{' '}
                    <span className="text-blue">
                      {/* Replace with post date */}
                    </span>
                  </li>
                  <li>
                    <i className="fa fa-calendar" /> Closes On:{' '}
                    <span className="text-blue">
                      {/* Replace with close date */}
                    </span>
                  </li>
                  <li>
                    <i className="fa fa-user-o" /> Applications:{' '}
                    <span className="text-blue">
                      {/* Replace with number of applications */}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="job-det-info job-widget">
                <a
                  className="btn job-btn"
                  href="#"
                  data-toggle="modal"
                  onClick={() => {
                    // Handle edit button click
                  }}
                  data-target="#edit_job"
                >
                  Edit
                </a>
                <div className="info-list">
                  <span>
                    <i className="fa fa-bar-chart" />
                  </span>
                  <h5>Job Type</h5>
                  <p> {/* Replace with job type */}</p>
                </div>
                <div className="info-list">
                  <span>
                    <i className="fa fa-money" />
                  </span>
                  <h5>Salary</h5>
                  <p>
                    {/* Replace with salary range */}
                  </p>
                </div>
                <div className="info-list">
                  <span>
                    <i className="fa fa-suitcase" />
                  </span>
                  <h5>Experience</h5>
                  <p>{/* Replace with experience required */}</p>
                </div>
                <div className="info-list">
                  <span>
                    <i className="fa fa-ticket" />
                  </span>
                  <h5>Vacancy</h5>
                  <p>{/* Replace with number of vacancies */}</p>
                </div>
                <div
                  className="info-list"
                  style={{ margin: '0px', overflowWrap: 'break-word' }}
                >
                  <div style={{ margin: '0px !important' }}>
                    {process.env.COMPANY_HR_EMAIL}
                    <br /> {process.env.COMPANY_HR_URL}
                  </div>
                </div>
                <div className="info-list text-center">
                  <a className="app-ends" href="#">
                    JOB OPENING ENDS IN <br /> {/* Replace with time counter */}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>

      <div id="edit_job" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <button
            type="button"
            className="close"
            data-dismiss="modal"
          >
            ×
          </button>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Job</h5>
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
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Company</label>
                      <select
                        className="custom-select custom-select-sm"
                        value={jobDetails.comp_id}
                        name="comp_id"
                        onChange={handleChange}
                      >
                        <option value="">-</option>
                        {/* Replace with company options */}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Department</label>
                      <select
                        className="custom-select custom-select-sm"
                        value={jobDetails.id_department_master}
                        name="id_department_master"
                        onChange={handleChange}
                      >
                        <option value="">-</option>
                        {/* Replace with department options */}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Title</label>
                      <select
                        className="custom-select custom-select-sm"
                        value={jobDetails.title_id}
                        name="title_id"
                        onChange={handleChange}
                      >
                        <option value="">-</option>
                        {/* Replace with title options */}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      name="location"
                      handleChange={handleChange}
                      value={jobDetails.location}
                      type="text"
                    >
                      <label>
                        Job Location <span className="text-danger">*</span>
                      </label>
                    </Input>
                  </div>
                  <div className="col-md-6">
                    <Input
                      name="vaccancy"
                      handleChange={handleChange}
                      value={jobDetails.vaccancy}
                      type="number"
                    >
                      <label>
                        No of Vacancies{' '}
                        <span className="text-danger">*</span>
                      </label>
                    </Input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      name="exp_required"
                      handleChange={handleChange}
                      value={jobDetails.exp_required}
                      type="text"
                    >
                      <label>
                        Experience <span className="text-danger">*</span>
                      </label>
                    </Input>
                  </div>
                  <div className="col-md-6">
                    <Input
                      name="age"
                      handleChange={handleChange}
                      value={jobDetails.age}
                      type="number"
                    >
                      <label>
                        Age <span className="text-danger">*</span>
                      </label>
                    </Input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      name="min_salary"
                      handleChange={handleChange}
                      value={jobDetails.min_salary}
                      type="number"
                    >
                      <label>
                        Salary From <span className="text-danger">*</span>
                      </label>
                    </Input>
                  </div>
                  <div className="col-md-6">
                    <Input
                      name="max_salary"
                      handleChange={handleChange}
                      value={jobDetails.max_salary}
                      type="number"
                    >
                      <label>
                        Salary To <span className="text-danger">*</span>
                      </label>
                    </Input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Job Type</label>
                      <select
                        className="custom-select custom-select-sm"
                        value={jobDetails.type}
                        onChange={handleChange}
                        name="type"
                      >
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Sub Contractor">Sub Contractor</option>
                        <option value="Internship">Internship</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Remote">Remote</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        className="custom-select custom-select-sm"
                        value={jobDetails.status}
                        onChange={handleChange}
                        name="status"
                      >
                        <option value="Open">Open</option>
                        <option value="Close">Closed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      name="start_date"
                      handleChange={handleChange}
                      value={timeStampToDate(jobDetails.start_date)}
                      type="date"
                    >
                      <label>
                        Start Date <span className="text-danger">*</span>
                      </label>
                    </Input>
                  </div>
                  <div className="col-md-6">
                    <Input
                      name="end_date"
                      handleChange={handleChange}
                      value={timeStampToDate(jobDetails.end_date)}
                      type="date"
                    >
                      <label>
                        Expired Date <span className="text-danger">*</span>
                      </label>
                    </Input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Input
                      input
                      name="desc"
                      handleChange={handleChange}
                      value={jobDetails.desc}
                    >
                      <label>
                        Description <span className="text-danger">*</span>
                      </label>
                    </Input>
                  </div>
                </div>
                <Button value="Save" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
