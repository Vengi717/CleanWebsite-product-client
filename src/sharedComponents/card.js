import React from 'react';
import { Space, Spin, Table, Skeleton, notification } from 'antd';

function row(data, title, index) {
    if (data.name) {
        return <li key={"card_row_" + index}>
            <div className="title">{data.name}</div>
            <div className="text">{data.value}</div>
        </li >
    } else {
        return <h5 key={"card_row_" + index} style={{ textAlign: "center" }} className="section-title">{data.value}</h5>

    }
}


function main1(props) {

    return props.nonEdit ?

        <div className="card profile-box flex-fill">
            <div className="card-body">
                <h3 className="card-title">{props.title}</h3>
                <ul className="personal-info">
                    {props.data.map(
                        (row_data, index) => row(row_data, props.title, index)
                    )}
                </ul>
            </div>
        </div>
        :
        <div className="card profile-box flex-fill">
            <div className="card-body">
                <h3 className="card-title">{props.title}
                    <a href="#" className="edit-icon" data-toggle="modal" data-target={"#" + props.modal_data?.modal_name}><i className="fa fa-pencil" /></a></h3>
                <ul className="personal-info">
                    {props.data.map(
                        (row_data, index) => row(row_data, props.title, index)
                    )}
                </ul>
            </div>
        </div>

}


export default main1
