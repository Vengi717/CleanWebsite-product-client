import { map } from 'jquery';
import React, { Component, useMemo, useState, useEffect } from 'react';
import { Space, Spin } from 'antd';

export default function main3(props) {
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
                <h3 className="card-title">Education History <a href="#" className="edit-icon" data-toggle="modal" data-target={"#" + props.modal_data?.modal_name}><i className="fa fa-pencil" /></a></h3>
                <div className="experience-box">
                    <ul className="experience-list">
                        {
                            data ?
                                (
                                    data?.map((row, index) => {



                                        /*
                                        address: "123 fake street"
                                        course: "Business"
                                        education_id: 1
                                        employee_id: 1
                                        end: "2/5/2016"
                                        name_of_providor: "Collage of Australia"
                                        start: "2/5/2015"
                                        */
                                        return <li key={index}>
                                            <div className="experience-user">
                                                <div className="before-circle" />
                                            </div>
                                            <div className="experience-content">
                                                <div className="timeline-content">
                                                    <a href="/" className="name">
                                                        {row?.name_of_providor}
                                                    </a>
                                                    <div>
                                                        {row?.course}
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
                                   
                                            <Space size="middle">
                                                <Spin />
                                            </Space>
                                    

                                )

                        }

                    </ul>
                </div>
            </div>
        </div>
    </div>



}




