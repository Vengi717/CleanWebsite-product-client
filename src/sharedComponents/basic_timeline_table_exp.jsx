import { map } from 'jquery';
import React, { Component, useMemo, useState, useEffect } from 'react';
import { Space, Spin } from 'antd';

export default function main4(props) {
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
                <h3 className="card-title">Experience<a href="#" className="edit-icon" data-toggle="modal" data-target={"#" + props.modal_data?.modal_name}><i className="fa fa-pencil" /></a></h3>
                <div className="experience-box">
                    <ul className="experience-list">
                        {
                            data ?
                                (
                                    data?.map((row, index) => {



                                        /*
                                       address: "452 fake street"
            employee_id: 1
            end: "7/12/2017"
            experience_id: 1
            name_of_providor: "Company ABC"
            position: "Intern"
            start: "7/12/2016"
                                        */
                                        return <li key={"a" + index}>
                                            <div className="experience-user">
                                                <div className="before-circle" />
                                            </div>
                                            <div className="experience-content">
                                                <div className="timeline-content">
                                                    <a href="/" className="name">
                                                        {row?.name_of_providor}
                                                    </a>
                                                    <div>
                                                        {row?.position}
                                                    </div>

                                                    <span className="time">
                                                        {row?.address}
                                                    </span>
                                                    <span className="time">
                                                        {row?.start + "  -  " + row?.end}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>

                                    }

                                    ))
                                :
                                (
                                    <li>
                                        <Space size="middle">
                                            <Spin />
                                        </Space>
                                    </li>

                                )

                        }

                    </ul>
                </div>
            </div>
        </div>
    </div>



}




