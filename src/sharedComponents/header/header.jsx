import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  headerlogo, Avatar_21
} from '../../_services_data/imagepath'

import api from '../../_services_data/api/_handler';
import { logoutUser } from '../../_services_data/api/user_actions';
import dataServices from '../../_services_data/_services_data'




function Header({ reduxData }) {
  const bearer = reduxData.bearer
  const [permissions, setpermissions] = useState([]);
  const [is_dev, setis_dev] = useState("none");
  const [employee, setEmployee] = useState([]);
  const [employee_id, setEmployee_id] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (bearer) {
        let data = {
          auth: bearer,
          user_id: reduxData.id_user
        };



        await api({ data, route: `getUser`, reduxData })
          .then((response) => {
            if (response.success) {//success
              // console.log(response.data)
              setEmployee(response.data)
            } else {//failed, though handled by server backend with custom fail response 
            }
          })
          .catch((e) => {//failure not handled by custom backend function 
            console.log("Unhandled Error: ", e)
          });
      }
    })();
  }, [reduxData]);


  return (
    <div className="header" style={{ right: "0px" }}>
      {/* Logo */}
      <div className="header-left">
        <Link to="/app/main/dashboard" className="logo">
          <img src={headerlogo} width={40} height={40} alt="" />
        </Link>
      </div>
      {/* /Logo */}
      {
        // <a id="toggle_btn" href="" style={{ display: pathname.includes('tasks') ? "none" : pathname.includes('compose') ? "none" : "" }}>

      }
      <a id="toggle_btn" href="" >


        <span className="bar-icon"><span />
          <span />
          <span />
        </span>
      </a>
      {/* Header Title */}
      <div className="page-title-box">
        <h3>Utopia Tech PTY LTD</h3>
      </div>
      {/* /Header Title */}
      <a id="mobile_btn" className="mobile_btn" href="#sidebar"><i className="fa fa-bars" /></a>
      {/* Header Menu */}
      <ul className="nav user-menu">




        <li className="nav-item dropdown has-arrow main-drop">
          <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
            <span style={{ paddingRight: "15px" }}>
              <span className="user-img">

                {
                  employee?.img_url ?
                    (<img key={employee?.id_user} alt="" src={"https://firebasestorage.googleapis.com/v0/b/hr-v2-79983.appspot.com/o/employees%2F" + employee?.img_url} />)

                    :
                    (<img src={Avatar_21} alt="" />)

                }
                <span className="status online" /></span>

            </span>

            {//console.log("bbbbbbbbbbb: ", employee),
              <span style={{ paddingRight: "15px" }} key={employee.id_user}>{employee.first_name + " " + employee.last_name}</span>

            }
          </a>
          <div className="dropdown-menu">
            <Link to={`/access_job_seeker/user_profile/${employee.id_user}`} className="dropdown-item">My Profile</Link>

            <a style={{ display: is_dev }} className="dropdown-item" href="/settings/companysetting">Settings</a>
            <Link onClick={() => {
              logoutUser({ dispatch, navigate })//TODO: add function;
            }} className="dropdown-item">Logout..</Link>
          </div>
        </li>
      </ul>
      {/* /Header Menu */}
      {/* Mobile Menu */}
      <div className="dropdown mobile-user-menu">
        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
        <div className="dropdown-menu dropdown-menu-right">
          <a className="dropdown-item" href="/access_job_seeker/user_profile/">My Profile..</a>
          <a className="dropdown-item" href="/app/settings/companysetting">Settings</a>
          <a className="dropdown-item" href="/login">Logout</a>
        </div>
      </div>
      {/* /Mobile Menu */}
    </div>

  );
}


export default Header