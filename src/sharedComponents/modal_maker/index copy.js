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

function Testt(props) {

    const { default_checked, id } = props
    var ele = document.getElementById(id)
    if (ele && default_checked) {
        ele.checked = true
    }
    return <div></div>
}
//class class_main {
class class_main extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpenSignIn = this.handleOpenSignIn.bind(this);

        this.state = {
            is_mounted: false,
            openSignIn: false,
            data: props?.data,
            selectedValues: []
        };

    }

    componentDidMount() {
        this._ismounted = true;
    }
    componentWillUnmount() {
        this._ismounted = false;
    }

    componentWillReceiveProps(nextProps) {
        //   console.log('componentWillReceiveProps', nextProps);
        this.setState({
            openSignIn: false,
            data: nextProps.data,
            selectedValues: []
        });
    }


    handleOpenSignIn() {
  
        console.log("mounted", this._ismounted)

        const aaaa = {
            openSignIn: true,
            data: this.state.data,
            selectedValues: []
        };

        this.setState({ ...aaaa })
        //   this.state =  aaaa 
        console.log("aaaSTATE: ", this.state)
        //    this.setState({openSignIn: true});

        // this.state.openSignIn = true

        //   this.setState(post)

        /*  this.setState({
              ...this.state,
              openSignIn: true
          });*/
        //      console.log("pre: ", this.state)
        //   console.log("post: ", post)




    }

    newhandle(data_row) {
        console.log("thsissss: ", data_row)
        /* this.setState({
             selectedValues: data_row
         });
 */
        this.setState({
            ...this.state,
            openSignIn: true
        });


        console.log("STATE: ", this.state)
    }

    /*
MULTISELECT_handleChange(selected) {
   // console.log(this.state)
    this.setState({ selectedValues: selected });
}*/
    MULTISELECT_handleChange = (selected) => {
        console.log(this.state)
        this.state = { selectedValues: selected }
    }
    //            <div>Selected Values: {this.state.selectedValues.join(', ')}</div>

    MULTISELECT(data, index_) {
        const dataa = [
            {
                value: 1,
                label: "cerulean"
            },
            {
                value: 2,
                label: "fuchsia rose"
            },
            {
                value: 3,
                label: "true red"
            },
            {
                value: 4,
                label: "aqua sky"
            },
            {
                value: 5,
                label: "tigerlily"
            },
            {
                value: 6,
                label: "blue turquoise"
            }
        ];
        //   console.log("ff: ", data)
        return <div id={"dropdown-containera"} key={funcs.class_main.getRandomInt(999) + index_} className="dropdown-containera">
            <div>

                {
                    this.state.openSignIn ? "true" : "false"
                }

            </div>


            <label style={{ textAlign: 'left' }}>{data.title} </label>


            <Select
                className="dropdown"
                placeholder="Select Option"
                // value={data?.data?.filter(obj => selectedValue.includes(obj.value))} // set selected values
                getOptionLabel={(option) => option.document_name}
                getOptionValue={(option) => option.active_documents_master_names}
                options={data.data} // set list of the data
                onChange={(data_row) => this.handleOpenSignIn(data_row)}//this.MULTISELECT_handleChange} // assign onChange function
                multi
            />
            {/*
            <Multiselect
             //   onChange={this.MULTISELECT_handleChange}
             onChange={(e) => console.log(`e`, e)}

                displayValue="document_name"
                options={
                    data.data
                }
            />*/}
        </div>

    }



    /* constructor() {
 
 
        /* this.state = {
             selectedValues: []
         };
         //  this.MULTISELECT_handleChange = this.MULTISELECT_handleChange.bind(this)
 
     }
     */

    set_dropdown_via_text_match() {//NOT IN USE
        var dd = document.getElementById('STATUS');
        for (var i = 0; i < dd.options.length; i++) {
            if (dd.options[i].text === 'Closed') {
                dd.selectedIndex = i;
                break;
            }
        }
    }

    rich_text() {
        return <Rich_editor></Rich_editor>
    }

    dropdown(data, index_) {
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

    create_date_format(datedate) {
        return typeof datedate == 'string' ? new Date(datedate).toISOString().split('T')[0] // yyyy-mm-dd
            :
            null
    }

    dep_dropdown(data, index_) {
        return <div key={index_ + data.type + funcs.class_main.getRandomInt(999)} className="col-md-6">
            <div className="form-group"> {data.data}</div></div>
    }

    new_dep_dropdown(data, index_) {
        //   console.log("fffffffff", data)
        return <div key={funcs.class_main.getRandomInt(999)} className="col-md-6">
            <div className="form-group"> {data.data}</div></div>
    }

    hidden(data, index_, key) {
        return <input readOnly key={funcs.class_main.getRandomInt(999)} name={key} hidden value={data.default_text} >

        </input>





    }

    textfield(data, index_) {

        return data.required ?
            <div key={data.id_name} className="col-md-6">
                <div className="form-group">
                    <Input type={data.password ? 'password' : ''} password={data.password} required onChange={funcs.class_main.test} name={data.id_name} value={data.default}>
                        <label>{data.title} <span className="text-danger">*</span></label>
                    </Input></div>
            </div>

            :
            <div key={data.id_name} className="col-md-6">
                <div className="form-group">
                    <Input type={data.password ? 'password' : ''} onChange={funcs.class_main.test} name={data.id_name} value={data.default}>
                        <label>{data.title} <span className="text-danger">*</span></label>
                    </Input></div>
            </div>


    }

    dateselect(data, index_) {
        return <div key={data.id_name} className="col-md-6">
            <div className="form-group">
                <Input required onChange='' key={data.id_name} id={data.id_name} name={data.id_name} value={funcs.class_main.create_date_format(data.default)} type="date">
                    <label>{data.title} <span className="text-danger">*</span></label>
                </Input>
            </div>
        </div>
    }

    textbox(data, index_) {

        return data.required ?

            <div key={data.id_name} className="col-md-12">
                <Input required key={data.id_name} onChange='' id={data.id_name} input name={data.id_name} value={data.default}>
                    <label>{data.title} <span className="text-danger">*</span></label>
                </Input>
            </div>
            :
            <div key={data.id_name} className="col-md-12">
                <Input key={data.id_name} onChange='' id={data.id_name} input name={data.id_name} value={data.default}>
                    <label>{data.title} <span className="text-danger">*</span></label>
                </Input>
            </div>
    }




    remove_property(data_array, keys) {
        var processed_data = data_array?.map((row) => {
            for (let index = 0; index < keys.length; index++) {
                const element = keys[index];
                delete row[element]
            }
            return row;
        });
        return processed_data
    }

    table(data, index_) {
        data.data = funcs.class_main.remove_property(data.data, ["id_user"])
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
                                                        <Input required onChange={funcs.class_main.test} name={col[0]} value={col[1]}>
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
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    col(data_array, index, key, editing, real_data) {//this sets each col
        return (data_array.map((data) => {
            if (data.type == 'dropdown') {
                return funcs.class_main.dropdown(data, index)
            }
            else if (data.type == 'textfield') {
                return funcs.class_main.textfield(data, index)
            }
            else if (data.type == 'dateselect') {
                return funcs.class_main.dateselect(data, index)
            }
            else if (data.type == 'textbox') {
                return funcs.class_main.textbox(data, index)
            }
            else if (data.type == 'dep_dropdown') {
                return funcs.class_main.dep_dropdown(data, index)
            }
            else if (data.type == 'rich_text') {
                return funcs.class_main.rich_text(data, index)
            }
            else if (data.type == 'table') {
                return funcs.class_main.table(data, index)
            }
            else if (data.type == 'hidden') {
                return funcs.class_main.hidden(data, index, key)
            }
            else if (data.type == 'new_dep_dropdown') {
                return funcs.class_main.new_dep_dropdown(data, index, key)
            }
            else if (data.type == 'file_download') {
                return funcs.class_main.file_download(data, index, key)
            }
            else if (data.type == 'file_upload') {
                return funcs.class_main.file_upload(data, index, key)
            }
            else if (data.type == 'checkbox') {

                console.log("real data: ", real_data)
                return funcs.class_main.checkbox(data, index, key, editing)
            }

            else if (data.type == 'MULTISELECT') {
                return funcs.class_main.MULTISELECT(data, index, key)
            }




        }

        ))
    }
    file_upload(data, index, key) {
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

    file_download(data) {
        return <div className="col-md-6">
            <button className="btn btn-info" style={{ width: "-webkit-fill-available" }} onClick={async (e) => {
                e.preventDefault();
                window.open(data.data.documents_company_provided_url)
            }}
            >Download Document
            </button >
        </div>
    }

    checkbox(data, ind, key, is_editing) {
        //  console.log(key)
        const id = "customSwitch" + ind + key + is_editing //+ funcs.class_main.getRandomInt(999)
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
                            this.checked = !this.checked
                        )

                    }

                    name={data.id_name} type="checkbox" className="custom-control-input" id={id} />
                <label className="custom-control-label" htmlFor={id}>{data.title}</label>
            </div>
        </div>

    }

    body(data_array) {//this sets each row
        //  return <div></div>//TODO: remove this. for debug only
        return <div id={data_array.modal_name} className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">

                            {data_array.title} </h5>



                        <button type="button" id={'close_modal_' + data_array.modal_name} className="close" onClick={funcs.class_main.clearState} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form id={'form_main' + data_array.modal_name} onSubmit={(e) =>
                            //TODO: convert this to pass a object instead of an array
                            funcs.class_main.handleSubmit(e, data_array)} >



                            {

                                data_array?.inputs
                                    .map((data, index__) => {
                                        return <div style={{ width: "100%" }} id={"data_array_" + index__ + data_array.title} key={"data_array_" + index__ + data_array.title} className="row">
                                            {
                                                funcs.class_main.col(data, index__, data_array.key, data_array?.title?.includes("dit"), data_array)//the last bool is true if editing
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

    get_table_data(data_array) {
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

    async get_form_data(data_array) {
        const is_table_modal = data_array?.inputs[0].find((ele) => ele.type == "table") != undefined
        var object

        if (is_table_modal) {
            object = []
            object = await funcs.class_main.get_table_data(data_array)

        } else {
            object = {};
            var form = document.getElementById("form_main" + data_array.modal_name)


            // console.log("form_main" + data_array.modal_name)
            var formData = new FormData(form);

            formData.forEach(function (value, key) {
                object[key] = value;
            });
        }


        return object
    }
    clearState(event) {
        event.preventDefault();
    }

    async handleSubmit(event, data_array) {



        event.preventDefault();
        event.persist()
        console.log("------------------------------------------")

        const newest_data = await funcs.class_main.get_form_data(data_array)


        console.log("ttttttt: ", this.state)
        data_array.editing.name = data_array.editing.name


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
                response = await data_array.callback({ event, data: funcs.class_main.get_form_data(data_array), modal_title: data_array.modal_title })
            if (await response.success) {
                document.getElementById(data_array.modal_name).click()
                if (data_array.reload_state_function && data_array.reload_state_function != null) {
                    data_array.reload_state_function()
                }
            }
        }
        else {
            console.log("Need to pass a callback to get this data: ", funcs.class_main.get_form_data(data_array))
        }
    }


    render() {
        //  console.log("ddddd", this.state)

        return <div> {this.body(this.state?.data)} </div>
    }

}

const funcs = { class_main: new class_main }
//export default funcs

function main5(data) {

    return funcs.class_main.body(data.data)
}
export default class_main//main5