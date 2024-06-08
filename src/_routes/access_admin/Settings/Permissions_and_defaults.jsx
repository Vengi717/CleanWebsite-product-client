import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../_services_data/api/_handler';
import { Link } from 'react-router-dom';
import NavTabs from './nav_tabs'

function MyComponent() {
  const [data, setData] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  const [filteredTitles, setfilteredTitles] = useState([]);
  const [filteredDefaults, setfilteredDefaults] = useState([]);

  const reduxData = useSelector((state) => state.data);

  const titleSelectRef = useRef(null);
  const departmentSelectRef = useRef(null);
  const permsSelectRef = useRef(null);

  const addPermissionFormRef = useRef(null);


  const [isEditingModes, setIsEditingModes] = useState({});








  async function loadInitialData() {
    try {
      const response = await api({ data: {}, route: 'AccessAdminSettingsPermissions_and_defaults', reduxData });
      if (response.success) {
        setData(response.data);

        if (response.data && response.data.deps.length > 0) {
          const departmentIdInitial = response.data.deps[0].id_department_master.toString()
          await setSelectedDepartment(departmentIdInitial);

          var { filteredTemp, ChildId } = await filterData({
            data_: response.data,
            dataKeyName: "titles",
            ParentSelectedId: departmentIdInitial,
            setstate: setfilteredTitles,

            ChildIdName: "id_master_title",
            ChildToParentIdMatch: "id_department_master"
          })
          setSelectedTitle(ChildId)
          const filteredTempTitles = filteredTemp
          const ChildIdTitles = ChildId

          var { filteredTemp, ChildId } = await filterData({
            data_: response.data,
            dataKeyName: "defaults",
            ParentSelectedId: ChildIdTitles,
            setstate: setfilteredDefaults,
            ChildIdName: "default_permissions_id",
            ChildToParentIdMatch: "id_master_title"
          })
          const filteredTempDefaults = filteredTemp
        }
      } else {
        console.log('Handled error', response);
      }
    } catch (e) {
      console.log('Unhandled Error: ', e);
    }
  }

  const filterData = async ({ data_, dataKeyName, ParentSelectedId, setstate, ChildIdName, ChildToParentIdMatch }) => {



    var filteredTemp
    filteredTemp = await data_[dataKeyName].filter((item) => item[ChildToParentIdMatch] === parseInt(ParentSelectedId));
    setstate(filteredTemp)
    if (dataKeyName == "defaultsaa") {
      console.log("------------------")
      console.log("Unfiltered: ", data_[dataKeyName])
      console.log("ChildToParentIdMatch: ", ChildToParentIdMatch)
      console.log("ParentSelectedId: ", ParentSelectedId)


      console.log(dataKeyName, "   -   Filtered: ", filteredTemp)
      console.log("------------------")

    }
    return { filteredTemp, ChildId: filteredTemp[0]?.[ChildIdName] }
  };

  useEffect(() => {
    loadInitialData();
    document.body.addEventListener('click', editingModeClickOff);
    // Clean up the event listener when the component unmounts
    return () => {
      document.body.removeEventListener('click', editingModeClickOff);
    };
  }, []);



  const editingModeClickOff = (event) => {
    const inputElement = document.querySelectorAll('input[type="text"][data-permission-id]')[0]
    if (inputElement) {//input in editing mode
      if (!inputElement.contains(event.target)) {//if user clicked off the input
        const elementId = inputElement.getAttribute('parent-td-id')
        const type = inputElement.getAttribute('name-type')
        const permissionId = inputElement.getAttribute('data-permission-id')
        toggleEdit({
          permissionId,
          type,
          elementId,
        })
      }
    }
  };


  const handleDepartmentChange = async (e) => {
    console.log("handleDepartmentChange")
    setSelectedDepartment(e.target.value);

    var { filteredTemp, ChildId } = await filterData({
      data_: data,
      dataKeyName: "titles",
      ParentSelectedId: e.target.value,
      setstate: setfilteredTitles,
      ChildIdName: "id_master_title",
      ChildToParentIdMatch: "id_department_master"
    })
    setSelectedTitle(ChildId)
    const filteredTempTitles = filteredTemp
    const ChildIdTitles = ChildId


    var { filteredTemp, ChildId } = await filterData({
      data_: data,
      dataKeyName: "defaults",
      ParentSelectedId: ChildIdTitles,
      setstate: setfilteredDefaults,
      ChildIdName: "default_permissions_id",
      ChildToParentIdMatch: "id_master_title"
    })
    const filteredTempDefaults = filteredTemp

  };

  const handleTitleChange = async (e) => {
    setSelectedTitle(e.target.value);
    var { filteredTemp, ChildId } = await filterData({
      data_: data,
      dataKeyName: "defaults",
      ParentSelectedId: e.target.value,
      setstate: setfilteredDefaults,
      ChildIdName: "default_permissions_id",
      ChildToParentIdMatch: "id_master_title"
    })
    const filteredTempDefaults = filteredTemp
  };

  async function SaveDefaultPermission({ event, permissions_master_id }) {
    const processedData = {
      permissions_master_id,
      state: event.target.checked,
      id_master_title: selectedTitle
    }

    console.log("processedData: ",processedData)

    await api({ data: processedData, route: `updateDefaultPermissions`, reduxData, notif: true })
      .then((response) => {
        if (response.success) {//success

        } else {//failed, though handled by server backend with custom fail response 
        }
      })
      .catch((e) => {//failure not handled by custom backend function 
        console.log("Unhandled Error: ", e)
      });
    loadInitialData();
  }

  async function deletePermission({ event, permissionMasterId }) {
    const processedData = { permissions_master_id: permissionMasterId }

    console.log("event: ", event)
    console.log("permissionMasterId: ", permissionMasterId)

    console.log("processedData: ", processedData)


    await api({ data: processedData, route: `delete_perm_module`, reduxData, notif: true })
      .then((response) => {
        if (response.success) {//success

        } else {//failed, though handled by server backend with custom fail response 
        }
      })
      .catch((e) => {//failure not handled by custom backend function 
        console.log("Unhandled Error: ", e)
      });
    loadInitialData();


  }


  async function createPermission(event) {
    event.preventDefault();
    const formData = new FormData(addPermissionFormRef.current);
    const data = {
      "name": formData.get('prem_name'),
      "type": formData.get('prem_select'),
      "url": formData.get('prem_url'),
      "comp_tag_id": formData.get('prem_componant'),
      "notes": formData.get('prem_notes')
    };
    console.log("data:", data);
    await api({ data, route: `createPermission`, reduxData, notif: true })
      .then((response) => {
        if (response.success) {//success

        } else {//failed, though handled by server backend with custom fail response 
        }
      })
      .catch((e) => {//failure not handled by custom backend function 
        console.log("Unhandled Error: ", e)
      });

    // Rest of your logic for saving the permission
    $('#addPermission').modal('hide');
    loadInitialData();
  }

  async function updatePermission({ data, permissionId }) {
    const processedData = { ...data, permissions_master_id: permissionId }
    await api({ data: processedData, route: `update_perm_module`, reduxData, notif: true })
      .then((response) => {
        if (response.success) {//success

        } else {//failed, though handled by server backend with custom fail response 
        }
      })
      .catch((e) => {//failure not handled by custom backend function 
        console.log("Unhandled Error: ", e)
      });
    loadInitialData();
  }

  const selectStyle = {
    border: "1px solid #e3e3e3",
    padding: "10px",
    outline: 'none',
    display: "block",
    width: "100%"
  };
  const select_style_1 = {
    border: "1px solid #e3e3e3",
    padding: "10px",
    paddingTop: "15px",
    paddingBottom: "15px",
    outline: 'none',
    // borderRadius: "2.25rem"
    display: "block",
    width: "100%"
  };





  const [rows, setRows] = useState([]);


  useEffect(() => {
    setRows(mapRows())
  }, [filteredDefaults, isEditingModes]);

  function mapRows() {
    const rows = data &&
      data.permissions.map((e, i) => {
        const matchedObject = filteredDefaults.find(item => item.permissions_master_id === e.permissions_master_id) || {};
        const isEditingMode = isEditingModes[e.permissions_master_id] || {};
        //    console.log("JSON.stringify(matchedObject): ", JSON.stringify(matchedObject))



        const newkey = "module_" + e.permissions_master_id + "_read" + JSON.stringify(matchedObject && matchedObject.read === '1' ? { defaultChecked: true } : {})
        //  const result = (matchedObject && matchedObject.read === '1' ? { defaultChecked: true } : {})
        return (
          <tr key={JSON.stringify(matchedObject) + "_module_" + e.permissions_master_id} id={"module_" + e.permissions_master_id}>
            <td id={"module_" + e.permissions_master_id + "_type"}>

              {isEditingMode.type ? (
                <input
                  onKeyDown={(event) => {
                    if (event.key == "Enter") {
                      toggleEdit({
                        permissionId: e.permissions_master_id,
                        type: "type",
                        elementId: "module_" + e.permissions_master_id + "_type",
                      })
                    }
                  }}
                  defaultValue={e.type}
                  className="form-control"
                  type="text"
                  data-permission-id={e.permissions_master_id}
                  parent-td-id={"module_" + e.permissions_master_id + "_type"}
                  name-type={"type"}
                />

              ) : (
                <span onClick={() => toggleEdit({ permissionId: e.permissions_master_id, type: "type" })}>{e.type}</span>
              )}
            </td>
            <td id={"module_" + e.permissions_master_id + "_name"}>
              {isEditingMode.name ? (
                <input
                  onKeyDown={(event) => {
                    if (event.key == "Enter") {
                      toggleEdit({
                        permissionId: e.permissions_master_id,
                        type: "name",
                        elementId: "module_" + e.permissions_master_id + "_name",
                      })
                    }
                  }}
                  defaultValue={e.name}
                  className="form-control"
                  type="text"
                  data-permission-id={e.permissions_master_id}
                  parent-td-id={"module_" + e.permissions_master_id + "_name"}
                  name-type={"name"}
                />
              ) : (
                <span onClick={() => toggleEdit({ permissionId: e.permissions_master_id, type: "name" })}>{e.name}</span>
              )}






            </td>
            <td className="text-center">
              <input
                key={newkey}
                onChange={(event) => {

                  SaveDefaultPermission({ event, permissions_master_id: e.permissions_master_id })

                }

                }
                checked={!!(matchedObject && matchedObject.read === '1')} // Set defaultChecked to true or false explicitly
                type="checkbox"
              />
            </td>
            <td hidden className="text-center">
              <input type="checkbox" {...(matchedObject && matchedObject.write === '1' ? { defaultChecked: true } : {})} />
            </td>
            <td hidden className="text-center">
              <input type="checkbox" {...(matchedObject && matchedObject.create === '1' ? { defaultChecked: true } : {})} />
            </td>
            <td hidden className="text-center">
              <input type="checkbox" {...(matchedObject && matchedObject.delete === '1' ? { defaultChecked: true } : {})} />
            </td>
            <td hidden className="text-center">
              <input type="checkbox" {...(matchedObject && matchedObject.import === '1' ? { defaultChecked: true } : {})} />
            </td>
            <td hidden className="text-center">
              <input type="checkbox" {...(matchedObject && matchedObject.export === '1' ? { defaultChecked: true } : {})} />
            </td>
            <td id={"module_" + e.permissions_master_id + "_url"}>
              {isEditingMode.url ? (
                <input
                  onKeyDown={(event) => {
                    if (event.key == "Enter") {
                      toggleEdit({
                        permissionId: e.permissions_master_id,
                        type: "url",
                        elementId: "module_" + e.permissions_master_id + "_url",
                      })
                    }
                  }}
                  defaultValue={e.url}
                  className="form-control"
                  type="text"
                  data-permission-id={e.permissions_master_id}
                  parent-td-id={"module_" + e.permissions_master_id + "_url"}
                  name-type={"url"}
                />
              ) : (
                <span onClick={() => toggleEdit({ permissionId: e.permissions_master_id, type: "url" })}>{e.url}</span>
              )}
            </td>
            <td>
              <button type="button" className="btn btn-outline-danger"
                href="#"
                data-toggle="modal"
                data-target="#delete_permission"
                onClick={event => deletePermission({ event, permissionMasterId: e.permissions_master_id })}
              >
                <i className="fa fa-trash-o" />
              </button>


            </td>
          </tr>
        );
      });

    return rows;
  }




  async function toggleEdit({ permissionId, type, elementId }) {
    await setIsEditingModes((prevEditingModes) => {
      if (prevEditingModes[permissionId]?.[type]) {
        const newValue = document.getElementById(elementId).querySelector("input").value
        updatePermission({ data: { [type]: newValue }, permissionId })
      }
      return {
        ...prevEditingModes,
        [permissionId]: {
          ...prevEditingModes[permissionId],
          [type]: !prevEditingModes[permissionId]?.[type], // Toggle the value
        },
      }
    });
  }


  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Settings</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/access_admin/general">General</Link></li>
                <li className="breadcrumb-item active">Permissions & Defaults</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Content Starts */}


        <NavTabs />
        <div className="row">
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-3">
            <div className="card flex-fill">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <label>Department</label>
                  <select
                    ref={departmentSelectRef}
                    style={selectStyle}
                    onChange={handleDepartmentChange}
                    value={selectedDepartment}
                  >
                    {data &&
                      data.deps.map((department) => (
                        <option key={department.id_department_master} value={department.id_department_master}>
                          {department.department_name}
                        </option>
                      ))}
                  </select>
                </li>
                <li className="list-group-item">
                  <label>Title</label>
                  <select
                    ref={titleSelectRef}
                    style={selectStyle}
                    onChange={handleTitleChange}
                    value={selectedTitle}
                  >
                    {filteredTitles?.map((title) => (
                      <option key={title.id_master_title} value={title.id_master_title}>
                        {title.title_name}
                      </option>
                    ))}
                  </select>
                </li>
              </ul>
            </div>
            <a href="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addPermission"><i className="fa fa-plus" /> Add Permission</a>

          </div>
          <div className="col-sm-8 col-md-8 col-lg-8 col-xl-9">
            <div id="module_permissions" className="table-responsive">
              <table id="module_permissions" className="table table-striped custom-table">
                <thead>
                  <tr>
                    <th className="text-center">Type</th>
                    <th>Name</th>
                    <th className="text-center">Access</th>
                    <th hidden className="text-center">Write</th>
                    <th hidden className="text-center">Create</th>
                    <th hidden className="text-center">Delete</th>
                    <th hidden className="text-center">Import</th>
                    <th hidden className="text-center">Export</th>
                    <th className="text-center">URL</th>
                    <th className="text-center">Del</th>
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
        </div>
      </div>

      <div id="addPermission" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content modal-md">
            <div className="modal-header">
              <h5 className="modal-title">Add Permission</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form ref={addPermissionFormRef}>
                <div className="form-group">
                  <label>Permission Name <span className="text-danger">*</span></label>
                  <input name='prem_name' className="form-control" type="text" />
                  <div style={{ paddingTop: '20px' }}></div>
                  <label>Type<span className="text-danger">*</span></label>
                  <select style={select_style_1} name='prem_select' >
                    <option>URL</option>
                    <option>Componant</option>
                  </select>
                  <div style={{ paddingTop: '20px' }}></div>
                  <label>URL<span className="text-danger">*</span></label>
                  <input name='prem_url' className="form-control" type="text" />
                  <div style={{ paddingTop: '20px' }}></div>
                  <label>Componant ID</label>
                  <input name='prem_componant' className="form-control" type="text" />

                  <label>Notes</label>
                  <input name='prem_notes' className="form-control" type="text" />

                </div>
                <div className="submit-section">
                  <button onClick={createPermission} className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;

