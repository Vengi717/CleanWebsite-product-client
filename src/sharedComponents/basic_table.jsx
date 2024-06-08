import { map } from 'jquery';
import React, { Component, useMemo, useState, useEffect } from 'react';
import { Space, Spin } from 'antd';

export default function main2(props) {
    const [data, setData] = useState([]);
    // Using useEffect to call the API once mounted and set the data
    useEffect(() => {
        (async () => {
            setData(props.data);
        })();
    }, [props.data]);



    return <div className="col-md-6 d-flex">
        <div className="card profile-box flex-fill">
            <div className="card-body">
                <h3 className="card-title">Family Information <a href="#" className="edit-icon" data-toggle="modal" data-target={"#" + props.modal_data?.modal_name}><i className="fa fa-pencil" /></a></h3>
                <div className="table-responsive">
                    <table className="table table-nowrap">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Relationship</th>
                                <th>Date of Birth</th>
                                <th>Phone</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {data ? (data?.map((row, index) => {
                                return <tr key={index}>
                                    <td>{row.name}</td>
                                    <td>{row.relationship}</td>
                                    <td>{row.DOB}</td>
                                    <td>{row.phone}</td>
                                </tr>
                            })) : (
                                <tr>
                                    <td>
                                        <Space size="middle">
                                            <Spin />
                                        </Space>
                                    </td>
                                </tr>

                            )


                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

}
