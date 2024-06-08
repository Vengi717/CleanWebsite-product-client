import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet";
import Card from '../../../sharedComponents/card'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Space, Spin, Table, Skeleton, notification } from 'antd';
import { Avatar_02, Avatar_05, Avatar_09, Avatar_10, Avatar_16 } from '../../../_services_data/imagepath';
import api from '../../../_services_data/api/_handler'
import ModalGeneralInformation from './modals/generalInformation'
import ModalPersonalInformation from './modals/personalInformation'

import ModalEmergencyInformation from './modals/emergencyContact'
import ModalBankInformation from './modals/bankInformation'
import { Route, Routes, Outlet, useLocation, Navigate } from 'react-router-dom';

function EmployeeProfile() {
  const location = useLocation();

  const reduxData = useSelector((state) => state.data);
  const [data, setData] = useState([]);
  const [documentsData, setdocumentsData] = useState([]);

  const [loading, setLoading] = useState(true);

  async function loadInitialData() {
    try {
      const requestedProfileId = location.pathname.split('/').pop()

      const response = await api({ data: { id_user: reduxData.id_user }, route: `AdminUserProfile/${requestedProfileId}`, reduxData });
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


  useEffect(() => {

      loadInitialData()
   
  }, []);

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


  const handle_file_upload = async (e) => {
    e.preventDefault();
    await load_docs(employeeId)
  };


  const Loading_grey = (props) => {
    const { true_data } = props
    return true_data ?
      true_data
      :
      <Space>
        <Spin />
      </Space>
  }












  const ModalGeneralInformationFormRef = useRef(null);
  const ModalPersonalInformationFormRef = useRef(null);
  const ModalEmergencyInformationFormRef = useRef(null);
  const ModalBankInformationFormRef = useRef(null);






  return (
    <div className="page-wrapper">
      {
        data &&
        <>
          <ModalGeneralInformation
            props={{
              data: data.user_profile,
              FormRef: ModalGeneralInformationFormRef,
              reduxData,
              triggerReload: loadInitialData,
              modalName: "modalGeneralInformation"
            }}
          />
          <ModalPersonalInformation
            props={{
              data: data.user_profile,
              FormRef: ModalPersonalInformationFormRef,
              reduxData,
              triggerReload: loadInitialData,
              modalName: "personal_informaion"

            }}
          />

          <ModalEmergencyInformation
            props={{
              data: data.user_profile,
              FormRef: ModalEmergencyInformationFormRef,
              reduxData,
              triggerReload: loadInitialData,
              modalName: "emergency_contact"

            }}
          />
          <ModalBankInformation
            props={{
              data: data.user_profile,
              FormRef: ModalBankInformationFormRef,
              reduxData,
              triggerReload: loadInitialData,
              modalName: "bank_information"

            }}
          />

        </>
      }
      <input type="file" name='file' hidden onChange={handle_file_upload} className="custom-file-input" id="imgupload" />
      <Helmet>
        <title>Profile - Utopia Tech PTY LTD</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Profile</h3>

            </div>
          </div>
        </div>

        <div className="card mb-0">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <div className="profile-view">
                  <div className="profile-img-wrap">
                    <div className="profile-img">
                      <a href="#">
                        {
                          data.length == 0 ? console.log("111111") : console.log("2222")

                        }
                        {
                          <Skeleton loading={loading} active>
                            {
                              data?.user_profile?.img_url ?
                                <img alt="" src={"https://firebasestorage.googleapis.com/v0/b/hr-v2-79983.appspot.com/o/employees%2F" + data?.user_profile?.img_url} /> : <img alt="" src={Avatar_02} />
                            }
                          </Skeleton >

                        }
                      </a>
                    </div>
                  </div>



                  <div className="pro-edit"><a data-target="#modalGeneralInformation" data-toggle="modal" className="edit-icon" href="#"><i className="fa fa-pencil" /></a></div>
                  <div className="profile-basic">
                    <div className="row">
                      <Skeleton loading={loading} active>
                        <div className="col-md-5">
                          {

                            <div className="profile-info-left">
                              <h3 className="user-name m-t-0 mb-0">
                                {data?.user_profile?.first_name + " " + data?.user_profile?.last_name}
                              </h3>
                              <h6 className="text-muted">
                                {data?.title_info?.title_name}
                              </h6>
                              <small className="text-muted">
                                {data?.department_info?.department_name}
                              </small>
                              <div className="staff-id">Employee ID :
                                {data?.user_profile?.id_user}
                              </div>
                              <div className="small doj text-muted">Date of Join :
                                {new Date(data?.user_profile?.joining_date).toGMTString()}
                              </div>
                              <div hidden className="staff-msg"><a className="btn btn-custom" href="/conversation/chat">Send Message</a></div>
                            </div>

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
                      </Skeleton>
                    </div>
                  </div>



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
          <div id="emp_profile" className="pro-overview tab-pane fade show active">
            <div className="row">
            <Skeleton loading={loading} active>

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
              </Skeleton>

            </div>



            <div className="row">
            <Skeleton loading={loading} active>

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
              </Skeleton>


            </div>

          </div>
        </div>
      </div>




    </div >
  );
}

export default EmployeeProfile