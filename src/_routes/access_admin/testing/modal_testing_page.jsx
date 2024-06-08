//TODO: once the job post is closed. it should not be changed
//TODO: once the job post is closed. it should not be changed
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Table, Skeleton } from 'antd';
import { itemRender, onShowSizeChange } from "../../../sharedComponents/paginationfunction";

import 'antd/dist/antd.css';
import "../../../_services_data/assets/css/antdstyle.css";

import services_data from '../../../_services_data/_services_data'
import New_mm from '../../../sharedComponents/modal_maker/component_modal_v2'

function main() {
    const [data_, set_data_] = useState([]);//new 
    const [editing_data_, set_editing_data_] = useState({});//new 



    const loading = false
    var data = []



    const today = new Date();
    const numberOfDaysToAdd = 3;
    const date = today.setDate(today.getDate() + numberOfDaysToAdd);
    const defaultValuedate = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd





    useEffect(() => {//new 
        load_data()
    }, [editing_data_])

    async function load_data() {//new 
        const reloaddata = await services_data.wrappers.access_admin.admin_manage_documents()
        set_data_(await reloaddata)
    }

    const add_data = {//new 
        main_name: "Add_Documents",
        callback: async (modal_response) => await data_.functions.add_document_name(modal_response),
        callback_handle_file_input: async (modal_response) => await data_.functions.add_document_company_provided(modal_response),
        callback_reload_data: async () => await load_data(),
        all_data: data_.data,
        inputs: [
            [//  row
                {//  col & input
                    label: "Document Name",
                    type: "textbox",
                    input_key: "document_name",//this is used in return data
                    default_value: '',
                    required: true
                },
                {
                    label: "Required For",
                    required: true,
                    type: "dropdown",
                    required: true,
                    input_key: 'change_to',//this is the returned key
                    default_text:
                        (
                            editing_data_?.required_for_apply ? "Applying" :
                                editing_data_?.required_for_onboard ? "Onboarding" :
                                    editing_data_?.required_for_post_onboard ? "Post Onboarding" : null
                        ),
                    data: [
                        {
                            name: "Applying"
                        },
                        {
                            name: "Onboarding"
                        },
                        {
                            name: "Post Onboarding"
                        }
                    ]
                },
            ],
            [
                {//  col & input
                    label: "Company Provided",
                    type: "checkbox",
                    input_key: "company_provided",//this is used in return data
                    default_value: true,
                    required: true
                }

            ],
            [
                ,
                {//  col & input
                    label: "Document",
                    type: "file_input",
                    input_key: "file_input",//this is used in return data
                    default_value: '',
                    required: true,
                    can_delete: true,
                    input_unique:"1"
                },
            ],

            [

                {//  col & input
                    label: "Description",
                    type: "textfield",
                    input_key: "documents_master_names_desc",//this is used in return data
                    default_value: '',
                    required: false
                }
            ]

        ]
    }

    const edit_data = {//new 
        main_name: "Edit_Documents",
        callback: async (modal_response) => await data_.functions.edit_document_name(modal_response),
        callback_reload_data: async () => await load_data(),
        callback_handle_file_input: async (modal_response) => await data_.functions.add_document_company_provided(modal_response),
        all_data: data_.data,
        editing: {
            data: editing_data_,
            key_name: "id_2v_master_document_names"
        },
        inputs: [
            [//  row
                {//  col & input
                    label: "Document Name",
                    type: "textbox",
                    input_key: "document_name",//this is used in return data
                    default_value: editing_data_.document_name,
                    required: true
                },
                {
                    label: "Required For",
                    required: true,
                    type: "dropdown",
                    input_key: 'change_to',//this is the returned key
                    default_text:
                        (
                            editing_data_.required_for_apply ? "Applying" :
                                editing_data_.required_for_onboard ? "Onboarding" :
                                    editing_data_.required_for_post_onboard ? "Post Onboarding" : null
                        ),
                    data: [
                        {
                            name: "Applying"
                        },
                        {
                            name: "Onboarding"
                        },
                        {
                            name: "Post Onboarding"
                        }
                    ]
                },
            ],
            [
                {//  col & input
                    label: "Company Provided",
                    type: "checkbox",
                    input_key: "company_provided",//this is used in return data
                    default_value: !!editing_data_.company_provided,
                    required: true

                },

            ],
            [
                ,
                {//  col & input
                    label: "Document",
                    type: "file_input",
                    input_key: "file_input",//this is used in return data
                    default_value: '',
                    required: true,
                    can_delete: false,
                    input_unique:"2"
                },
            ],
            [

                {//  col & input
                    label: "Description",
                    type: "textfield",
                    input_key: "documents_master_names_desc",//this is used in return data
                    default_value: editing_data_.documents_master_names_desc,
                    required: false
                }
            ]

        ]
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
        },



        {
            title: 'Required For',
            dataIndex: 'master_job_type_name',
            render: (text, record) => (


                <div id='tt' className="dropdown action-label text-center">
                    <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                        <i className={"fa fa-dot-circle-o text-info"} /> {
                            record.required_for_apply ? "Applying" :
                                record.required_for_onboard ? "Onboarding" :
                                    record.required_for_post_onboard ? "Post Onboarding" : ""
                        }
                    </a>
                    <div
                        className="dropdown-menu dropdown-menu-right">
                        <a onClick={(e) =>
                            change_required_for({
                                id_2v_master_document_names: record.id_2v_master_document_names,
                                change_to: "Applying"
                            })
                        }
                            className="dropdown-item" href="#">
                            <i className={"fa fa-dot-circle-o text-info"} />
                            {"Applying"}</a>

                        <a
                            onClick={(e) =>
                                change_required_for({
                                    id_2v_master_document_names: record.id_2v_master_document_names,
                                    change_to: "Onboarding"
                                })
                            }
                            className="dropdown-item" href="#">
                            <i className={"fa fa-dot-circle-o text-info"} />
                            {"Onboarding"}</a>

                        <a
                            onClick={(e) =>
                                change_required_for({
                                    id_2v_master_document_names: record.id_2v_master_document_names,
                                    change_to: "Post Onboarding"
                                })
                            }
                            className="dropdown-item" href="#">
                            <i className={"fa fa-dot-circle-o text-info"} />
                            {"Post Onboarding"}</a>
                    </div>
                </div >
            ),
            sorter: (a, b) => a.master_job_type_name.toLocaleLowerCase() > b.master_job_type_name.toLocaleLowerCase(),
        },
        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a
                            href="#"
                            className="dropdown-item"
                            data-toggle="modal"
                            onClick={() => { set_editing_data_(record) }}
                            data-target="#Edit_Documents"
                        ><i className="fa fa-pencil m-r-5" /> Edit</a>
                    </div>
                </div>
            ),
        },
    ];
    return (
        <div className="page-wrapper">

            <New_mm
                data={add_data}
            />



            <New_mm
                data={edit_data}
            />

            <Helmet>
                <title>Jobs - Utopia Tech PTY LTD</title>
                <meta name="description" content="Login page" />
            </Helmet>

            {/* Page Content */}
            <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">Manage Job Documents</h3>


                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/access_admin/job-dashboard">Job Dashboard</Link></li>
                                <li className="breadcrumb-item active">Manage Job Documents</li>
                            </ul>
                        </div>
                        <div className="col-auto float-right ml-auto">
                            <a href="#" onClick={() => set_editing_data_([])} className="btn add-btn" data-toggle="modal" data-target="#Add_Documents"><i className="fa fa-plus" /> Add Document</a>
                        </div>
                    </div>
                </div>
                {/* /Page Header */}

                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <Skeleton loading={loading} active>

                                <Table className="table-striped"
                                    pagination={{
                                        total: data.job_posts?.length,
                                        //showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                        showTotal: (total, range) => `Showing ${range[1]} of ${total} entries`,
                                        showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                    }}
                                    style={{ overflowX: 'auto' }}
                                    columns={columns}
                                    // bordered
                                    dataSource={data_?.data?.documents}
                                    rowKey={record => record.id_2v_master_document_names}
                                // onChange={handleTableChange}
                                />



                            </Skeleton>



                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Content */}

            {/* Delete Job Modal */}
            <div hidden className="modal custom-modal fade" id="delete_job" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="form-header">
                                <h3>Delete Job</h3>
                                <p>Are you sure want to delete?</p>
                            </div>
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <a href="#" onClick={() => deleteJob(jobId)} className="btn btn-primary continue-btn">Delete</a>
                                    </div>
                                    <div className="col-6">
                                        <a href="#" data-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Delete Job Modal */}
        </div >
    );
}



export default main
