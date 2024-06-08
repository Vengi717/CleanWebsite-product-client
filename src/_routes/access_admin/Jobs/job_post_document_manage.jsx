import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Table, Skeleton } from 'antd';
import NavTabs from "./nav_tabs";
import { itemRender, onShowSizeChange } from "../../../sharedComponents/paginationfunction";
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import "../../../_services_data/assets/css/antdstyle.css";
import api from '../../../_services_data/api/_handler';
import DdDepTitle from '../../../sharedComponents/dependentDropdown/depertmentTitle'
import Select from 'react-select';
import { Switch } from 'antd';

function ManagedJobs() {
    const reduxData = useSelector((state) => state.data);
    const [data, setData] = useState({ loading: true });
    const [selectedTitle, setselectedTitle] = useState(null);
    const [requiresSigning, setRequiresSigning] = useState(false);
    const [companyProvided, setCompanyProvided] = useState(0); // Initialize with the default value (0 or false)

    useEffect(() => {
        loadInitialData();
    }, []);

    async function loadInitialData() {
        try {
            const response = await api({ data: {}, route: 'accessAdminjobPostManageDocuments', reduxData });
            if (response.success) {
                console.log(response.data);
                setData(response.data);
            } else {
                console.log('Handled error', response);
            }
        } catch (e) {
            console.log('Unhandled Error: ', e);
        }
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'id_2v_master_document_names',
            sorter: (a, b) => Number(a.id_job_posts) - Number(b.id_job_posts),
        },
        {
            title: 'Name',
            dataIndex: 'document_name',
            sorter: (a, b) => a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase(),
            render: (text, record) => (
                <Link to={`/access_admin/documentEdit/${record.id_2v_master_document_names}`}> {/* Set your desired route path */}
                    {text}
                </Link>
            ),
        },

        {
            title: 'Required For',
            dataIndex: 'master_job_type_name',
            render: (text, record) => (
                <div id='tt' className=" action-label text-center">
                    <a className="btn btn-white btn-sm btn-rounded " href="#"  aria-expanded="false">
                        <i className={"fa fa-dot-circle-o text-info"} /> {
                            record.required_for_apply ? "Applying" :
                                record.required_for_onboard ? "Onboarding" :
                                    record.required_for_post_onboard ? "Post Onboarding" : ""
                        }
                    </a>
                
                </div>
            ),
            sorter: (a, b) => a.master_job_type_name.toLocaleLowerCase() > b.master_job_type_name.toLocaleLowerCase(),
        },

    ];


    const addDocumentFormRef = useRef(null);

    async function createDocument(event) {
        event.preventDefault();
        const formData = new FormData(addDocumentFormRef.current);
        const data = {};

        formData?.forEach((value, key) => {
            data[key] = value;
        });


        companyProvided === 1 && (data.requiresSigning = requiresSigning)


        console.log(data)
        await api({ data, route: `createDocument`, reduxData, notif: true })
            .then((response) => {
            })
            .catch((e) => {
                console.log("Unhandled Error: ", e)
            });

        $('#addDocument').modal('hide');
        loadInitialData();







    }


    const customStyles = {
        placeholder: (base) => ({
            ...base,
            fontSize: '12px', // Adjust the font size for the placeholder text
        }),
    };

    return (
        <div className="page-wrapper">
            <Helmet>
                <title>Jobs - Utopia Tech PTY LTD</title>
                <meta name="description" content="Login page" />
            </Helmet>

            <div className="content container-fluid">
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">Manage Job Documents</h3>
                            <ul className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/access_admin/job-dashboard">Job Admin Dashboard</Link></li>
                                <li className="breadcrumb-item active">Manage Job Documents</li>
                            </ul>
                        </div>
                        <div className="col-auto float-right ml-auto">
                            <a href="#"
                                data-toggle="modal"
                                data-target="#addDocument"

                                className="btn add-btn">
                                <i className="fa fa-plus" /> Add Document
                            </a>
                        </div>
                    </div>
                </div>
                <NavTabs />
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <Skeleton loading={data.loading} active>
                                <Table
                                    className="table-striped"
                                    pagination={{
                                        total: data.job_posts?.length,
                                        showTotal: (total, range) => `Showing ${range[1]} of ${total} entries`,
                                        showSizeChanger: true,
                                        onShowSizeChange: onShowSizeChange,
                                        itemRender: itemRender
                                    }}
                                    style={{ overflowX: 'auto' }}
                                    columns={columns}
                                    dataSource={data?.documentNames}
                                    rowKey={record => record.id_2v_master_document_names}
                                />
                            </Skeleton>
                        </div>
                    </div>
                </div>
            </div>



            <div id="addDocument" className="modal custom-modal fade" role="dialog">
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content modal-md">
                        <div className="modal-header">
                            <h5 className="modal-title">Create Document Type</h5>
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
                            <form ref={addDocumentFormRef} onSubmit={createDocument}>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                Name<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                required
                                                name="document_name"
                                                className="form-control"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                Required For<span className="text-danger">*</span>
                                            </label>

                                            <Select
                                                name="requiredFor"
                                                required={true}
                                                isSearchable={true}
                                                placeholder={"Choose option"}
                                                styles={customStyles} // Apply custom styles here
                                                options={[
                                                    {
                                                        value: "required_for_apply",
                                                        label: "Applying"
                                                    },
                                                    {
                                                        value: "required_for_onboard",
                                                        label: "Onboarding"
                                                    },
                                                    {
                                                        value: "required_for_post_onboard",
                                                        label: "Post Onboarding"
                                                    }
                                                ]}
                                            />
                                        </div>

                                    </div>


                                </div>


                                <DdDepTitle
                                    required={false}
                                    name={"requiredForTitle"}
                                    title={"Assign To. (Leave empty to apply to all)"}
                                    data={data}
                                    setselectedTitle={setselectedTitle}
                                ></DdDepTitle>


                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                Company Provided<span className="text-danger">*</span>
                                            </label>

                                            <Select
                                                name="company_provided"
                                                required={true}
                                                isSearchable={true}
                                                placeholder={"Choose option"}
                                                styles={customStyles} // Apply custom styles here
                                                options={[
                                                    {
                                                        value: 0,
                                                        label: "false"
                                                    },
                                                    {
                                                        value: 1,
                                                        label: "true"
                                                    }

                                                ]}
                                                onChange={(selectedOption) => {
                                                    // Update the selected value in the state
                                                    setCompanyProvided(selectedOption.value);
                                                }}
                                            />
                                        </div>
                                    </div>




                                    {companyProvided === 1 && ( // Render the switch only if companyProvided is true (1)
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Requires Signing<span className="text-danger">*</span></label>
                                                <div className="user-switch">
                                                    <Switch
                                                        name="requiresSigning"
                                                        checked={requiresSigning}
                                                        onChange={() => setRequiresSigning(!requiresSigning)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {companyProvided === 1 && ( // Render the switch only if companyProvided is true (1)

                                    <div className="form-group">
                                        <label>Document<span className="text-danger"></span></label>
                                        <input
                                            required
                                            name="documents_company_provided_url"
                                            className="form-control"
                                            type="text"
                                        />
                                    </div>
                                )}

                                <div className="submit-section">
                                    <button
                                        type="submit"
                                        className="btn btn-primary submit-btn"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >




        </div >
    );
}

export default ManagedJobs;
