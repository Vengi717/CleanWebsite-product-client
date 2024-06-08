/*import * as React from "react";
  
const App = (props) => {


console.log("depts: ",depts)*/
import React, { useState, useEffect } from "react";
import Select from "react-select";
//import data from './data.json';

function App(props) {
    const [department, set_department] = useState(null);
    const [title, set_title] = useState(null);
    const [langList, setLangList] = useState([]);
    const depts = props.depts ? props.depts : []
    const titles = props.titles ? props.titles : []
    // handle change event of the department dropdown
    const set_dept_by_passing_option_data = (selected_option_data) => {
        set_department(selected_option_data);
        const filtered_titles = titles.filter(item => item.id_department_master === selected_option_data.id_department_master)
        setLangList(filtered_titles);
        set_title(null);
    };

    // handle change event of the language dropdown
    const set_title_by_passing_option_data = (selected_option_data) => {
        set_title(selected_option_data);
    };

    const [loaded, set_loaded] = useState(false);







    // generate the link when both dropdowns are selected
    useEffect(() => {
        if (!loaded & props.default_data.length != 0) {
            const dept_id = props.default_data[props.default_id_key_depts]
            const title_id = props.default_data[props.default_id_key_titles]
            const selected_dept = depts.find(ele => ele[props.default_id_key_depts] === dept_id)
            const selected_title = titles.find(ele => ele[props.default_id_key_titles] === title_id)
            set_dept_by_passing_option_data(selected_dept)
            set_title_by_passing_option_data(selected_title)
            set_loaded(true)
        }

    }, [department, title, props.depts, props.titles]);


    return [
        <div className="form-group" key={"fdfsf"}>  <b>Department</b>
            <Select
            required
                placeholder="Select Department"
                name={'department_name'}
                key={"fdfsf"}
                value={department}
                options={depts}
                onChange={set_dept_by_passing_option_data}
                getOptionLabel={x => x.department_name}
                getOptionValue={x => x.department_name}
            />
            <b>Title</b>
            <Select
             key={"fff"}
            name={'title_name'}
            required
                placeholder="Select Language"
                value={title}
                options={langList}
                onChange={set_title_by_passing_option_data}
                getOptionLabel={x => x.title_name}
                getOptionValue={x => x.title_name}
            />
        </div>
    ]
    
        return (
            <div className="App">
                <div style={{ width: 400, marginBottom: 20 }}>
                    <b>Department</b>
                    <Select
                        placeholder="Select Department"
                        value={department}
                        options={depts}
                        onChange={set_dept_by_passing_option_data}
                        getOptionLabel={x => x.department_name}
                        getOptionValue={x => x.department_name}
                    />
                    <br />
                    <b>Title</b>
                    <Select
                        placeholder="Select Language"
                        value={title}
                        options={langList}
                        onChange={set_title_by_passing_option_data}
                        getOptionLabel={x => x.title_name}
                        getOptionValue={x => x.title_name}
                    />
                </div>
            </div>
        );
}

export default App;