import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet";
import Card from '../../../sharedComponents/card'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Space, Spin, Table, Skeleton, notification } from 'antd';
import { Avatar_02, Avatar_05, Avatar_09, Avatar_10, Avatar_16 } from '../../../_services_data/imagepath';
import api from '../../../_services_data/api/_handler'
import { Route, Routes, Outlet, useLocation, Navigate } from 'react-router-dom';


function EmployeeProfile() {
  const location = useLocation();

  const reduxData = useSelector((state) => state.data);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadInitialData() {
    try {
      const requestedProfileId = location.pathname.split('/').pop()

      const response = await api({ data: { id_user: reduxData.id_user }, route: `AdminUserProfile/${requestedProfileId}`, reduxData });
      if (response.success) {
        console.log(response.data)
        setLoading((false))
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





  const Loading_grey = (props) => {
    const { true_data } = props
    return true_data ?
      true_data
      :
      <Space>
        <Spin />
      </Space>
  }




  return (
    <div className="page-wrapper">

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
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/access_team_member/team-members-all">Team Members</Link></li>
                <li className="breadcrumb-item active">Team Member Profile</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card mb-0">
          <div className="card-body">
            <div className="row">

              <Skeleton loading={loading} active>
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

                      </div>
                    </div>
                  </div>
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