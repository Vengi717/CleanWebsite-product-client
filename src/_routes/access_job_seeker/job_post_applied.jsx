

import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import JobSeekerDashboardHeader from "./nav_tabs"
import { Space, Spin, Table, Skeleton, notification,Empty  } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../sharedComponents/paginationfunction"
import "../../_services_data/assets/css/antdstyle.css"
import api from '../../_services_data/api/_handler';

import { useDispatch, useSelector } from 'react-redux';





const AppliedJobs = () => {
  const reduxData = useSelector((state) => state.data);

  const [data, setdata] = useState([]);
  const [company_provided_urls, setcompany_provided_urls] = useState([]);

  const [loading, setloading] = useState(true);
  const pathSegments = location.pathname.split('/');


  useEffect(() => {
    setTimeout(() => {

      loadInitialData()
    }, 2000);
  }, []);

  async function loadInitialData() {
    try {
      let auth = {
        ...{ auth: reduxData.bearer },// if an auth is required
      };
      const user_id = reduxData.id_user
      await api
        ({ data: auth, route: `accessJobSeekerGetAppliationsViaUserId/` + await user_id, reduxData })
        .then(async (response) => {
          if (response.success) {//success
            setdata(response.data)
            setloading(false)
          }
        })
        .catch(async (e) => {//failure not handled by custom backend function 
          console.log("Unhandled Error: ", e)
        });

    } catch (error) {
      console.log(error)
    }

  }

  //user clicks a download button to download all selected documents
  async function download_offer(e) {
    await setloading("Disabled")
    console.log("company_provided_urls: ", company_provided_urls)
    const urls = [

      ...await process.env.STANDARD_DOCUMENTS.split(','),
      ...await company_provided_urls,


    ]
    var interval = 500;
    await urls.map((item, index) => {
      var doc = item
      if (doc) {
        setTimeout(async function () {
          window.open(doc);
        }, interval * (index + 1));
      }
    });
    // await  setloading("")

  };

  async function retractOffer(record) {

    const applicationID = record.id_job_posts_application
    await api({ data: {}, route: "accessJobSeekerjobPostAppliedRetractApplication/" + applicationID, reduxData, notif: true })
      .then((response) => {
        if (response.success) {
          // Handle success
        }
      })
      .catch((e) => {
        console.log("Unhandled Error: ", e);
      });
    await loadInitialData()
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id_job_posts_application',
      sorter: (a, b) => Number(a.id_job_posts_application) - Number(b.id_job_posts_application),
    },
    {
      title: 'Status',
      dataIndex: 'status_name',
      render: (text, record) => (

        <div className="action-label">
          <a className="btn btn-white btn-sm btn-rounded" href="#" aria-expanded="false">
            {text}
          </a>
        </div>
      ),
      sorter: (a, b) => a.status_name.toLocaleLowerCase() > b.status_name.toLocaleLowerCase(),
    },
    {
      title: 'Job Title',
      dataIndex: 'title_name',
      render: (text, record) => {
        const user_id = reduxData.id_user
        const url = `/access_job_seeker/job-details/${record?.id_job_posts}/jobApplication/${record?.id_job_posts_application}`
        return <Link to={url}>{text}</Link>
      },
      sorter: (a, b) => a.title_.toLocaleLowerCase() > b.title_.toLocaleLowerCase(),
    },
    {
      title: 'Department',
      dataIndex: 'department_name',
      sorter: (a, b) => a.department.toLocaleLowerCase() > b.department.toLocaleLowerCase(),
    },

    {
      title: 'Job Type',
      dataIndex: 'master_job_type_name',
      render: (text, record) => (
        <div className="action-label">
          <a className="btn btn-white btn-sm btn-rounded" href="#" aria-expanded="false">
            <i className={text === "Full Time" ? "fa fa-dot-circle-o text-info" : text === "Part Time" ?
              "fa fa-dot-circle-o text-success" : text === "Internship" ? "fa fa-dot-circle-o text-danger" :
                "fa fa-dot-circle-o text-danger"} /> {text}
          </a>
        </div>
      ),
      sorter: (a, b) => a.master_job_type_name.toLocaleLowerCase() > b.master_job_type_name.toLocaleLowerCase(),
    },
    {
      title: 'Job Status',
      dataIndex: 'status',
      render: (text, record) => (
        <div className="action-label">
          <a className="btn btn-white btn-sm btn-rounded" href="#" aria-expanded="false">
            <i className={text === "Open" ? "fa fa-dot-circle-o text-info" : text === "Closed" ?
              "fa fa-dot-circle-o text-success" : "fa fa-dot-circle-o text-danger"} /> {text}
          </a>
        </div>
      ),
      sorter: (a, b) => a.status.toLocaleLowerCase() > b.status.toLocaleLowerCase(),
    },
    {
      title: 'Action',
      render: (text, record) => (
        <div className="dropdown dropdown-action">
          <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
          <div className="dropdown-menu dropdown-menu-right">
            <a onClick={() => retractOffer(record)} className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Retract Application</a>
          </div>
        </div>
      ),
    },

  ]

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <Helmet>
          <title>Applied</title>
          <meta name="description" content="Login page" />
        </Helmet>



        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Applied</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/access_job_seeker/dashboard">Job Seeker Dashboard</Link></li>
                  <li className="breadcrumb-item ">Applied
                  </li>

                </ul>
              </div>
            </div>
          </div>

          <JobSeekerDashboardHeader />


          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table className="table-striped"
                  pagination={{
                    total: data.length,
                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                  }}
                  style={{ overflowX: 'auto' }}
                  columns={columns}
                  locale={{
                    emptyText: loading ? <Skeleton active={true} /> : <Empty />
                  }}
                  dataSource={data.map((record) => ({
                    ...record,
                    key: record.id_job_posts_application, // Add a unique key for each item
                  }))}

                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppliedJobs;
