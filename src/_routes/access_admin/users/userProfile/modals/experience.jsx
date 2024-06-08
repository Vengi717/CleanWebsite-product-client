import React from 'react';
import api from '../../../../../_services_data/api/_handler'



const modalTitle = "Update General Information"
const apiURL = `updateUser`

export default function modal({ props }) {
    const { data, FormRef, reduxData, triggerReload, modalName } = props
    async function FormHandle({ event }) {
        event.preventDefault();
        const formData = new FormData(FormRef.current);
        const data = {};

        formData?.forEach((value, key) => {
            data[key] = value;
        });
        await api({ data, route: apiURL, reduxData, notif: true })
            .then((response) => {
                if (response.success) {//success

                }
            })
            .catch((e) => {//failure not handled by custom backend function 
                console.log("Unhandled Error: ", e)
            });
        $('#' + modalName).modal('hide');
        await triggerReload()
    }

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
                                    defaultValue={data?.gender || 'male'}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
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
