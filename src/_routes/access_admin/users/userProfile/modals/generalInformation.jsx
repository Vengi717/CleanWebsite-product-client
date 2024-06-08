import React, { useState, useEffect } from 'react';
import api from '../../../../../_services_data/api/_handler';
import DdDepTitleTm from '../../../../../sharedComponents/dependentDropdown/depertmentTitleTm'
import DdDepTitle from '../../../../../sharedComponents/dependentDropdown/depertmentTitle'

const modalTitle = "Update General Information";

export default function Modal({ props }) {
    const { data, FormRef, reduxData, triggerReload, modalName, dd } = props;
    const apiURL = `AdminUserProfileUpdateUser/${data?.id_user}`;

    // Use useState to manage the gender field value
    const [genderValue, setGenderValue] = useState(data?.gender || 'male');

    // Use useEffect to update the genderValue when data changes
    useEffect(() => {
        setGenderValue(data?.gender || 'male');
    }, [data]);

    async function FormHandle({ event }) {
        event.preventDefault();
        const formData = new FormData(FormRef.current);
        const formDataObject = {};

        formData?.forEach((value, key) => {
            formDataObject[key] = value;
        });

        await api({ data: formDataObject, route: apiURL, reduxData, notif: true })
            .then((response) => {
                if (response.success) {
                    // Handle success
                }
            })
            .catch((e) => {
                console.log("Unhandled Error: ", e);
            });

        $('#' + modalName).modal('hide');
        await triggerReload();
    }
    const [selectedTitle, setselectedTitle] = useState(null);
    const [selectedTM, setselectedTeamMembers] = useState(null);
    return (
        <div id={modalName} className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content modal-md">
                    <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
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
                        <form ref={FormRef} onSubmit={(event) => FormHandle({ event })}>



                            <label>
                                Position<span className="text-danger">*</span>
                            </label>

                            <DdDepTitle
                                reload={props.reload}
                                setReload={props.setReload}

                                name={"id_master_title"}
                                required={true}
                                data={dd}
                                setselectedTitle={setselectedTitle}
                            ></DdDepTitle>
                            <label>
                                Reports To<span className="text-danger">*</span>
                            </label>
                            <DdDepTitleTm
                              reload={props.reload}
                              setReload={props.setReload}
                                name={"reportsTo"}
                                required={true}
                                data={dd}
                                //  setselectedTitle={setselectedTitle}
                                setselectedTeamMembers={setselectedTeamMembers}

                            ></DdDepTitleTm>




                            <div className="form-group">
                                <label>Phone:</label>
                                <input
                                    name="phone"
                                    className="form-control"
                                    type="tel"
                                    defaultValue={data?.phone || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    name="email"
                                    className="form-control"
                                    type="email"
                                    defaultValue={data?.email || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label>Birthday:</label>
                                <input
                                    name="DOB"
                                    className="form-control"
                                    type="date"
                                    defaultValue={data?.DOB || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label>Address:</label>
                                <textarea
                                    name="addr_street_name"
                                    className="form-control"
                                    rows="3"
                                    defaultValue={data?.addr_street_name || ''}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Gender:</label>
                                <select
                                    name="gender"
                                    className="form-control"
                                    value={genderValue}
                                    onChange={(e) => setGenderValue(e.target.value)}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            {/* Add more fields with corresponding column names */}
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
    );
}
