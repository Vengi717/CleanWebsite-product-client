


import { Switch } from 'antd';


import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet";
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import Employeessdashboardheader from "./nav_tabs";
import { Avatar_01 } from "../../../_services_data/imagepath";
import api from '../../../_services_data/api/_handler'
import { useDispatch, useSelector } from 'react-redux';

const Main = (props) => {
  const [data, setData] = useState({});
  const reduxData = useSelector((state) => state.data);
  const addTeamMemberFormRef = useRef(null);

  useEffect(() => {
    loadInitialData()
  }, []);

  async function loadInitialData() {
    try {
      const response = await api({ data: { only_active: true }, route: 'AccessAdminUsersTeamMembers', reduxData });
      if (response.success) {
        setData(response.data)
        
      } else {
        console.log('Handled error', response);
      }
    } catch (e) {
      console.log('Unhandled Error: ', e);
    }
  }



  const [rows, setRows] = useState([]);
  const permsSelectRef = useRef(null);
  const [selectedTitle, setselectedTitle] = useState(null);


 
  


  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Team Members - Utopia Tech PTY LTD</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Users</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/team_members_all">Team Members</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Skeleton loading={props.loading} active>
          <div className="row staff-grid-row">
            {data.teamMembers?.map((teamMember, index) => (
              <div
                className={`col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3
                 `} key={index}
              >
                <div
                  className={`profile-widget`}
                >

                  <div className="profile-img">
                    <Link
                      to={"/access_team_member/userProfile/" + teamMember.id_user}
                      className="avatar"
                    >
                      {teamMember?.img_url ? (
                        <img
                          alt=""
                          src={
                            'https://firebasestorage.googleapis.com/v0/b/hr-v2-79983.appspot.com/o/employees%2F' +
                            teamMember?.img_url
                          }
                        />
                      ) : (
                        <img alt="" src={Avatar_01} />
                      )}
                    </Link>
                  </div>
                  <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                    <Link to={"/access_team_member/userProfile/" + teamMember.id_user}>
                      {teamMember.first_name} {teamMember.last_name}
                    </Link>
                  </h4>
                  <div className="small text-muted">
                    {teamMember.title_name}
                  </div>
                  <small className="text-muted">
                    {teamMember.department_name}
                  </small>
             
                </div>
              </div>
            ))}
          </div>
        </Skeleton>
      </div>

      
    </div>
  );
};

export default Main


/*    <DdDepTitleTm
              data={data}
            ></DdDepTitleTm>
*/