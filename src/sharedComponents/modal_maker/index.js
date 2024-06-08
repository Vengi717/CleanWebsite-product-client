//TODO: phase out use and replace with component_modal_v2
import Multiselect from 'multiselect-react-dropdown';
import Picky from "react-picky";
import "react-picky/dist/picky.css";
import React, { Component, useState, useEffect } from 'react';
import Input from '../Input';
import Button from '../Button';
import Rich_editor from '../rich_text'
import './style.css'
import { Space, Spin, Table, Skeleton, notification } from 'antd';
import Select from 'react-select';

import Input_select_multi from './inputs/select_multi/index'


function Testt(props) {

    const { default_checked, id } = props
    var ele = document.getElementById(id)
    if (ele && default_checked) {
        ele.checked = true
    }
    return <div></div>
}
//class class_main {
export default function class_main(props) {



    function set_dropdown_via_text_match() {//NOT IN USE
        var dd = document.getElementById('STATUS');
        for (var i = 0; i < dd.options.length; i++) {
            if (dd.options[i].text === 'Closed') {
                dd.selectedIndex = i;
                break;
            }
        }
    }

    function rich_text() {
        return <Rich_editor></Rich_editor>
    }

    function dropdown(data, index_) {
        return <div key={index_ + data.title} className="col-md-6">
            <div className="form-group">
                <label>{data.title}</label>
                <select id={data.title} name={data.id_name} className="custom-select custom-select-sm">
                    {
                        data.data?.map((ele, index) => {
                            if (data.default_text == ele[data.name_name]) {
                                return <option selected key={ele[data.name_name]}>{ele[data.name_name]}</option>
                            }
                            else {
                                return <option key={ele[data.name_name]}>{ele[data.name_name]}</option>

                            }
                        }

                        )

                    }
                </select>
            </div>
        </div>
    }

    function create_date_format(datedate) {
        return typeof datedate == 'string' ? new Date(datedate).toISOString().split('T')[0] // yyyy-mm-dd
            :
            null
    }

    function dep_dropdown(data, index_) {
        return <div key={index_ + data.type + getRandomInt(999)} className="col-md-6">
            <div className="form-group"> {data.data}</div></div>
    }

    function new_dep_dropdown(data, index_) {
        //   console.log("fffffffff", data)
        return <div key={getRandomInt(999)} className="col-md-6">
            <div className="form-group"> {data.data}</div></div>
    }

    function hidden(data, index_, key) {
        return <input readOnly key={getRandomInt(999)} name={key} hidden value={data.default_text} >

        </input>





    }

    function test() {
        console.log("what is this?")
    }
    function textfield(data, index_) {

        return data.required ?
            <div key={data.id_name} className="col-md-6">
                <div className="form-group">
                    <Input type={data.password ? 'password' : ''} password={data.password} required onChange={test} name={data.id_name} value={data.default}>
                        <label>{data.title} <span className="text-danger">*</span></label>
                    </Input></div>
            </div>

            :
            <div key={data.id_name} className="col-md-6">
                <div className="form-group">
                    <Input type={data.password ? 'password' : ''} onChange={test} name={data.id_name} value={data.default}>
                        <label>{data.title} <span className="text-danger">*</span></label>
                    </Input></div>
            </div>


    }

    function dateselect(data, index_) {
        return <div key={data.id_name} className="col-md-6">
            <div className="form-group">
                <Input required onChange='' key={data.id_name} id={data.id_name} name={data.id_name} value={create_date_format(data.default)} type="date">
                    <label>{data.title} <span className="text-danger">*</span></label>
                </Input>
            </div>
        </div>
    }

    function textbox(data, index_) {
        const ran = ''//getRandomInt(9999)
        return data.required ?

            <div key={data.id_name} className="col-md-12">
                <Input required key={ran + data.id_name} onChange='' id={ran + data.id_name} input name={data.id_name} value={data.default}>
                    <label>{data.title} <span className="text-danger">*</span></label>
                </Input>
            </div>
            :
            <div key={data.id_name} className="col-md-12">
                <Input key={ran + data.id_name} onChange='' id={ran + data.id_name} input name={data.id_name} value={data.default}>
                    <label>{data.title} <span className="text-danger">*</span></label>
                </Input>
            </div>
    }




    function remove_property(data_array, keys) {
        var processed_data = data_array?.map((row) => {
            for (let index = 0; index < keys.length; index++) {
                const element = keys[index];
                delete row[element]
            }
            return row;
        });
        return processed_data
    }

    function table(data, index_) {
        data.data = remove_property(data.data, ["id_user"])
        return data?.data ?
            <div key={data.id_name} className="card profile-box flex-fill">
                <div className="card-body">
                    <div className="table-responsive">
                        <table id={data.row_id_name} className="table table-nowrap">
                            <thead>
                                <tr>
                                    {data.cols.map((col_name, index) =>
                                        <th key={index}>{col_name.name}<span className="text-danger">*</span></th>
                                    )}
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.data.map((row_object, row_object_index) => {//goes through each row
                                        const row_converted_to_array = Object.entries(row_object)
                                        return <tr id={row_object[data.row_id_name]} key={row_object[data.row_id_name]}>
                                            {row_converted_to_array.map((col, col_index) => {//goes through each col for the row
                                                if (col[0] != data.row_id_name) {
                                                    return <td key={col_index}>
                                                        <Input required onChange={test} name={col[0]} value={col[1]}>
                                                        </Input>
                                                    </td>
                                                }
                                            })
                                            }
                                        </tr>

                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            :
            <Space key={"random"} size="middle">
                <Spin />
            </Space>




    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }



    const [multi_select_data, set_multi_select_data] = useState({});

    function col(data_array, index, key, editing, real_data) {//this sets each col
        return (data_array.map((data) => {
            if (data.type == 'dropdown') {
                return dropdown(data, index)
            }
            else if (data.type == 'textfield') {
                return textfield(data, index)
            }
            else if (data.type == 'dateselect') {
                return dateselect(data, index)
            }
            else if (data.type == 'textbox') {
                return textbox(data, index)
            }
            else if (data.type == 'dep_dropdown') {
                return dep_dropdown(data, index)
            }
            else if (data.type == 'rich_text') {
                return rich_text(data, index)
            }
            else if (data.type == 'table') {
                return table(data, index)
            }
            else if (data.type == 'hidden') {
                return hidden(data, index, key)
            }
            else if (data.type == 'new_dep_dropdown') {
                return new_dep_dropdown(data, index, key)
            }
            else if (data.type == 'file_download') {
                return file_download(data, index, key)
            }
            else if (data.type == 'file_upload') {
                return file_upload(data, index, key)
            }
            else if (data.type == 'checkbox') {

                console.log("real data: ", real_data)
                return checkbox(data, index, key, editing)
            }

            else if (data.type == 'MULTISELECT') {
                return <div key={data.title + index} className="dropdown-containera">
                    <Input_select_multi
                        data={data}
                        index={index}
                        key={key}
                        multi_select_data={ multi_select_data}
                        set_multi_select_data={set_multi_select_data}
                    />
                </div>
            }



        }

        ))
    }
    function file_upload(data, index, key) {
        return data?.required ? <div className="col-md-6">
            <input required type="file" name='file1' hidden onChange={
                (e) => data.callback({ e, file_name: data.file_name })//TODO: file name to be the same as the name textbox on the modal
            } className="custom-file-input" id={"firebase_upload1" + index + key} />
            <button className="btn btn-danger" style={{ width: "-webkit-fill-available" }} onClick={async (e) => {
                e.preventDefault();
                await $("#firebase_upload1" + index + key).trigger('click', 'test');
            }}

            > {



                    data.title


                }
            </button >
        </div>
            :
            <div className="col-md-6">
                <input type="file" name='file1' hidden onChange={
                    (e) => data.callback({ e, file_name: data.file_name })//TODO: file name to be the same as the name textbox on the modal
                } className="custom-file-input" id="firebase_upload1" />
                <button className="btn btn-danger" style={{ width: "-webkit-fill-available" }} onClick={async (e) => {
                    e.preventDefault();
                    await $('#firebase_upload1').trigger('click', 'test');
                }}

                >Replace Document
                </button >
            </div>
    }

    function file_download(data) {
        return <div className="col-md-6">
            <button className="btn btn-info" style={{ width: "-webkit-fill-available" }} onClick={async (e) => {
                e.preventDefault();
                window.open(data.data.documents_company_provided_url)
            }}
            >Download Document
            </button >
        </div>
    }

    function checkbox(data, ind, key, is_editing) {
        //  console.log(key)
        const id = "customSwitch" + ind + key + is_editing //+ getRandomInt(999)
        return <div className="col-md-6">
            <div className="custom-control custom-switch">

                <Testt
                    default_checked={data.default_checked}
                    id={id}
                ></Testt>

                <input
                    onClick={
                        (e) => (
                            console.log("here", e.target.checked),
                            checked = !checked
                        )

                    }

                    name={data.id_name} type="checkbox" className="custom-control-input" id={id} />
                <label className="custom-control-label" htmlFor={id}>{data.title}</label>
            </div>
        </div>

    }

    function body(data_array) {//this sets each row


        //  return <div></div>//TODO: remove  for debug only
        return <div id={data_array.modal_name} className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">

                            {data_array.title} </h5>



                        <button type="button" id={'close_modal_' + data_array.modal_name} className="close" onClick={clearState} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form id={'form_main' + data_array.modal_name} onSubmit={(e) =>
                            //TODO: convert this to pass a object instead of an array
                            handleSubmit(e, data_array)} >
                            {
                                data_array?.inputs
                                    .map((data, index__) => {
                                        return <div style={{ width: "100%" }} id={"data_array_" + index__ + data_array.title} key={"data_array_" + index__ + data_array.title} className="row">
                                            {
                                                col(data, index__, data_array.key, data_array?.title?.includes("dit"), data_array)//the last bool is true if editing
                                            }
                                        </div>
                                    }
                                    )
                            }
                            <Button value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    }

    function get_table_data(data_array) {
        const table = document.getElementById(data_array?.inputs[0][0].row_id_name)
        const a = tableToJSON(table)
        function tableToJSON(table) {
            var new_data = []
            var row, rows = table.rows;
            for (var i = 1, iLen = rows.length; i < iLen; i++) {//goes through each row
                var new_temp = {}
                row = rows[i];
                const cols = row.getElementsByTagName('input')
                new_temp[data_array?.inputs[0][0].row_id_name] = row.id
                Array.prototype.forEach.call(cols, function (el) {
                    new_temp[el.name] = el.value
                })
                new_data.push(new_temp)
            }

            return new_data;
        }

        return a
    }

    async function get_form_data(data_array) {
        const is_table_modal = data_array?.inputs[0].find((ele) => ele.type == "table") != undefined
        var object

        if (is_table_modal) {
            object = []
            object = await get_table_data(data_array)

        } else {
            object = {};
            var form = document.getElementById("form_main" + data_array.modal_name)


            // console.log("form_main" + data_array.modal_name)
            var formData = new FormData(form);

            formData.forEach(function (value, key) {
                object[key] = value;
            });
        }


console.log("ggggggggggggg",multi_select_data)

        var temp = []
        var key
        Object.entries(multi_select_data).map((ele, index) => {
            if (index != 0) {
                temp.push(...ele[1])
            } else {
                key = ele[0]
            }
        })
        const multi_select_da = { [key]: temp.toString() }
        return { ...object, ...multi_select_da }
    }
    function clearState(event) {
        event.preventDefault();
    }

    async function handleSubmit(event, data_array) {



        event.preventDefault();
        event.persist()
        console.log("------------------------------------------")

        const newest_data = await get_form_data(data_array)

        data_array.editing.name = data_array.editing.name



      //  console.log("returning data: ", newest_data)
         // return null
        if (data_array.callback && data_array.callback != null) {

            var response
            data_array.editing.key ?
                response = await data_array.callback({
                    event, modal_title: data_array.modal_title,
                    data: {
                        [data_array.editing.key]: data_array.editing.data[data_array.editing.key],
                        data: await newest_data
                    }
                })
                :
                response = await data_array.callback({ event, data: get_form_data(data_array), modal_title: data_array.modal_title })
            if (await response.success) {
                document.getElementById(data_array.modal_name).click()
                if (data_array.reload_state_function && data_array.reload_state_function != null) {
                    data_array.reload_state_function()
                }
            }
        }
        else {
            console.log("Need to pass a callback to get this data: ", get_form_data(data_array))
        }

    }
    const [return_data, set_return_data] = useState(<div> ERROR</div>);
    useEffect(() => {
        if (props?.data?.modal_name) {
            //    set_multi_select_data({})

            set_return_data(body(props?.data))
        }
    }, [props,multi_select_data])
    return return_data
}

