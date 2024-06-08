import React, { useState, useEffect, useRef } from 'react';
import { notification } from 'antd';
import api from '../../_services_data/api/_handler';
import { Helmet } from "react-helmet";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { createTimeStamp } from '../../../src/_services/momentHelper';
import { Applogo } from '../../_services_data/imagepath.jsx';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../_services_data/api/user_actions.js'

import Header from './header';

function Registrationpage(props) {
  const navigate = useNavigate();
  const FormRef = useRef(null);
  const location = useLocation();

  const reduxData = useSelector((state) => state.data);
  const dispatch = useDispatch();


  async function handleSubmit({ event }) {

    event.preventDefault();
    const formData = new FormData(FormRef.current);
    const data = {};

    formData?.forEach((value, key) => {
      data[key] = value;
    });


    console.log("form: ", { data: { nonTeamMember: data } })
    await api({ data: { nonTeamMember: data }, route: `createTeamMember`, reduxData, notif: true })
      .then(async (response) => {
        if (response.success) {//success

          const result = await login({
            userData: { email: data.email, password: data.password },
            dispatch,
            navigate,
            reduxData
          });

        }
      })
      .catch((e) => {//failure not handled by custom backend function 
        console.log("Unhandled Error: ", e)
      });
    // $('#' + modalName).modal('hide');
    //  await triggerReload()
  }





  return (
    <div className="page-wrapper" style={{ marginLeft: '0px' }}>
      <div className="content container-fluid">


        <Helmet>
          <title>Register - Utopia Tech PTY LTD</title>
          <meta name="description" content="Login page" />
        </Helmet>

        <Header></Header>


        <div className="row">
          <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">Apply Job</Link>
          <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">Login</Link>
          <div className="container">
            <div className="account-logo">
              <div><img src={Applogo} alt="Utopia Tech PTY LTD" /></div>
            </div>
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Register</h3>
                <p className="account-subtitle">Access to the portal</p>


                <form ref={FormRef} onSubmit={(event => handleSubmit({ event }))}>
                  <div className="form-group">
                    <label>First Name</label>
                    <input

                      required
                      name="first_name" // Use name attribute
                      className="form-control"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input

                      required
                      name="last_name" // Use name attribute
                      className="form-control"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input

                      required
                      name="phone" // Use name attribute
                      className="form-control"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input

                      required
                      name="email" // Use name attribute
                      className="form-control"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input

                      required
                      name="password" // Use name attribute
                      className="form-control"
                      type="password"
                    />
                  </div>
                  <div className="form-group">
                    <label>Repeat Password</label>
                    <input

                      required
                      className="form-control"
                      type="password"
                    />
                  </div>
                  <div className="form-group text-center">
                    <button className="btn btn-primary account-btn" type="submit">
                      Register
                    </button>
                  </div>
                  <div className="account-footer">
                    <p>
                      Already have an account? <Link to="/login">Login</Link>
                    </p>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>



      </div>
    </div>

  );
}

export default Registrationpage;
