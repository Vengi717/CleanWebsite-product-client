//TODO: The submit button needs to be disabled and set as loading when its waiting on the api results

import Input from '../Input';
import Button from '../Button';
import File_input from '../file_inputs/input_component'
import React, { useState, useEffect } from 'react';
import services_data from '../../_services_data/_services_data'

function new_mm(props) {


    const { data } = props

    ///TODO: this is for the file input. It needs to be made cleaner
    const [input_data, set_input_data] = useState({});//new 
    const [default_url, set_default_url] = useState('');//new 

    useEffect(() => {
        set_default_url(data?.editing?.data?.documents_company_provided_url)
        set_input_data({})
    }, [data?.editing?.data])//[input_data, default_url,data]);
    //data?.editing?.data?.documents_company_provided_url,

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    function input_type_button_link(props) {
        const { input_col_data } = props

    

        const file_name = default_url?.split("%2F").pop().split("?alt")[0].replaceAll("%20", " ")
      
            return <div />
        



    }
    function input_selector(props) {
        const { input_col_data } = props
        if (input_col_data.type == "textbox") {
            return input_type_textbox(props)
        }
        else if (input_col_data.type == "textfield") {
            return input_type_textfield(props)
        }
        else if (input_col_data.type == "checkbox") {
            return input_type_checkbox(props)
        }
        else if (input_col_data.type == "dropdown") {
            return input_type_dropdown(props)
        }
        else if (input_col_data.type == "file_input") {
            return input_type_file_input(props)
        }
        else if (input_col_data.type == "input_type_button_link") {
            return input_type_button_link(props)
        }


    }
    function input_type_textfield(props) {//textarea
        const { input_col_data } = props

        var input_props = {}
        input_col_data.required ?
            input_props = { required: true }
            : null


        if (input_col_data.default_value == null) {
            input_col_data.default_value = ""
        }

        return <div>


            <Input
                input//this makes it a textarea* //TODO: change 'input' to something else like: text area or just read the actual type that is already sent
                password={input_col_data.password}
                {...input_props}
                name={input_col_data.input_key}
                value={input_col_data.default_value}>
                <label>{input_col_data.label}

                    <span className="text-danger">
                        {
                            input_col_data.required ?
                                "  *"
                                :
                                null
                        }
                    </span>

                </label>
            </Input>

        </div>




    }
    function input_type_textbox(props) {
        const { input_col_data } = props




        var input_props = {}
        input_col_data.required ?
            input_props = { required: true }
            : null
        return <Input
            type={input_col_data.password ? 'password' : ''}
            password={input_col_data.password}
            {...input_props}
            name={input_col_data.input_key}
            value={input_col_data.default_value}>
            <label>{input_col_data.label}


                <span className="text-danger">
                    {//TODO: turn this into a function and replace all instaces with that function
                        input_col_data.required ?
                            "  *"
                            :
                            null
                    }
                </span>


            </label>
        </Input>


    }
    function Test(props) {//I think this was made redundant
        if (document.getElementById(props.checkbox_id + "_false_")) {
            console.log("id--: ", props.checkbox_id + "_false_")
        }
        return <div></div>
    }
    function input_type_checkbox(props) {//FYI, this will only return in the callback when the checkbox is true. if its not true it will not exist in callback data
        const { input_col_data, col_id } = props
        var input_props = {}
        var checkbox_id = col_id + "_randomnumber_" + getRandomInt(0)

        if (props?.editing?.data) {
            checkbox_id = col_id + "_randomnumber_" + getRandomInt(0) + "_ID_" + props.editing.data.active_documents_master_names
        }

        // console.log("fffff", input_col_data.default_value == true)
        return input_col_data.default_value == true ?
            <div className="custom-control custom-switch">
                <input
                    name={input_col_data.input_key} type="checkbox" className="custom-control-input checkbox_null"
                    id={checkbox_id + "_true_"}
                    defaultChecked
                />

                <label className="custom-control-label"
                    htmlFor={checkbox_id + "_true_"} >
                    {input_col_data.label}

                    <span className="text-danger">
                        {//TODO: turn this into a function and replace all instaces with that function
                            input_col_data.required ?
                                "  *"
                                :
                                null
                        }
                    </span>
                </label>
            </div>
            :

            <div className="custom-control custom-switch">
                <script>try{//TODO: find out why this is needed and implement a proper fix //I am not sure why, though this is needed for the company provided checkbox to work. Otherwise, when switching from a row that is true , to false, the checkbox will remain true. I think it has something to do with loading times?
                  
                }catch(e){ }
                </script>
                <input
                    name={input_col_data.input_key} type="checkbox" className="custom-control-input checkbox_null"
                    id={checkbox_id + "_false_"}
                />
                <label className="custom-control-label"
                    htmlFor={checkbox_id + "_false_"} >
                    {input_col_data.label


                    }
                    <span className="text-danger">
                        {
                            input_col_data.required ?
                                "  *"
                                :
                                null
                        }
                    </span>
                </label>
            </div>


    }
    function input_type_dropdown(props) {//FYI, this will only return in the callback when the checkbox is true. if its not true it will not exist in callback data
        const { input_col_data, col_id } = props
        const id_base = input_col_data.input_key

        return <div >
            <label>{input_col_data.label}
                <span className="text-danger">
                    {
                        input_col_data.required ?
                            "  *"
                            :
                            null
                    }
                </span>
            </label>
            <select style={{ height: "44px" }} id={id_base} name={id_base} className="custom-select custom-select-sm">
                {
                    input_col_data?.data?.map((checkbox_data, checkbox_index) => {
                        if (input_col_data.default_text == checkbox_data.name) {
                            return <option selected key={id_base + checkbox_data.name}>{checkbox_data.name}</option>
                        }
                        else {
                            return <option key={id_base + checkbox_data.name}>{checkbox_data.name}</option>
                        }
                    }
                    )
                }
            </select>
        </div>
    }
    function input_type_file_input(props) {
        const { input_col_data } = props
        return data?.editing?.data?.documents_company_provided_url ?
            <File_input
                can_delete={input_col_data.can_delete}
                default_url={default_url}
                set_default_url={set_default_url}
                input_unique={input_col_data.input_unique}
                input_data={input_data}
                set_input_data={set_input_data}
            ></File_input>

            :
            <File_input
                can_delete={input_col_data.can_delete}

                default_url={default_url}
                set_default_url={set_default_url}
                input_unique={input_col_data.input_unique}
                input_data={input_data}
                set_input_data={set_input_data}
            ></File_input>
    }


    function col(props) {
        const { input_row_data, row_id } = props
        const col_id_base = row_id + "_col_"
        // console.log("row inputs", input_row_data)
        return input_row_data
            .map((input_col_data, input_col_index) => {//rows
                const col_id = col_id_base + input_col_index
                return <div key={col_id}
                    className={input_col_data.type == "textfield" || input_col_data.type == "file_input" ? "col-md-12" : "col-md-6"}
                >
                    <div className="form-group">

                        {
                            input_selector({
                                ...props,
                                input_col_data,
                                col_id
                            })
                        }
                    </div>
                </div>
            }
            )
    }
    function body(data) {
        if (data.main_name == "Edit_Documents...") {
            console.log("---------")
            console.log("name: ", data.main_name)
            console.log("Made: ", data)
        }
        const form_id = "form_" + data.main_name
        const row_id_base = form_id + "_row_"

        return <div id={data.main_name.replaceAll(" ", "_")} className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {data.main_name.replaceAll("_", " ")} </h5>
                        <button type="button" id={'close_modal_' + data.main_name} className="close" onClick={null} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body"><form id={form_id} onSubmit={(e) =>
                        submit({ e, ...data, form_id })} >
                        {
                            data?.inputs
                                .map((input_row_data, input_row_index) => {//rows
                                    const row_id = row_id_base + input_row_index
                                    return <div key={row_id} className="row">
                                        {
                                            col({
                                                ...data,
                                                input_row_data,
                                                input_row_index,
                                                row_id,
                                                form_id
                                            })//the last bool is true if editing
                                        }
                                    </div>
                                }
                                )
                        }
                        <Button value="Submit" />
                    </form>
                    </div></div></div></div>
    }
    async function submit(props) {
        const { e } = props
        e.preventDefault();
        e.persist()
        props.form_data = await get_form_data(props)
        const response = await props.callback({ ...props.form_data })
        if (await response?.success && !props.callback_handle_file_input) {//close modal and reload data if callback successful
            await document.getElementById(props.main_name).click()
            await props.callback_reload_data({ ...props.form_data })

        } else if (await response?.success && props.callback_handle_file_input && input_data[0]?.name) {
            var id_2v_master_documents

            if (response.data.row_index) {
                id_2v_master_documents = response.data.row_index // make this key dynamic
            }
            else {
                var id_2v_master_documents = props.form_data.id_2v_master_document_names // make this key dynamic
            }

            const reponse2 = await services_data.access_job_seeker.general.firebase_upload({
                file_data: input_data[0],
                file_name: input_data[0].name.split(".")[0],
                file_path: process.env.FIREBASE_STORAGE_DIR_COMPANY + input_data[0].name.split(".")[0],
                id: id_2v_master_documents
            })


            await document.getElementById(props.main_name).click()
            await props.callback_reload_data({ ...props.form_data })
        } else {
            await document.getElementById(props.main_name).click()
            await props.callback_reload_data({ ...props.form_data })
        }



    }
    async function get_form_data(props, consolelog) {
        const { form_id } = props
        var object
        object = {};
        var form = document.getElementById(form_id)
        var formData = new FormData(form);
        formData.forEach(function (value, key) {
            object[key] = value;
        });
        var temp_checkbox_data = {}
        for (let index = 0; index < form.getElementsByClassName("checkbox_null").length; index++) {
            const checkbox_ele = form.getElementsByClassName("checkbox_null")[index];
            temp_checkbox_data[checkbox_ele.name] = checkbox_ele.checked
        }

        //sets db id in object if we are editing an existing row and not just creating a new row
        props?.editing?.key_name ? object[props.editing.key_name] = props?.editing?.data[props.editing.key_name] : null

        if (consolelog) {
            console.log("returned data: ", { ...object, ...temp_checkbox_data })
        }

        return { ...object, ...temp_checkbox_data }
    }
    if (data.all_data) {
        return body(data)
    }
    else {
        return <div></div>
    }
}
export default new_mm
