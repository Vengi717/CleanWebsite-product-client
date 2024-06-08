//TODO: once the job post is closed. it should not be changed
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import JobSeekerDashboardHeader from "./nav_tabs"
import { Space, Spin, Table, Skeleton, notification, Empty } from 'antd';
import { timeStampToDate } from '../../_services/momentHelper';
import { itemRender, onShowSizeChange } from "../../sharedComponents/paginationfunction";
import { Provider, useDispatch, useSelector } from 'react-redux';
import api from '../../_services_data/api/_handler';

import 'antd/dist/antd.css';
import "../../_services_data/assets/css/antdstyle.css";


function ManagedJobs() {
  const reduxData = useSelector((state) => state.data);
  const [data, setSata] = useState([]);

  const [loading, setloading] = useState(true);

  useEffect(() => {
    loadInitialData()
  }, []);

  async function loadInitialData() {
    try {
      const response = await api({ data: {}, route: 'accessJobSeekerGetJobPosts', reduxData });
      if (response.success) {
        //  console.log("new data:", response.data)
        setSata(response.data);
        setloading(false)
      } else {
        console.log('Handled error', response);
      }
    } catch (e) {
      console.log('Unhandled Error: ', e);
    }
  }



  const columns = [
    {
      title: '#',
      dataIndex: 'id_job_posts',
      sorter: (a, b) =>
        a.id_job_posts - b.id_job_posts
      ,
    },
    {
      title: 'Title',
      dataIndex: 'title_name',
      render: (text, record) => (
        <Link to={`/access_job_seeker/job-details/` + record.id_job_posts}>{text}</Link>
      ),
      sorter: (a, b) => a.title_name.localeCompare(b.title_name),
    },
    {
      title: 'Dept',
      dataIndex: 'department_name',
      sorter: (a, b) => a.department_name.localeCompare(b.department_name),
    },
    {
      title: 'Expiry',
      dataIndex: 'end_date',
      render: (text) => timeStampToDate(text),
      sorter: (a, b) => Date.parse(a.end_date) - Date.parse(b.end_date),
    },
    {
      title: 'Job Type',
      dataIndex: 'master_job_type_name',
      render: (text) => (
        <div className="dropdown action-label text-center">
          <a className="btn btn-white btn-sm btn-rounded" aria-expanded="false">
            {text}
          </a>
        </div>
      ),
      sorter: (a, b) => a.master_job_type_name.localeCompare(b.master_job_type_name),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text) => (
        <div className="dropdown action-label text-center">
          <a className="btn btn-white btn-sm btn-rounded" aria-expanded="false">
            <i
              className={
                text === "Open" ? "fa fa-dot-circle-o text-success" : text === "Closed" ?
                  "fa fa-dot-circle-o text-danger" : "fa fa-dot-circle-o text-info"
              }
            />
            {text}
          </a>
        </div>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: 'Open',
      dataIndex: 'vaccancy',
      render: (text) => (
        <Link to="#" className="btn btn-sm btn-primary">{text}</Link>
      ),
      sorter: (a, b) => a.vaccancy - b.vaccancy,
    },
  ];



  return <>
    {/* Page Wrapper */}
    <div className="page-wrapper">
      <Helmet>
        <title>Job Posts All.</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Job Posts All</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/access_job_seeker/dashboard">Job Seeker Dashboard</Link></li>
                <li className="breadcrumb-item active">Job Posts All</li>

              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Content Starts */}


        <JobSeekerDashboardHeader />


        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table className="table-striped"
                pagination={{
                  total: data?.length,
                  //showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showTotal: (total, range) => `Showing ${range[1]} of ${total} entries`,
                  showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                }}
                style={{ overflowX: 'auto' }}
                columns={columns}
                dataSource={data}
                rowKey={record => record.id_job_posts}
                locale={{
                  emptyText: loading ? <Skeleton active={true} /> : <Empty />
                }}
              />





            </div>
          </div>
        </div>




        {/* /Content End */}
      </div>
      {/* /Page Content */}
    </div>
    {/* /Page Wrapper */}
  </>




}

export default ManagedJobs
