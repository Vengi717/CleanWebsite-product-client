//user_access
import React, { Component, useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import Card from '../../../sharedComponents/card'
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { Space, Spin, Table, Skeleton, notification } from 'antd';

import Basic_table from '../../../sharedComponents/basic_table';
import { Avatar_02, Avatar_05, Avatar_09, Avatar_10, Avatar_16 } from '../../../_services_data/imagepath';
import Basic_timeline_table from '../../../sharedComponents/basic_timeline_table';
import Basic_timeline_table_exp from '../../../sharedComponents/Basic_timeline_table_exp';
import { itemRender, onShowSizeChange } from "../../../sharedComponents/paginationfunction";
import services_data from '../../../_services_data/_services_data'
import Modal_maker from '../../../sharedComponents/modal_maker/index'

import api from '../../../_services_data/api/_handler'
import { Route, Routes, Outlet, useLocation, Navigate } from 'react-router-dom';

function EmployeeProfile() {
  const reduxData = useSelector((state) => state.data);

  const jobPost = []
  const profileData = []
  const applicationData = []
  const currentApplicationStatus = []
  const applicationStatuses = []

  const columnsOfSpecificCompanyProvidedDocuments = []
  const specificCompanyProvidedDocumentsData = []


  const [data, setData] = useState([]);
  const [documentsData, setdocumentsData] = useState([]);

  const location = useLocation();

  async function loadInitialData() {
    try {      const requestedProfileId = location.pathname.split('/').pop()

      const response = await api({ data: { id_user: reduxData.id_user }, route: `AdminUserProfile/${requestedProfileId}`, reduxData });
      if (response.success) {
        console.log(response.data)
        setData(response.data);
        if (response.data && response.data?.deps.length > 0) {
        }
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


  // const {data, data, permissions } = this.props;
  const [employee_document_url_name, set_employee_document_url_name] = useState(null);

  async function load_docs(employee_id) {
    var temp = JSON.parse(localStorage.getItem("redux"))
    let data = {
      ...{ auth: temp.bearer },// if an auth is required
    };
    await api.handler(data, `getDocumentsByEmployeeId/${employee_id}`)
      .then(async (response2) => {
        if (response2.success) { //success
          setDocumentsData(response2.data);
        } else {//failed, though handled by server backend with custom fail response2 
          console.log("handled error", response2);
        }
      })
      .catch(async (e) => {//failure not handled by custom backend function 
        console.log("Unhandled Error: ", e);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    data.dataa[name] = value;
    setdata(data);
  };



  const handle_file_upload = async (e) => {
    e.preventDefault();



    await load_docs(employeeId)



  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'document_name',
      render: (text, record) => (
        <div>{text}</div>),
      sorter: (a, b) => a.document_name.length - b.document_name.length,
    },
    {
      title: 'Approved',
      dataIndex: 'approved',
      render: (text, record) => (
        <div>{text === 1 ? 'True' : 'False'}</div>),
      sorter: (a, b) => a.approved.length - b.title.length,
    },
    {
      title: 'Action',
      dataIndex: 'document_url',

      render: (text, record) => (
        <div className="dropdown dropdown-action text-right">
          <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" hidden  > View</a>

            <a hidden className="dropdown-item" onClick={async () => {
              await setIdEmployeeDocumentUrlName(record.id_employee_document_url_name);
              await set_employee_document_url_name(record.name)
              await $('#imgupload').trigger('click');
            }}>
              <label >Upload</label>
            </a>
            <a
              onClick={() => { window.open(text) }}
              className="dropdown-item"><span> Download</span></a>
          </div>
        </div >
      ),
    },
  ];


  const Loading_grey = (props) => {
    const { true_data } = props
    return true_data ?
      true_data
      :
      <Space>
        <Spin />
      </Space>
  }

  const modal_data_personal_information = {
    title: "Edit Personal Information",
    callback: (modal_response) => services_data.access_job_seeker.users.edit_user_profile(modal_response),
    reload_state_function: () => loadInitialData(),
    modal_name: "personal_informaion",
    editing: {
      key: "id_user",
      data:
        data?.user_profile,

    },
    inputs: [
      [
        {
          title: "Passport No.",
          required: true,
          type: "textfield",
          id_name: 'passport_number',
          default: data?.user_profile?.passport_number
        },
        {
          title: "Passport Exp Date",
          required: true,
          type: "dateselect",
          id_name: 'passport_exp_date',
          default: data?.user_profile?.passport_exp_date
        },

      ],
      [
        {
          title: "Nationality",
          required: true,
          type: "textfield",
          id_name: 'nationality',
          default: data?.user_profile?.nationality
        },
        {
          title: "Religion",
          required: true,
          type: "textfield",
          id_name: 'religion',
          default: data?.user_profile?.religion
        },
      ],
      [
        {
          title: "Marital status",
          required: true,
          type: "textfield",
          id_name: 'marital_status',
          default: data?.user_profile?.marital_status
        },
        {
          title: "Employment of spouse",
          required: true,
          type: "textfield",
          id_name: 'employement_of_spouse',
          default: data?.user_profile?.employement_of_spouse
        },
      ],
      [
        {
          title: "No. of children",
          required: true,
          type: "textfield",
          id_name: 'number_of_children',
          default: data?.user_profile?.number_of_children
        }
      ]
    ]
  }

  const modal_data_emergency_contact = {
    title: "Edit Emergency Contact",
    callback: (modal_response) => services_data.access_job_seeker.users.edit_user_profile(modal_response),
    reload_state_function: () => loadInitialData(),
    modal_name: "emergency_contact",
    editing: {
      key: "id_user",
      data:
        data?.user_profile,

    },
    inputs: [
      [
        {
          title: "Name",
          required: true,
          type: "textfield",
          id_name: 'emergency_contact_1_name',
          default: data?.user_profile?.emergency_contact_1_name
        },
        {
          title: "Relationship",
          required: true,
          type: "textfield",
          id_name: 'emergency_contact_1_relationship',
          default: data?.user_profile?.emergency_contact_1_relationship
        }, {
          title: "Number",
          required: true,
          type: "textfield",
          id_name: 'emergency_contact_1_phone',
          default: data?.user_profile?.emergency_contact_1_phone
        },

      ],

      [{
        title: "Name 2",
        required: true,
        type: "textfield",
        id_name: 'emergency_contact_2_name',
        default: data?.user_profile?.emergency_contact_2_name
      },
      {
        title: "Relationship 2",
        required: true,
        type: "textfield",
        id_name: 'emergency_contact_2_relationship',
        default: data?.user_profile?.emergency_contact_2_relationship
      },
      {
        title: "Number 2",
        required: true,
        type: "textfield",
        id_name: 'emergency_contact_2_phone',
        default: data?.user_profile?.emergency_contact_2_phone
      },
      ],

    ]
  }


  const modal_data_bank_information = {
    title: "Edit Bank Information",
    callback: (modal_response) => services_data.access_job_seeker.users.edit_user_profile(modal_response),
    reload_state_function: () => loadInitialData(),
    modal_name: "bank_information",
    editing: {
      key: "id_user",
      data:
        data?.user_profile,

    },
    inputs: [
      [
        {
          title: "Bank Name",
          required: true,
          type: "textfield",
          id_name: 'bank_name',
          default: data?.user_profile?.bank_name
        },
        {
          title: "Account Number",
          required: true,
          type: "textfield",
          id_name: 'bank_account_number',
          default: data?.user_profile?.bank_account_number
        }

      ],

      [
        {
          title: "Routing Number",
          required: true,
          type: "textfield",
          id_name: 'bank_routing_number',
          default: data?.user_profile?.bank_routing_number
        }, {
          title: "Name on Account",
          required: true,
          type: "textfield",
          id_name: 'bank_name_on_account',
          default: data?.user_profile?.bank_name_on_account
        },
        {
          title: "Account Name",
          required: true,
          type: "textfield",
          id_name: 'bank_account_name',
          default: data?.user_profile?.bank_account_name
        },

      ],

    ]
  }

  const modal_data_family_information = {
    title: "Edit Family Information",
    callback: (modal_response) => services_data.access_job_seeker.users.edit_family_info(modal_response),
    reload_state_function: () => loadInitialData(),
    modal_name: "family_information",
    editing: {
      key: "id_user",
      data:
        data?.family_info,

    },
    inputs: [
      [
        {
          type: "table",
          row_id_name: "family_info_id"
          ,
          cols: [
            {
              name: "Name",
              id_name: "name"
            },
            {
              name: "Relationship",
              id_name: "relationship"
            },
            {
              name: "DOB",
              id_name: "DOB"
            },
            {
              name: "Phone",
              id_name: "phone"
            }],
          data:
            data?.family_info


        }
      ]
    ]
  }
  const modal_data_experience = {
    title: "Edit Education History",
    callback: (modal_response) => services_data.access_job_seeker.users.edit_experince(modal_response),
    reload_state_function: () => loadInitialData(),
    modal_name: "user_experience",
    editing: {
      key: "id_user",
      data:
        data?.experience_info,

    },
    inputs: [
      [
        {
          type: "table",
          row_id_name: "experience_id"
          ,
          cols: [
            {
              name: "Name of Provider",
              id_name: "name_of_providor"
            },
            {
              name: "Position",
              id_name: "position"
            },
            {
              name: "Start Date",
              id_name: "start"
            },
            {
              name: "End Date",
              id_name: "end"
            },
            {
              name: "Address",
              id_name: "address"
            }],
          data:
            data?.experience_info


        }
      ]
    ]
  }

  const modal_data_education_history = {
    title: "Edit Education History",
    callback: (modal_response) => services_data.access_job_seeker.users.edit_education_history(modal_response),
    reload_state_function: () => loadInitialData(),
    modal_name: "education_history",
    editing: {
      key: "id_user",
      data:
        data?.education_info,

    },
    inputs: [
      [
        {
          type: "table",
          row_id_name: "id_users_education"
          ,
          cols: [
            {
              name: "Name of Provider",
              id_name: "name_of_providor"
            },
            {
              name: "Course",
              id_name: "course"
            },
            {
              name: "Start Date",
              id_name: "start"
            },
            {
              name: "End Date",
              id_name: "end"
            },
            {
              name: "Address",
              id_name: "address"
            }],
          data:
            data?.education_info


        }
      ]
    ]
  }

  const modal_data_general_information = {
    title: "Edit General Information",
    callback: (modal_response) => services_data.access_job_seeker.users.edit_user_profile(modal_response),
    reload_state_function: () => loadInitialData(),
    modal_name: "general_info",
    editing: {
      key: "id_user",
      data:
        data?.user_profile,

    },
    inputs: [
      [
        {
          title: "First Name",
          required: true,
          type: "textfield",
          id_name: 'first_name',
          default: data?.user_profile?.first_name
        },
        {
          title: "Last Name",
          required: true,
          type: "textfield",
          id_name: 'last_name',
          default: data?.user_profile?.last_name
        },

      ],
      [
        {
          title: "Email",
          required: true,
          type: "textfield",
          id_name: 'email',
          default: data?.user_profile?.email
        },
        {
          title: "Password",
          required: true,
          type: "textfield",
          id_name: 'password',
          default: '',
          password: true
        },
      ],
      [
        {
          title: "Phone",
          required: true,
          type: "textfield",
          id_name: 'phone',
          default: data?.user_profile?.phone
        },
        {
          title: "D.O.B",
          required: true,
          type: "dateselect",
          id_name: 'DOB',
          default: data?.user_profile?.DOB
        },
      ],
      [
        {
          title: "Street Number",
          required: true,
          type: "textfield",
          id_name: 'addr_street_number',
          default: data?.user_profile?.addr_street_number
        },
        {
          title: "Street Name",
          required: true,
          type: "textfield",
          id_name: 'addr_street_name',
          default: data?.user_profile?.addr_street_name
        },
        {
          title: "Town",
          required: true,
          type: "textfield",
          id_name: 'addr_town',
          default: data?.user_profile?.addr_town
        },
        {
          title: "City",
          required: true,
          type: "textfield",
          id_name: 'addr_city',
          default: data?.user_profile?.addr_city
        },
        {
          title: "State",
          required: true,
          type: "textfield",
          id_name: 'addr_state',
          default: data?.user_profile?.addr_state
        },
        {
          title: "Country",
          required: true,
          type: "textfield",
          id_name: 'addr_country',
          default: data?.user_profile?.addr_country
        },
        {
          title: "Zip/Post Code",
          required: true,
          type: "textfield",
          id_name: 'addr_zip_code',
          default: data?.user_profile?.addr_zip_code
        },
        {
          title: "Apt #",
          required: true,
          type: "textfield",
          id_name: 'addr_apt_number',
          default: data?.user_profile?.addr_apt_number
        },
        {
          title: "Gender",
          required: true,
          type: "textfield",
          id_name: 'gender',
          default: data?.user_profile?.gender
        }
      ]
    ]
  }


  return (
    <div className="page-wrapper">


      <Modal_maker
        data={modal_data_general_information}
      ></Modal_maker>

      <Modal_maker
        data={modal_data_personal_information}
      ></Modal_maker>

      <Modal_maker
        data={modal_data_emergency_contact}
      ></Modal_maker>

      <Modal_maker
        data={modal_data_bank_information}
      ></Modal_maker>

      <Modal_maker
        data={modal_data_family_information}
      ></Modal_maker>

      <Modal_maker
        data={modal_data_experience}
      ></Modal_maker>

      <Modal_maker
        data={modal_data_education_history}
      ></Modal_maker>


      <input type="file" name='file' hidden onChange={handle_file_upload} className="custom-file-input" id="imgupload" />

      <Helmet>
        <title>Team Member Profile - Utopia Tech PTY LTD</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Profile</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/access_admin/team_members_all">Admin Team Members</Link>
                </li>
                <li className="breadcrumb-item active">Profile</li>
              </ul>
            </div>
          </div>
        </div>
        {//data?.emp?.map((e) => { return e.first_name })
        }
        {/* /Page Header */}
        <div className="card mb-0">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <div className="profile-view">
                  <div className="profile-img-wrap">
                    <div className="profile-img">
                      <a href="#">
                        {
                          data?.user_profile?.img_url ?
                            <img alt="" src={"https://firebasestorage.googleapis.com/v0/b/hr-v2-79983.appspot.com/o/employees%2F" + data?.user_profile?.img_url} /> : <img alt="" src={Avatar_02} />
                        }
                      </a>
                    </div>
                  </div>
                  <div className="profile-basic">
                    <div className="row">
                      <div className="col-md-5">
                        {
                          data ?
                            <div className="profile-info-left">
                              <h3 className="user-name m-t-0 mb-0">
                                <Loading_grey
                                  true_data={data?.user_profile?.first_name + " " + data?.user_profile?.last_name}
                                />
                              </h3>
                              <h6 className="text-muted">
                                <Loading_grey
                                  true_data={data?.title_info?.title_name}
                                />
                              </h6>
                              <small className="text-muted">
                                <Loading_grey
                                  true_data={data?.department_info?.department_name}
                                />
                              </small>
                              <div className="staff-id">Employee ID :
                                <Loading_grey
                                  true_data={data?.user_profile?.id_user}
                                />
                              </div>
                              <div className="small doj text-muted">Date of Join :
                                <Loading_grey
                                  true_data={new Date(data?.user_profile?.joining_date).toGMTString()}
                                />
                              </div>
                              <div hidden className="staff-msg"><a className="btn btn-custom" href="/conversation/chat">Send Message</a></div>
                            </div>
                            :
                            <Space>
                              <Spin />
                            </Space>
                        }

                      </div>
                      <div className="col-md-7">
                        {
                          data?.user_profile?.id_user != undefined ?
                            <ul className="personal-info">
                              <li>
                                <div className="title">Phone:</div>
                                <div className="text">
                                  <Loading_grey
                                    true_data={data?.user_profile.phone}
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="title">Email:</div>
                                <div className="text">

                                  {data?.user_profile.email}

                                </div>
                              </li>
                              <li>
                                <div className="title">Birthday:</div>
                                <div className="text">{data?.user_profile.DOB}</div>
                              </li>
                              <li>
                                <div className="title">Address:</div>

                                <div className="text">
                                  {
                                    data?.user_profile.addr_street_number + " " +
                                    data?.user_profile.addr_street_name + ", " +
                                    "Apt " + data?.user_profile.addr_apt_number + "" +
                                    data?.user_profile.addr_town + ", " +
                                    data?.user_profile.addr_city + ", " +
                                    data?.user_profile.addr_state + ", " +
                                    data?.user_profile.addr_country + ", " +
                                    data?.user_profile.addr_zip_code
                                  }</div>
                              </li>
                              <li>
                                <div className="title">Gender:</div>

                                <div className="text">{data?.user_profile.gender}</div>

                              </li>
                              <li>
                                <div hidden className="title">Reports to:</div>
                                <div hidden className="text">
                                  <div className="avatar-box">
                                    <div className="avatar avatar-xs">
                                      <img src={Avatar_16} alt="" />
                                    </div>
                                  </div>
                                  <a href="/profile/employee-profile">
                                    NOT CODED
                                  </a>
                                </div>
                              </li>
                            </ul>
                            :
                            <Space>
                              <Spin />
                            </Space>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="pro-edit"><a data-target="#general_info" data-toggle="modal" className="edit-icon" href="#"><i className="fa fa-pencil" /></a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card tab-box">
          <div className="row user-tabs">
            <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
              <ul className="nav nav-tabs nav-tabs-bottom">
                <li className="nav-item"><a href="#emp_profile" data-toggle="tab" className="nav-link active">Profile</a></li>
                <li hidden className="nav-item"><a href="#bank_statutory" data-toggle="tab" className="nav-link">Bank &amp; Statutory <small className="text-danger">(Admin Only)</small></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="tab-content">
          {/* Profile Info Tab */}
          <div id="emp_profile" className="pro-overview tab-pane fade show active">
            <div className="row">
              <div style={{ flex: ' 100', maxWidth: ' 100% ' }} className="col-md-6 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">Application Overview
                    </h3>
                    <ul className="personal-info">
                      <li>
                        <div className="title">Job Title</div>
                        {!jobPost ? (
                          <Space>
                            <Spin />
                          </Space>
                        ) : (
                          <React.Fragment>
                            <div className="text">{jobPost.title}</div>
                          </React.Fragment>
                        )}
                      </li>
                      <li>
                        <div className="title">Department</div>
                        {!profileData ? (
                          <Space>
                            <Spin />
                          </Space>
                        ) : (
                          <React.Fragment>
                            <div className="text">{applicationData[0]?.department}</div>
                          </React.Fragment>
                        )}
                      </li>
                      <li>
                        <div className="title">Job Type</div>
                        {!jobPost ? (
                          <Space>
                            <Spin />
                          </Space>
                        ) : (
                          <React.Fragment>
                            <div className="text">{jobPost.type}</div>
                          </React.Fragment>
                        )}
                      </li>
                      <li>
                        <div className="title">Application Status</div>
                        {!jobPost ? (
                          <Space>
                            <Spin />
                          </Space>
                        ) : (
                          <React.Fragment>
                            <div className="dropdown action-label text-center">
                              <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                {
                                  currentApplicationStatus && (
                                    <i className={`fa fa - dot - circle - o text - ${currentApplicationStatus.id_applicantion_statuses === 1 ? 'success' : currentApplicationStatus.id_applicantion_statuses === 8 ? 'danger' : 'info'} `} />
                                  )
                                }
                                {currentApplicationStatus ? currentApplicationStatus.status_name : 'No Choosen'}
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                {
                                  applicationStatuses.map((statusItem, index) => (
                                    <a
                                      key={index}
                                      className="dropdown-item"
                                      onClick={() => handleApplicationStatus(currentApplicationStatus.id_applicantion_statuses, statusItem.id_applicantion_statuses)}
                                    >
                                      <i className={`fa fa - dot - circle - o text - ${statusItem.status_name === 'Applied' ? 'success' : statusItem.status_name === 'Rejected' ? 'danger' : 'info'} `} /> {statusItem.status_name}
                                    </a>
                                  ))
                                }
                              </div>
                            </div>
                          </React.Fragment>
                        )}
                      </li>
                      <li>
                        <div className="title">Job Post Status</div>
                        {!jobPost ? (
                          <Space>
                            <Spin />
                          </Space>
                        ) : (
                          <React.Fragment>
                            <div className="text">{jobPost.status}</div>
                          </React.Fragment>
                        )}
                      </li>
                      <li>
                        <div className="title">Applications</div>
                        {!jobPost ? (
                          <Space>
                            <Spin />
                          </Space>
                        ) : (
                          <React.Fragment>
                            <div className="text">{profileData?.profile?.[0]?.["marital_status"]}</div>
                          </React.Fragment>
                        )}
                      </li>

                      <li>
                        <div className="title">Vacancies</div>
                        {!jobPost ? (
                          <Space>
                            <Spin />
                          </Space>
                        ) : (
                          <React.Fragment>
                            <div className="text">{jobPost.vaccancy}</div>
                          </React.Fragment>
                        )}
                      </li>

                    </ul>
                  </div>
                </div>
              </div>

            </div>





            <div className="row">
              <div style={{ flex: ' 100', maxWidth: ' 100% ' }} className="col-md-6 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">Candidate Provided Documents</h3>
                    <Table className="table-striped"
                      pagination={{
                        total: documentsData.length,
                        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                      }}
                      style={{ overflowX: 'auto' }}
                      columns={columns}
                      // bordered
                      dataSource={documentsData}
                      rowKey={record => record.id_job_posts}
                    // onChange={this.handleTableChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div style={{ flex: ' 100', maxWidth: ' 100% ' }} className="col-md-6 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">Company Provided Documents</h3>
                    <Table className="table-striped"
                      pagination={{
                        total: documentsData.length,
                        showTotal: (total, range) => `Showing ${range[0]
                          } to ${range[1]} of ${total} entries`,
                        showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                      }}
                      style={{ overflowX: 'auto' }}
                      columns={columnsOfSpecificCompanyProvidedDocuments}
                      // bordered
                      dataSource={specificCompanyProvidedDocumentsData}
                      rowKey={record => record.id_job_posts}
                    // onChange={this.handleTableChange}
                    />
                  </div>
                </div>
              </div>
            </div>




            <div className="row">
              <div style={{ flex: ' 100', maxWidth: ' 100% ' }} className="col-md-6 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">Documents</h3>
                    <Table className="table-striped"
                      pagination={{
                        total: documentsData.length,
                        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                      }}
                      style={{ overflowX: 'auto' }}
                      columns={columns}
                      // bordered
                      dataSource={data?.documents ? data?.documents : []}
                      rowKey={record => record.id_2v_master_documents}
                    // onChange={this.handleTableChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 d-flex">
                <Card
                  modal_data={
                    { modal_name: "personal_informaion" }
                  }
                  title={"Personal Information"}
                  data={[
                    { name: "Passport No.", value: data?.user_profile?.passport_number },
                    { name: "Passport Exp Date", value: data?.user_profile?.passport_exp_date },
                    { name: "Nationality", value: data?.user_profile?.nationality },
                    { name: "Religion", value: data?.user_profile?.religion },
                    { name: "Marital status", value: data?.user_profile?.marital_status },
                    { name: "Employment of spouse", value: data?.user_profile?.employement_of_spouse },
                    { name: "No. of children", value: data?.user_profile?.number_of_children },
                  ]}
                ></Card>
              </div>
              <div className="col-md-6 d-flex">
                <Card
                  modal_data={
                    { modal_name: "emergency_contact" }
                  }
                  title={"Emergency Contact"}
                  data={[
                    { value: "Primary" },
                    { name: "Name", value: data?.user_profile?.emergency_contact_1_name },
                    { name: "Relationship", value: data?.user_profile?.emergency_contact_1_relationship },
                    { name: "Number", value: data?.user_profile?.emergency_contact_1_phone },
                    { value: "Secondary" },
                    { name: "Name", value: data?.user_profile?.emergency_contact_2_name },
                    { name: "Relationship", value: data?.user_profile?.emergency_contact_2_relationship },
                    { name: "Number", value: data?.user_profile?.emergency_contact_2_phone },
                  ]}
                ></Card>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 d-flex">


                <Card
                  modal_data={
                    { modal_name: "bank_information" }
                  }
                  title={"Bank Information"}
                  data={[
                    { name: "Bank Name", value: data?.user_profile?.bank_name },
                    { name: "Acc Name", value: data?.user_profile?.bank_account_name },
                    { name: "Name on Acc", value: data?.user_profile?.bank_name_on_account },
                    { name: "Acc #", value: data?.user_profile?.bank_account_number },
                    { name: "Routing #", value: data?.user_profile?.bank_routing_number },
                  ]}
                ></Card>
              </div>
              {
                //TODO: refractor the below
              }
              <Basic_table data={data?.family_info}
                modal_data={
                  { modal_name: "family_information" }
                }





              />
            </div>
            <div className="row">
              {
                //TODO: refractor the below
              }
              <Basic_timeline_table
                modal_data={
                  { modal_name: "education_history" }
                }

                data={data?.education_info} />
              {
                //TODO: refractor the below
              }
              <Basic_timeline_table_exp


                modal_data={
                  { modal_name: "user_experience" }
                }

                data={data?.experience_info} />
            </div>
          </div>
          {/* /Profile Info Tab */}
        </div>
      </div>
      {/* /Page Content */}
    </div >
  );
}


export default EmployeeProfile








