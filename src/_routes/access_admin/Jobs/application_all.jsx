
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Nav_tabs from "./nav_tabs";
import { Space, Spin, Table, Skeleton, notification, Empty } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../../sharedComponents/paginationfunction";
import "../../../_services_data/assets/css/antdstyle.css";
import service_data from '../../../_services_data/_services_data'
import api from '../../../_services_data/api/_handler';
import { useDispatch, useSelector } from 'react-redux';



function toJSONLocal(date) {

  var local = new Date(date);
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
}

function AppliedCandidate() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const reduxData = useSelector((state) => state.data);

  useEffect(() => {
    loadInitialData()
  }, []);


  async function loadInitialData() {
    try {
      const response = await api({ data: {}, route: 'adminAccessApplicationsAll', reduxData });
      if (response.success) {
        console.log(response.data)
        setData(response.data);
        setLoading(false)

      } else {
        console.log('Handled error', response);
      }
    } catch (e) {
      console.log('Unhandled Error: ', e);
    }
  }


  const handleStatus = async (props) => {


    const { status_new, status_old, status_new_id, id_application, id_user } = props
    if (status_new != 'Onboarded') {
      await service_data.access_admin.jobs.update_status({ status_name: status_new, id_application })
    }

    else {//checking if the required for onboard docs are uploaded
      const required = await service_data.access_admin.jobs.v2_document_names({
        id_user,
        only_active: true,
        required_for_onboard: true
      })

      const actual = await service_data.access_admin.jobs.get_user_docs_by_user_id({
        id_user,
        only_active: true,
        required_for_onboard: true,
        approved: true
      })


      if (required.length != actual.length) {
        notification.warning({
          message: 'Warning!',
          description: 'Inform user to complete company supplied documents first. e.g Contract, NDA',
          duration: 5
        });
      } else {
        await service_data.access_admin.jobs.update_status({ status_name: status_new, id_application })
      }
    }
    await load_data()
  };
  const columns = [
    {
      key: 'id_job_posts_application',
      title: '#',
      dataIndex: 'id_job_posts_application',
      sorter: (a, b) => a.id_job_posts_application.length - b.id_job_posts_application.length,
    },
    {
      key: 'department_name',
      title: 'Job Post',
      dataIndex: 'department_name',
      render: (text, record) => (
        <Link to={`/access_admin/job-details/` + record.id_applicants}>{text + "  -  " + record.title_name}</Link>
      ),
      sorter: (a, b) => a[text].length - b[text].length,
    },
    {
      key: 'first_name',
      title: 'Name',
      dataIndex: 'first_name',
      render: (text, record) => (
        <Link to={`/access_admin/user_profile/` + record.id_applicants}>{text + " " + record.last_name}</Link>
      ),
      sorter: (a, b) => a.first_name.length - b.first_name.length,
    },
    {
      key: 'applied_at',
      title: 'Apply Date',
      dataIndex: 'applied_at',
      render: (text, record) => (
        <div>{toJSONLocal(new Date(text))}</div>
      ),
      sorter: (a, b) => new Date(a.applied_at) - new Date(b.applied_at),
    }, {
      key: 'status_name',
      title: 'Status',
      dataIndex: 'status_name',
      render: (text, record, index) => (
        <div className="dropdown dropdown-action text-center">
          <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
            <i className={text === "Onboarded" ? "fa fa-dot-circle-o text-success" : text === "Rejected" ?
              "fa fa-dot-circle-o text-danger" : "fa fa-dot-circle-o text-info"} /> {text}
          </a>

        </div>
      ),
      sorter: (a, b) => a.status_name.length - b.status_name.length,
      width: '250px',
      align: 'left'
    },
    
  ]

 






  return (

    <div className="page-wrapper" >
      <Helmet>
        <title>Jobs Applicants - Utopia Tech PTY LTD</title>
        <meta name="description" content="Login page" />
      </Helmet>

      {/* Page Content */}
      <div className="content container-fluid" >
        {/* Page Header */}
        < div className="page-header" >
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Job Applications..</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/access_admin/job-dashboard">Job Dashboard</Link></li>
                <li className="breadcrumb-item active">Job Applications</li>
              </ul>
            </div>
          </div>
        </div>
        <Nav_tabs />

        {/* /Page Header */}

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">

              <Table className="table-striped"
                pagination={{
                  total: data?.applications?.length,
                  //showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showTotal: (total, range) => `Showing ${range[1]} of ${total} entries`,
                  showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                }}
                style={{ overflowX: 'auto' }}
                columns={columns}


                dataSource={data?.applications}
                rowKey={record => record.id_applicants}


                locale={{
                  emptyText: loading ? <Skeleton active={true} /> : <Empty />
                }}
              />

            </div>
          </div>
        </div>
      </div >
      {/* /Page Content */}
    </div >
  );
}


export default AppliedCandidate
/*     <Table className="table-striped"
                 pagination={{
                   total: data?.length,
             //      showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                   showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                 }}
                 style={{ overflowX: 'auto' }}
                 columns={columns}
                 dataSource={data?.applications}
                 rowKey={record => record.id_applicants}

                 locale={{
                   emptyText: loading ? <Skeleton active={true} /> : <Empty />
                 }}
               />*/