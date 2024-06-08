


import { Switch } from 'antd';


import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet";
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import Employeessdashboardheader from "./nav_tabs";
import { Avatar_01 } from "../../../_services_data/imagepath";
import service_data from '../../../_services_data/_services_data'
import api from '../../../_services_data/api/_handler'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import DdDepTitleTm from './components/ddDepTitleTm'
import DdDepTitle from './components/ddDepTitle'
import './styles.css'

const Main = (props) => {
  const [data, setData] = useState({});
  const reduxData = useSelector((state) => state.data);
  const addTeamMemberFormRef = useRef(null);

  useEffect(() => {
    loadInitialData()
  }, []);

  async function loadInitialData() {
    try {
      const response = await api({ data: { only_active: false }, route: 'v3accessAdminUsersUsersOther', reduxData });
      if (response.success) {
        setData(response.data)
        
      } else {
        console.log('Handled error', response);
      }
    } catch (e) {
      console.log('Unhandled Error: ', e);
    }
  }


async function getTableData() {
  const formData = new FormData(addTeamMemberFormRef.current);
  const tableData = [];

  // Iterate through the table rows and extract the required data
  await document.querySelectorAll('#module_permissions tbody tr').forEach((row) => {
    const permissions_master_id = row.getAttribute('id').replace('module_', ''); // Extract row ID

    // Use the checkboxes state to get the checked state
    const readCheckbox = checkboxes[`module_${permissions_master_id}_read`];

    // Store the row data in an object
    const rowData = {
      permissions_master_id,
      read: !!readCheckbox,
    };

    tableData.push(rowData); // Add the object to the array
  });

  return tableData; // Return the array of row data
}


  async function createteamMember(event) {
    event.preventDefault();
    const formData = new FormData(addTeamMemberFormRef.current);
    const data = {
      "first_name": formData.get('first_name'),
      "last_name": formData.get('last_name'),
      "id_master_title": formData.get('id_master_title'),
      "reportsTo": formData.get('reportsTo'),
      "email": formData.get('email'),
      "password": formData.get('password'),
      "phone": formData.get('phone'),
      nonTeamMember: true
    };

    console.log("submit data: ", { data: { teamMember: data, permissions: await getTableData() } })


    await api({ data: { teamMember: data, permissions: await getTableData() }, route: `createTeamMember`, reduxData, notif: true })
      .then((response) => {
        if (response.success) {//success

        } else {//failed, though handled by server backend with custom fail response 
        }
      })
      .catch((e) => {//failure not handled by custom backend function 
        console.log("Unhandled Error: ", e)
      });

    // Rest of your logic for saving the permission
    //  $('#addTeamMember').modal('hide');//TODO: reactiveate this. commented for debugging only
    loadInitialData();
  }

  const selectStyle = {
    border: "1px solid #e3e3e3",
    padding: "10px",
    outline: 'none',
    display: "block",
    width: "100%"
  };


  async function update(data) {
    await api({ data: { teamMember: data }, route: `updateTeamMember`, reduxData, notif: true })
      .then((response) => {
        if (response.success) {//success

        } else {//failed, though handled by server backend with custom fail response 
        }
      })
      .catch((e) => {//failure not handled by custom backend function 
        console.log("Unhandled Error: ", e)
      });
    loadInitialData()
  }

  const [rows, setRows] = useState([]);
  const permsSelectRef = useRef(null);
  const [selectedTitle, setselectedTitle] = useState(null);


  useEffect(() => {
    if (data.defaultPermissions) {
      setRows(mapRows())
    }
  }, [data, selectedTitle]);

  const [checkboxes, setCheckboxes] = useState({});


  function mapRows() {
    if (!selectedTitle || !data.defaultPermissions) {
      return null;
    }
  
    const filteredDefaults = data.defaultPermissions.filter((item) => item.id_master_title === selectedTitle);
  
    const rows = data.permissions.map((e, i) => {
      const matchedObject = filteredDefaults.find((item) => item.permissions_master_id === e.permissions_master_id) || {};
      const newkey = "module_" + e.permissions_master_id + "_read";
  
      return (
        <tr key={newkey} id={"module_" + e.permissions_master_id}>
          <td id={"module_" + e.permissions_master_id + "_type"}>
            <span>{e.type}</span>
          </td>
          <td id={"module_" + e.permissions_master_id + "_name"}>
            <span>{e.name}</span>
          </td>
          <td className="text-center">
            <input
              key={newkey}
              checked={checkboxes[newkey]}
              type="checkbox"
              onChange={() => {
                setCheckboxes((prevCheckboxes) => ({
                  ...prevCheckboxes,
                  [newkey]: !prevCheckboxes[newkey], // Toggle the checkbox state
                }));
              }}
            />
          </td>
          <td id={"module_" + e.permissions_master_id + "_url"}>
            <span>{e.url}</span>
          </td>
        </tr>
      );
    });
  
    return rows;
  }
  


  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Other Users - Utopia Tech PTY LTD</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Users</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/team_members_all">Admin Other Users</Link>
                </li>
              </ul>
            </div>
        
          </div>
        </div>
        <Employeessdashboardheader />
        <Skeleton loading={props.loading} active>
          <div className="row staff-grid-row">
            {data.nonTeamMembers?.map((teamMember, index) => (
              <div
                className={`col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3
                 `} key={index}
              >
                <div
                  className={`profile-widget ${teamMember.active ? "" : 'inactive-card'}`}
                >

                  <div className="profile-img">
                    <Link
                      to={"/access_admin/user_profile/" + teamMember.id_user}
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
                    <Link to={"/access_admin/user_profile/" + teamMember.id_user}>
                      {teamMember.first_name} {teamMember.last_name}
                    </Link>
                  </h4>
                  <div className="small text-muted">
                    {teamMember.title_name}
                  </div>
                  <small className="text-muted">
                    {teamMember.department_name}
                  </small>
                  <div className="user-switch">
                    <Switch
                      checked={teamMember.active}
                      onChange={(checked) =>
                        update({ active: checked, id_user: teamMember.id_user })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Skeleton>
      </div>

      <div id="addTeamMember" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
        >
          <div className="modal-content modal-md">
            <div className="modal-header">
              <h5 className="modal-title">Create Team Member</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form ref={addTeamMemberFormRef} onSubmit={createteamMember}>
                <DdDepTitle
                  data={data}
                  setselectedTitle={setselectedTitle}
                ></DdDepTitle>
                <DdDepTitleTm data={data}></DdDepTitleTm>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        First Name<span className="text-danger">*</span>
                      </label>
                      <input
                        required
                        name="first_name"
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Last Name<span className="text-danger">*</span>
                      </label>
                      <input
                        required
                        name="last_name"
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Email<span className="text-danger">*</span></label>
                  <input
                    required
                    name="email"
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label>Password<span className="text-danger">*</span></label>
                  <input
                    required
                    name="password"
                    className="form-control"
                    type="password"
                  />
                </div>
                <div className="form-group">
                  <label>Phone<span className="text-danger">*</span></label>
                  <input
                    required
                    name="phone"
                    className="form-control"
                    type="tel"
                  />
                </div>
                <div className="form-group">

                  <div id="module_permissions" className="table-responsive">
                    <table id="module_permissions" className="table table-striped custom-table">
                      <thead>
                        <tr>
                          <th className="text-center">Type</th>
                          <th>Name</th>
                          <th className="text-center">Access</th>
                          <th className="text-center">URL</th>
                        </tr>
                      </thead>
                      <tbody ref={permsSelectRef}>
                        {
                          rows
                        }
                      </tbody>
                    </table>
                  </div>


                </div>
                <div className="submit-section">
                  <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main


/*    <DdDepTitleTm
              data={data}
            ></DdDepTitleTm>
*/