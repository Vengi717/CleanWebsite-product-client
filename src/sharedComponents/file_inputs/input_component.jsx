//TODO: add popup for when the required input is not entered on submitting 
import React, { useState, useEffect } from "react";
import './drag_drop.css'
import File_prevewer from '../file_previewer'
import services from '../../_services/services'

function App(props) {


    const [service_functions, set_service_functions] = useState(null);
    var { multi, input_data, set_input_data, input_unique } = props//TODO: is required needed? Because if an input is being used it will likely already be required
    // const [input_data, set_input_data] = useState(null);
    //console.log("------ COMPONENT input loaded ------")

    const fileTypes = ['application/pdf, image/png, image/jpeg, image/jpg, text/html'];
    const all_props = {
        input_data,
        set_input_data,
        service_functions,
        set_service_functions,
        ...props
    }

    async function load_data() {
        var temp = await services.wrappers.testing.file_input()
        set_service_functions(await temp)
    }

    useEffect(() => {
        load_data()


    }, [input_data]);

    return (
        <div >
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossOrigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://mozilla.github.io/pdf.js/build/pdf.js"></script>
            <input
                accept={fileTypes}
                hidden
                type="file" id={"file_input" + input_unique}
                {
                ...multi ? { multiple: true } : { multiple: false }
                }
                onChange={(e) => {
                    e.preventDefault();
                    handle_file_change({ ...all_props, e })
                }

                } />
            <Body_selector
                {...all_props}
            />
        </div>
    )



    return <div></div>

}

const handle_file_change = function (props) {
    //console.log("---------------------- CHANGE")
    const { set_input_data, e, set_default_url } = props
    if (e.target.files && e.target.files[0]) {
        //files were stored in input
        set_input_data(e.target.files)
        set_default_url('')
    }
};

function handle_file_delete(props) {
    const { set_input_data, set_default_url, input_unique } = props


    set_default_url(null)
    document.getElementById("file_input" + input_unique).value = ''
    set_input_data({})
}

function Body_selector(props) {
    const { input_data, default_url } = props
    // console.log("f wtf : ", input_data)
    if (Object.keys(input_data)?.length != 0) {
        //    console.log("New file:", input_data)
        return <Componant_file_preview_table
            {...props} />
    }
    else if (default_url != '' && default_url != undefined) {
        //  console.log("Default file:", default_url)

        return <Componant_existing_file_preview
            {...props}
        />
    }
    else {
        //   console.log("select file")
        return <Componant_drag_and_drop
            {...props}
        />
    }
}

function Componant_drag_and_drop(props) {
    const { set_input_data, input_unique } = props
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    const style_drag_and_drop_text = {
        color: "#aaa",
        fontSize: "1.6em",
        textAlign: "center",
        padding: "85px 10px",
        cursor: "default"
    }
    // handle drag events
    const handleDrag = function (e) {


        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e) {

        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            //  handleFile(e.dataTransfer.files);
            //   console.log("this:::: ", e.dataTransfer.files)
            set_input_data(e.dataTransfer.files)

        }
    };
    return (
        <div id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault(e)}>
            <label id="label-file-upload" htmlFor="file_inputs" className={dragActive ? "drag-active" : ""}>
                <div>
                    <p style={style_drag_and_drop_text}>Drag & drop files here …
                        <br />
                        <label htmlFor={"file_input" + input_unique} className="btn add-btn" style={{ float: "none", backgroundColor: "#0d6efd", border: "#0d6efd" }}><i className="fa fa-plus" />Upload file</label>
                    </p>
                </div>
            </label>
            {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag}
                onDrop={handleDrop}
            ></div>}
        </div>
    );
}
//////// STYLES START
const style_body = {
    border: "1px solid #ddd",
    margin: "10px",
    borderRadius: "8px",
    //  width: '500px',
    height: '-webkit-fill-available',
}
const style_body_inner = {
    border: "1px dashed #aaa",
    borderRadius: "5px",
    padding: "10px",
    margin: "15px",
    width: "-webkit-fill-available",
    height: "300px",
    overflow: "scroll"
}
const card_file = {
    margin: "8px",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    boxShadow: "0 0 10px 0 rgb(0 0 0 / 20%)",
    padding: "6px",
    float: "left",
    textAlign: "center",
    width: "160px",
    height: "213px"
}
//////// STYLES END
function Componant_file_preview_table(props) {
    //console.log(">>")
    const { input_data, service_functions, set_input_data } = props


    var newd = []
    for (let index = 0; index < input_data?.length; index++) {
        const element = input_data[index];
        newd.push(element)
    }
    return <div >
        <div style={style_body}>
            <div style={style_body_inner}>
                {
                    newd?.map((file, index) => {
                        const file_url = URL.createObjectURL(file)
                        return <div
                            id={"input_key_" + index}
                            key={"input_key_" + index}
                            style={card_file}><div />
                            <Componant_card_file_f
                                service_functions={service_functions}
                                {...props}
                                data={file}
                                file_url={file_url} />
                        </div>
                    })
                }
            </div>
        </div>
        <div style={style_body}>
            <Componant_input_bar
                {...props}
            />
        </div>
    </div>
}

function Componant_existing_file_preview(props) {
    // console.log("##################")
    const { default_url } = props
    const file_url = default_url// URL.createObjectURL(default_url)
    var newd = []
    newd.push(file_url)
    return <div >
        <div style={style_body}>
            <div style={style_body_inner}>
                {
                    newd?.map((file, index) => {
                        return <div
                            id={"input_key_" + index}
                            key={"input_key_" + index}
                            style={card_file}><div />
                            <Componant_card_file_f data={file} file_url={file_url} {...props} />
                        </div>
                    })
                }

            </div>
        </div>
        <div style={style_body}>
            <Componant_input_bar
                file_url={file_url}
                {...props}
            />
        </div>
    </div>
}

function Componant_input_bar(props) {
    const { input_data, file_url, input_unique, can_delete } = props
    const Input_bar_info = {
        whiteSpace: "pre",
        display: "block",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        //   width: "160px",
        height: "15px",
        margin: "auto",
        textAlign: "center",
        fontSize: "11px",
        color: "#999",


        //   top: 11px;
        //    left: -200px;
        //   float: right;

        color: "rgb(153, 153, 153)",
        position: "relative",
        top: "11px",
        right: "3%",
        // right: "7px",
        float: "right"
        //  fontFamily: "'CircularStd', sans-serif"
    }






    return <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />

        <label htmlFor={"file_input" + input_unique} className="btn add-btn"
            style={{
                float: "none",
                backgroundColor: "#0d6efd",
                border: "#0d6efd",
                margin: "0px",
                borderRadius: "8px 0px 0px 8px",
                height: '38px'
                //     float: "right",
                //  borderRadius: "1px ,4px ,8px ,15px "
            }}
        >
            <i className='fa-solid fa-arrows-rotate'></i>
            Replace</label>


        {
            can_delete ?
                <label onClick={() => handle_file_delete({ ...props })} className="btn btn-outline-danger"
                    style={{
                        float: "none",
                        // backgroundColor: "#0d6efd",
                        //     border: "#0d6efd",
                        margin: "0px",
                        borderRadius: "0px 8px 8px 0px"
                        //     float: "right",
                        //  borderRadius: "1px ,4px ,8px ,15px "
                    }}
                >
                    <i className='fa fa-remove'></i>
                    {"  "} Remove</label>
                :
                null
        }







        <div style={Input_bar_info}>{

            input_data?.[0]?.name || !props.file_url ?
                input_data?.[0]?.name
                :
                file_url.split("%2F").pop().split("?alt")[0].replaceAll("%20", " ")//TODO: get full name and ext from firebase



        }</div>
    </div>



}

function Componant_card_file_f(props) {
    const { service_functions, file_url, data, input_data, input_unique
    } = props

    //console.log("props: ", props)

    const file_caption_info = {
        whiteSpace: "pre",
        display: "block",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "160px",
        height: "15px",
        margin: "auto",
        textAlign: "center",
        fontSize: "11px",
        color: "#999",
        //  position: "relative",
        top: "170px",
        right: "7px"
        //  fontFamily: "'CircularStd', sans-serif"
    }


    const tt = input_data[0]?.name
    // console.log("got this: ", tt)

    return <div style={{ height: "100%", }} >

        <div>

            <File_prevewer url={file_url}

                input_unique={input_unique} />
        </div>

        <div style={file_caption_info}>{
            data?.name ?
                data?.name
                :
                file_url.split("%2F").pop().split("?alt")[0].replaceAll("%20", " ")//TODO: get full name and ext from firebase

        }</div>
        <div style={file_caption_info}>{

            //      ("( " + data.size + "   " + "KB" + " )").toString()
            data?.size ?
                service_functions.functions.formatBytes(55555)
                : null//TODO: get the size for the file from firebase

        }</div>

    </div>
}

export default App


