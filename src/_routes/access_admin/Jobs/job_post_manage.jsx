//TODO: once the job post is closed. it should not be changed
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

import { Space, Spin, Table, Skeleton, notification, Empty } from 'antd';
import Nav_tabs from "./nav_tabs"

import { createTimeStamp, dateToTimeStamp, timeStampToDate } from '../../../_services/momentHelper';
import { itemRender, onShowSizeChange } from "../../../sharedComponents/paginationfunction";

import 'antd/dist/antd.css';
import "../../../_services_data/assets/css/antdstyle.css";

import api from '../../../_services_data/api/_handler';
import { useDispatch, useSelector } from 'react-redux';

function ManagedJobs() {
  const [loading, setloading] = useState(true);

  const reduxData = useSelector((state) => state.data);
  const [data, setData] = useState({ });

  const [jobEditingData, setJobEditingData] = useState([]);


  useEffect(() => {
    loadInitialData()
  }, []);


  async function loadInitialData() {
    try {
      const response = await api({ data: {}, route: 'accessAdminManageJobs', reduxData });
      if (response.success) {
        setData(response.data);
        setloading(false)
      } else {
        console.log('Handled error', response);
      }
    } catch (e) {
      console.log('Unhandled Error: ', e);
    }
  }






  const handleJobType = (id_type, id_job_post) => {
    //TODO: 
    // data.functions.update_job_type_by_id({ id_type, id_job_post })
    //  load_data()
  };

  const handleJobStatus = (job_status, id_job_post) => {
    //TODO: 

    // data.functions.update_job_status_by_id({ job_status, id_job_post })
    // load_data()
  };


  const columns = [
    {
      title: '#',
      dataIndex: 'id_job_posts',
      sorter: (a, b) => Number(a.id_job_posts) - Number(b.id_job_posts),
    },
    {
      title: 'Dept & Title',
      dataIndex: 'title_name',
      render: (text, record) => (
        <Link to={`/access_admin/job-post-edit/` + record.id_job_posts}>{text + "  -  " + record.department_name}</Link>//TODO: uncomment after debug
      ),
      sorter: (a, b) => a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase(),
    },


    {
      title: 'Start',
      dataIndex: 'start_date',
      render: (text, record) => (
        timeStampToDate(text)
      ),
      sorter: (a, b) => Date.parse(a.start_date) - Date.parse(b.start_date),
    },

    {
      title: 'Expiry',
      dataIndex: 'end_date',
      render: (text, record) => (
        timeStampToDate(text)
      ),

      sorter: (a, b) => Date.parse(a.end_date) - Date.parse(b.end_date),
    },
    {
      title: 'Job Type',
      dataIndex: 'master_job_type_name',
      render: (text, record) => (


        <div className="dropdown action-label text-center">
          <a className="btn btn-white btn-sm btn-rounded " href="#" aria-expanded="false">
            <i className={text === "Full Time" ? "fa fa-dot-circle-o text-info" : text === "Part Time" ?
              "fa fa-dot-circle-o text-success" : text === "Internship" ? "fa fa-dot-circle-o text-danger" :
                "fa fa-dot-circle-o text-danger"} /> {text}
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            {
              data.jobTypes?.map((ele, index) => (
                <a key={ele.id_master_job_types} className="dropdown-item" href="#" onClick={(e) =>
                  handleJobType(ele.id_master_job_types, record.id_job_posts)}>
                  <i className={ele.master_job_type_name === "Full Time" ? "fa fa-dot-circle-o text-info" : ele.master_job_type_name === "Part Time" ?
                    "fa fa-dot-circle-o text-success" : ele.master_job_type_name === "Internship" ? "fa fa-dot-circle-o text-danger" :
                      "fa fa-dot-circle-o text-danger"} />
                  {ele.master_job_type_name}</a>
              )
              )
            }


          </div>


        </div>
      ),
      sorter: (a, b) => a.master_job_type_name.toLocaleLowerCase() > b.master_job_type_name.toLocaleLowerCase(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <div className="dropdown action-label text-center">
          <a className="btn btn-white btn-sm btn-rounded" href="#" aria-expanded="false">
            <i className={
              text === "Open" ? "fa fa-dot-circle-o text-success" : text === "Closed" ?
                "fa fa-dot-circle-o text-danger" : "fa fa-dot-circle-o text-info"} />
            {text}
          </a>

        </div>
      ),
      sorter: (a, b) => a.status.toLocaleLowerCase() > b.status.toLocaleLowerCase(),
    },
    {
      title: 'Apps',
      dataIndex: 'applied_qty',
      render: (text, record) => (
        <Link to="/access_admin/job-applicants" className="btn btn-sm btn-primary">{text ? text : 0}</Link>
      ),
      sorter: (a, b) => a.qty_applications - b.qty_applications,
    },
    {
      title: 'Open',
      dataIndex: 'vaccancy',
      render: (text, record) => (
        <div className="btn btn-sm btn-primary">{text}</div>
      ),
      sorter: (a, b) => a.vaccancy - b.vaccancy,
    },

  ];





  return (
    <div className="page-wrapper">

      <Helmet>
        <title>Jobs - Utopia Tech PTY LTD</title>
        <meta name="description" content="Login page" />
      </Helmet>

      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Manage Jobs</h3>


              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/access_admin/job-dashboard">Job Admin Dashboard</Link></li>
                <li className="breadcrumb-item active">Manage Jobs</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <a href="#" onClick={() => set_job_editing_data([])} className="btn add-btn" data-toggle="modal" data-target="#add_job_post"><i className="fa fa-plus" /> Add Job</a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <Nav_tabs />

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">

              <Table className="table-striped"
                pagination={{
                  total: data.applications?.length,
                  //showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showTotal: (total, range) => `Showing ${range[1]} of ${total} entries`,
                  showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                }}
                style={{ overflowX: 'auto' }}
                columns={columns}

                dataSource={data.applications}
                rowKey={record => record.id_job_posts}


                locale={{
                  emptyText: loading ? <Skeleton active={true} /> : <Empty />
                }}
              />






            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}

      {/* Delete Job Modal */}
      <div hidden className="modal custom-modal fade" id="delete_job" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Job</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a href="#" onClick={() => alert("Add function")} className="btn btn-primary continue-btn">Delete</a>
                  </div>
                  <div className="col-6">
                    <a href="#" data-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Job Modal */}
    </div >
  );
}





export default ManagedJobs
