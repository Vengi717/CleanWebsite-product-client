import React, { useState, useEffect } from 'react';
import api from '../../../../../_services_data/api/_handler';

const modalTitle = "Update Personal Information";

export default function Modal({ props }) {
    const { data, FormRef, reduxData, triggerReload, modalName } = props;
    const apiURL = `AdminUserProfileUpdateUser/${data?.id_user}`;

    // Use useState to manage the "Employment of spouse" field value
    const [employmentOfSpouseValue, setEmploymentOfSpouseValue] = useState(data?.employement_of_spouse ? 'true' : 'false');

    // Use useEffect to update the employmentOfSpouseValue when data changes
    useEffect(() => {
        setEmploymentOfSpouseValue(data?.employement_of_spouse == "true" ? 'true' : 'false');
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

    const extractDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const defaultPassportExpDate = extractDate(data?.passport_exp_date);

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
                            <div className="form-group">
                                <label>Passport No.:</label>
                                <input
                                    name="passport_number"
                                    className="form-control"
                                    type="tel"
                                    defaultValue={data?.passport_number || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label>Passport Exp Date:</label>
                                <input
                                    name="passport_exp_date"
                                    className="form-control"
                                    type="date"
                                    defaultValue={defaultPassportExpDate}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nationality:</label>
                                <input
                                    name="nationality"
                                    className="form-control"
                                    type="text"
                                    defaultValue={data?.nationality || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label>Religion:</label>
                                <input
                                    name="religion"
                                    className="form-control"
                                    type="text"
                                    defaultValue={data?.religion || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label>Marital status:</label>
                                <input
                                    name="marital_status"
                                    className="form-control"
                                    type="text"
                                    defaultValue={data?.marital_status || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label>Employment of spouse:</label>
                                <select
                                    name="employement_of_spouse"
                                    className="form-control"
                                    value={employmentOfSpouseValue}
                                    onChange={(e) => setEmploymentOfSpouseValue(e.target.value)}
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>No. of children:</label>
                                <input
                                    name="number_of_children"
                                    className="form-control"
                                    type="number"
                                    defaultValue={data?.number_of_children || ''}
                                />
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
