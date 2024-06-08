import React from 'react';
import api from '../../../../_services_data/api/_handler';

const modalTitle = "Update Emergency Information";

export default function Modal({ props }) {
    const { data, FormRef, reduxData, triggerReload, modalName } = props;
    const apiURL = `AdminUserProfileUpdateUser/${data?.id_user}`;

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
                                <label>Emergency Contact 1 Name:</label>
                                <input
                                    name="emergency_contact_1_name"
                                    className="form-control"
                                    type="text"
                                    defaultValue={data?.emergency_contact_1_name || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label>Emergency Contact 1 Relationship:</label>
                                <input
                                    name="emergency_contact_1_relationship"
                                    className="form-control"
                                    type="text"
                                    defaultValue={data?.emergency_contact_1_relationship || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label>Emergency Contact 1 Phone:</label>
                                <input
                                    name="emergency_contact_1_phone"
                                    className="form-control"
                                    type="tel"
                                    defaultValue={data?.emergency_contact_1_phone || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label>Emergency Contact 2 Name:</label>
                                <input
                                    name="emergency_contact_2_name"
                                    className="form-control"
                                    type="text"
                                    defaultValue={data?.emergency_contact_2_name || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label>Emergency Contact 2 Relationship:</label>
                                <input
                                    name="emergency_contact_2_relationship"
                                    className="form-control"
                                    type="text"
                                    defaultValue={data?.emergency_contact_2_relationship || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label>Emergency Contact 2 Phone:</label>
                                <input
                                    name="emergency_contact_2_phone"
                                    className="form-control"
                                    type="tel"
                                    defaultValue={data?.emergency_contact_2_phone || ''}
                                />
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
    );
}
