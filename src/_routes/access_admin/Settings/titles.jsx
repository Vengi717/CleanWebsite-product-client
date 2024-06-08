import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../_services_data/api/_handler';
import NavTabs from './nav_tabs'
import { Link } from 'react-router-dom';

function MyComponent() {
  const [data, setData] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedTitleAdd, setSelectedTitleAdd] = useState(null);
  const [filteredTitles, setfilteredTitles] = useState([]);
  const reduxData = useSelector((state) => state.data);
  const departmentSelectRef = useRef(null);
  const permsSelectRef = useRef(null);
  const addTitleFormRef = useRef(null);

  async function loadInitialData() {
    try {
      const response = await api({ data: {}, route: 'adminAccessSettingsTitleIndex', reduxData });
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




  };




  async function deleteTitle({ event, titleMasterId }) {
    const processedData = { id_master_title: titleMasterId }

    console.log("event: ", event)
    console.log("titleMasterId: ", titleMasterId)
    console.log("processedData: ", processedData)


    await api({ data: processedData, route: `deleteTitle`, reduxData, notif: true })
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


  async function createTitle(event) {
    event.preventDefault();
    const formData = new FormData(addTitleFormRef.current);
    const data = {
      "reportsTo": formData.get('reportsTo'),
      "title_name": formData.get('titleName'),
      id_department_master: selectedDepartment
    };
    console.log("data:", data);
    await api({ data, route: `createTitle`, reduxData, notif: true })
      .then((response) => {
        if (response.success) {//success

        } else {//failed, though handled by server backend with custom fail response 
        }
      })
      .catch((e) => {//failure not handled by custom backend function 
        console.log("Unhandled Error: ", e)
      });

    // Rest of your logic for saving the permission
    $('#addTitle').modal('hide');
    loadInitialData();
  }

  async function updateTitle({ data, titleId }) {

    const processedData = { ...data, id_master_title: titleId }
    await api({ data: processedData, route: `updateTitle`, reduxData, notif: true })
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
    const exists = filteredTitles.some((title) => title.reportsTo)
    /* if (value == null && !exists) {
       return <></>
     }*/

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
  }, [filteredTitles, isEditingModes]);

  function mapRows() {
    // console.log(filteredTitles)
    const rows = data &&
      filteredTitles.map((e, i) => {
        const isEditingMode = isEditingModes[e.id_master_title] || {};
        return (
          <tr key={"_module_" + e.id_master_title} id={"module_" + e.id_master_title}>
            {renderEditableCell({ e, idKey: "id_master_title", valueKey: "reportsToTitle" })}
            {renderEditableCell({ e, idKey: "id_master_title", valueKey: "title_name" })}


            <td className="text-center">
              <input
                onChange={(event) => {
                  //   SaveDefaultPermission({ event, id_master_title: e.id_master_title })

                  console.log(event.target.checked)
                  updateTitle({ data: { active: event.target.checked }, titleId: e.id_master_title })

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



                  deleteTitle({ event, titleMasterId: e.id_master_title })}
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
        updateTitle({ data: { [type]: newValue }, titleId })
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
                <li className="breadcrumb-item active">Titles</li>
              </ul>
            </div>
          </div>
        </div>
        <NavTabs />
        <div className="row">
          <div className="col-sm-4 col-md-4 col-lg-4 col-xl-3">
            <div className="card flex-fill">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <label>Department</label>
                  <select
                    name='reportsTo'

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
              </ul>
            </div>
            <a href="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addTitle"><i className="fa fa-plus" /> Title</a>

          </div>
          <div className="col-sm-8 col-md-8 col-lg-8 col-xl-9">
    
            <div id="module_permissions" className="table-responsive">
              <table id="module_permissions" className="table table-striped custom-table">
                <thead>
                  <tr>
                    {
                      /*  filteredTitles.some((title) => title.reportsTo) && (
                          <th className="text-center">Reports To</th>
                        )*/
                    }
                    <th className="text-center">Reports To</th>

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

      <div id="addTitle" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content modal-md">
            <div className="modal-header">
              <h5 className="modal-title">Create Title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form ref={addTitleFormRef} onSubmit={createTitle}>
                <div className="form-group">
                  <label>Reports To</label>

                  <select
                    name='reportsTo'
                    style={selectStyle}
                    value={selectedTitleAdd}
                  >
                    <option key={null} value={null}>

                    </option>
                    {filteredTitles?.map((title) => (
                      <option key={title.id_master_title} value={title.id_master_title}>
                        {title.title_name}
                      </option>
                    ))}
                  </select>



                  <div style={{ paddingTop: '20px' }}></div>
                  <label>Name<span className="text-danger">*</span></label>
                  <input required name='titleName' className="form-control" type="text" />
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

