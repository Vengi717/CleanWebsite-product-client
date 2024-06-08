import React from 'react';
import api from '../../../../../_services_data/api/_handler'



const modalTitle = "Update General Information"

export default function modal({ props }) {
    const { data, FormRef, reduxData, triggerReload, modalName } = props
    const apiURL = `AdminUserProfileUpdateUser/${data?.id_user}`

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
                            <label>Bank Name:</label>
                            <input
                                name="bank_name"
                                className="form-control"
                                type="text"
                                defaultValue={data?.bank_name || ''}
                            />
                        </div>
                        <div className="form-group">
                            <label>Account Name:</label>
                            <input
                                name="bank_account_name"
                                className="form-control"
                                type="text"
                                defaultValue={data?.bank_account_name || ''}
                            />
                        </div>
                        <div className="form-group">
                            <label>Name on Account:</label>
                            <input
                                name="bank_name_on_account"
                                className="form-control"
                                type="text"
                                defaultValue={data?.bank_name_on_account || ''}
                            />
                        </div>
                        <div className="form-group">
                            <label>Account #:</label>
                            <input
                                name="bank_account_number"
                                className="form-control"
                                type="text"
                                defaultValue={data?.bank_account_number || ''}
                            />
                        </div>
                        <div className="form-group">
                            <label>Routing #:</label>
                            <input
                                name="bank_routing_number"
                                className="form-control"
                                type="text"
                                defaultValue={data?.bank_routing_number || ''}
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
