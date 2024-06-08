import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import { Skeleton } from 'antd';
import { Link, dispatch } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../_services_data/api/_handler';
import DdDepTitle from '../../../sharedComponents/dependentDropdown/depertmentTitle'
import { Switch } from 'antd';


function JobDetail(props) {
    const [selectedTitle, setselectedTitle] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const reduxData = useSelector((state) => state.data);
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const idJobDocument = pathSegments[3];
    const editDocumentFormRef = useRef(null);


    const [companyProvided, setCompanyProvided] = useState(0); // Initialize with the default value (0 or false)


    let isMounted = true;
    const customStyles = {
        placeholder: (base) => ({
            ...base,
            fontSize: '12px', // Adjust the font size for the placeholder text
        }),
    };
    async function loadInitialData() {
        try {
            const response = await api({ data: {}, route: 'accessAdminjobPostManageDocument/' + idJobDocument, reduxData });
            if (response.success) {
                console.log(response.data);
                setData(response.data);
                setCompanyProvided(
                    {
                        value: response.data?.documentType?.company_provided,
                        label: response.data?.documentType?.company_provided == 1 ? "true" : "false"
                    }


                )

            } else {
                console.log('Handled error', response);
            }
        } catch (e) {
            console.log('Unhandled Error: ', e);
        }
    }
    useEffect(() => {
        loadInitialData();
        return () => {
            isMounted = false;
        };
    }, []);

    const editJobPostFormRef = useRef(null);

    async function editDocument(event) {
        event.preventDefault();
        const formData = new FormData(editDocumentFormRef.current);
        const data_ = {};

        formData?.forEach((value, key) => {
            data_[key] = value;
        });
        data_.requiresSigning = data.documentType.requiresSigning

        //  companyProvided.value === 1 && (data.requiresSigning = requiresSigning)


       // console.log(data_)
        await api({ data: data_, route: `accessAdminjobPostEditDocument/` + idJobDocument, reduxData, notif: true })
            .then((response) => {
            })
            .catch((e) => {
                console.log("Unhandled Error: ", e)
            });

        //   $('#addDocument').modal('hide');
        loadInitialData();


    }


    const [requiredForSelectedValue, requiredForSetSelectedValue] = useState({});

    useEffect(() => {
        const computedValue =
            data?.documentType?.required_for_apply === 1
                ? "required_for_apply"
                : data?.documentType?.required_for_onboard === 1
                    ? "required_for_onboard"
                    : data?.documentType?.required_for_post_onboard === 1
                        ? "required_for_post_onboard"
                        : "";

        const computedLabel =
            data?.documentType?.required_for_apply === 1
                ? "Applying"
                : data?.documentType?.required_for_onboard === 1
                    ? "Onboarding"
                    : data?.documentType?.required_for_post_onboard === 1
                        ? "Post Onboarding"
                        : "";



        requiredForSetSelectedValue({ value: computedValue, label: computedLabel });
    }, [data]);



    return (
        <div className="page-wrapper">


            <div className="content container-fluid">


                <Helmet>
                    <title>Edit Job Post - Utopia Tech PTY LTD</title>
                    <meta name="description" content="Login page" />
                </Helmet>



                <div className="content container">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">




                                <h3 className="page-title">Manage Job Document</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/access_admin/job-dashboard">Job Admin Dashboard</Link></li>
                                    <li className="breadcrumb-item"><Link to="/access_admin/job_post_document_manage">Manage Job Documents</Link></li>

                                    <li className="breadcrumb-item active">Manage Job Document</li>
                                </ul>
                            </div>
                        </div>
                    </div>












                    <Skeleton loading={props.loading} active>
                        <div className="row">



                            <div className={companyProvided.value === 1 ? "col-md-4" : "col-md-12"}>



                                <div className="job-det-info job-widget">



                                    <form ref={editDocumentFormRef} onSubmit={(e) => editDocument(e)}>

                                        <button
                                            type="submit"
                                            className="btn job-btn submit-btn"
                                            href="#"
                                        >
                                            Save Changes
                                        </button>



                                        <div className="form-group">
                                            <label>
                                                Name<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                required
                                                name="document_name"
                                                className="form-control"
                                                type="text"
                                                value={data?.documentType?.document_name || ""}
                                                onChange={(event) => {
                                                    const newValue = event.target.value;
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        documentType: {
                                                            ...prevData.documentType,
                                                            document_name: newValue,
                                                        },
                                                    }));
                                                }}
                                            />

                                        </div>

                                        <div className="form-group">
                                            <label>
                                                Required For<span className="text-danger">*</span>
                                            </label>


                                            <Select
                                                name="requiredFor"
                                                required={true}
                                                isSearchable={true}
                                                placeholder={"Choose option"}
                                                styles={customStyles}
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
                                                value={requiredForSelectedValue}

                                                onChange={(selectedOption) => requiredForSetSelectedValue(selectedOption)}
                                            />

                                        </div>

                                        <DdDepTitle
                                            required={false}
                                            name={"requiredForTitle"}
                                            title={"Assign To. (Leave title blank to apply to all)"}
                                            data={data}
                                            setselectedTitle={setselectedTitle}
                                            initialDepartmentValue={
                                                {
                                                    value: data?.documentType?.id_department_master,
                                                    label: data?.documentType?.department_name
                                                }
                                            }

                                            initialTitleValue={
                                                {
                                                    value: data?.documentType?.id_master_title,
                                                    label: data?.documentType?.title_name
                                                }
                                            }
                                        ></DdDepTitle>

                                        <div className="form-group">
                                            <label>
                                                Company Provided<span className="text-danger">*</span>
                                            </label>
                                            <Select
                                                name="company_provided"
                                                required={true}
                                                isSearchable={true}
                                                placeholder={"Choose option"}
                                                styles={customStyles}
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
                                                    setCompanyProvided(
                                                        {
                                                            value: selectedOption.value,
                                                            label: selectedOption.label
                                                        }
                                                    );
                                                }}
                                                value={companyProvided}
                                            />
                                        </div>

                                        {companyProvided.value === 1 && (
                                            <div className="form-group">
                                                <label>Requires Signing<span className="text-danger">*</span></label>
                                                <div className="user-switch">
                                                    <Switch
                                                        name="requiresSigning"
                                                        checked={data?.documentType?.requiresSigning}
                                                        onChange={() => {
                                                            setData((prevData) => ({
                                                                ...prevData,
                                                                documentType: {
                                                                    ...prevData.documentType,
                                                                    requiresSigning: !prevData?.documentType?.requiresSigning,
                                                                },
                                                            }));
                                                        }}
                                                    />

                                                </div>
                                            </div>
                                        )}

                                 
                                    </form>



                                    <div />
                                    <div />

                                </div>
                            </div>
                            {companyProvided.value === 1 && ( // Render the switch only if companyProvided is true (1)

                                <div className="col-md-8">


                                    <div className="job-content job-widget">
                                        <div className="job-desc-title"><h4>Document<span className="text-danger">*</span></h4></div>
                                        <div className="job-description">
                                            <p>{data?.jobPost?.desc}</p>
                                        </div>
                                    </div>
                                </div>)}
                        </div>


                    </Skeleton>
                </div>
            </div >




        </div >
    );
}

export default JobDetail;