import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../_services_data/api/_handler';
import NavTabs from './nav_tabs'
import { Link } from 'react-router-dom';

function MyComponent() {
  const [data, setData] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedTitleAdd, setSelectedTitleAdd] = useState(null);
  const reduxData = useSelector((state) => state.data);
  const permsSelectRef = useRef(null);
  const addTitleFormRef = useRef(null);


  async function loadInitialData() {
    try {
      const response = await api({ data: {}, route: 'adminAccessSettingsDepartmentsIndex', reduxData });
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



  async function deleteDepartment({ event, id_department_master }) {
    const processedData = { id_department_master: id_department_master }



    await api({ data: processedData, route: `deleteDepartment`, reduxData, notif: true })
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


  async function createDepartment(event) {
    event.preventDefault();
    const formData = new FormData(addTitleFormRef.current);
    const data = {
      "department_name": formData.get('department_name'),
      id_department_master: selectedDepartment
    };
    console.log("data:", data);
    await api({ data, route: `createDepartment`, reduxData, notif: true })
      .then((response) => {
        if (response.success) {//success

        } else {//failed, though handled by server backend with custom fail response 
        }
      })
      .catch((e) => {//failure not handled by custom backend function 
        console.log("Unhandled Error: ", e)
      });

    // Rest of your logic for saving the permission
    $('#addDepartment').modal('hide');
    loadInitialData();
  }

  async function updateDepartment({ data, titleId }) {

    const processedData = { ...data, id_department_master: titleId }
    await api({ data: processedData, route: `updateDepartment`, reduxData, notif: true })
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



  useEffect(() => {
    loadInitialData();
  }, []);


  useEffect(() => {
    document.body.addEventListener('click', editingModeClickOff);
    return () => {
      document.body.removeEventListener('click', editingModeClickOff);
    };
  }, []);

  const [isEditingModes, setIsEditingModes] = useState({});

  const editingModeClickOff = (event) => {
    const inputElement = document.querySelectorAll('input[type="text"][data-permission-id]')[0]
    if (inputElement) {//input in editing mode

      if (!inputElement.contains(event.target)) {//if user clicked off the input
        const elementId = inputElement.getAttribute('parent-td-id')
        const type = inputElement.getAttribute('name-type')
        const titleId = inputElement.getAttribute('data-permission-id')
        toggleEdit({
          titleId,
          type,
          elementId,
        })
      }
    }
  };

  const renderEditableCell = ({ e, idKey, valueKey }) => {
    const value = e[valueKey]
    const id = e[idKey]
    const type = [valueKey]
    const isEditingMode = isEditingModes[[id]] || {};
    return <>
      {
        isEditingMode[type] ? (
          <td
            id={`module_${[id]}_${type}`}
          >
            <input
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  toggleEdit({
                    titleId: [id],
                    type: type,
                    elementId: `module_${[id]}_${type}`,
                  });
                }
              }}
              defaultValue={value}
              className="form-control"
              type="text"
              data-permission-id={[id]}
              parent-td-id={`module_${[id]}_${type}`}
              name-type={type}
            />

          </td >
        ) : (
          <td
            onClick={() =>
              toggleEdit({
                titleId: [id],
                type: type,
                elementId: `module_${[id]}_${type}`,
              })
            }
            id={`module_${[id]}_${type}`}
          >




            <span>{value}</span>



          </td>
        )
      }


    </>
  };



  const [rows, setRows] = useState([]);


  useEffect(() => {
    setRows(mapRows())
  }, [data?.deps, isEditingModes]);

  function mapRows() {
    const idKey = "id_department_master"
    const rows = data &&
      data?.deps.map((e, i) => {
        return (
          <tr key={"_module_" + e[idKey]} id={"module_" + e[idKey]}>
            {renderEditableCell({ e, idKey, valueKey: "department_name" })}
            <td className="text-center">
              <input
                onChange={(event) => {
                  console.log(event.target.checked)
                  updateDepartment({ data: { active: event.target.checked }, titleId: e[idKey] })
                }
                }
                checked={(e.active)} // Set defaultChecked to true or false explicitly
                type="checkbox"
              />
            </td>

            <td>
              <button type="button" className="btn btn-outline-danger"
                href="#"
                data-toggle="modal"
                data-target="#delete_permission"
                onClick={event =>

                  

                  deleteDepartment({ event, id_department_master: e[idKey] })}
              >
                <i className="fa fa-trash-o" />
              </button>


            </td>
          </tr>
        );
      });

    return rows;
  }




  async function toggleEdit({ titleId, type, elementId }) {
    await setIsEditingModes((prevEditingModes) => {
      if (prevEditingModes[titleId]?.[type]) {
        const newValue = document.getElementById(elementId).querySelector("input").value
        updateDepartment({ data: { [type]: newValue }, titleId })
      }
      return {
        ...prevEditingModes,
        [titleId]: {
          ...prevEditingModes[titleId],
          [type]: !prevEditingModes[titleId]?.[type], // Toggle the value
        },
      }
    });
  }


  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Settings</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/access_admin/general">General</Link></li>
                <li className="breadcrumb-item active">Departments</li>
              </ul>
            </div>
          </div>
        </div>
        <NavTabs />
        <div className="row">
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-3">

            <a href="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addDepartment"><i className="fa fa-plus" /> Department</a>

          </div>
          <div className="col-sm-8 col-md-8 col-lg-8 col-xl-9">
            <div id="module_permissions" className="table-responsive">
              <table id="module_permissions" className="table table-striped custom-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Active</th>
                    <th>Del</th>
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

      <div id="addDepartment" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content modal-md">
            <div className="modal-header">
              <h5 className="modal-title">Create Department</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form ref={addTitleFormRef} onSubmit={createDepartment}>
                <div className="form-group">
                  <label>Name<span className="text-danger">*</span></label>
                  <input required name='department_name' className="form-control" type="text" />
                </div>
                <div className="submit-section">
                  <button type='submit' className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default MyComponent;

