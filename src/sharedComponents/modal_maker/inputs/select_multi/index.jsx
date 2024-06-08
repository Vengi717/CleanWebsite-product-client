//TODO: requires refractoring/redoing

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../../style.css'
function input_(props) {
    const { data, index, multi_select_data, set_multi_select_data } = props

    const [multi_select_dataaa, set_multi_select_dataaa] = useState([]);

    const [return_state, set_return_state] = useState(null);



    useEffect(() => {
        set_multi_select_data({})
        set_multi_select_dataaa([])
        set_return_state(MULTISELECT(data, index))
    }, [data])

    useEffect(() => {
        set_return_state(MULTISELECT(data, index))
    }, [multi_select_dataaa])




    function update_multi_select_data(selected_array, id, key, data) {
        var temp = multi_select_data
        var new_ids = []
        selected_array.map(ele => {
            new_ids.push(ele[id])
        })
        temp[key] = new_ids
        set_multi_select_data(temp)
        var aaaa = filter_(data)
        set_multi_select_dataaa(aaaa)
    }

    function filter_(data) {
        var tempother = []
        Object.entries(multi_select_data).map((ele, index) => {
            if (index != 0) {
                tempother.push(...ele[1])
            }
        })
        const filtered = data?.filter((data, index) => tempother.includes(data.id_2v_master_document_names))
        //  console.log(filtered)

        return filtered
    }

    function MULTISELECT(data, index_) {

        if (!(data.name_name in multi_select_data)) {
            var temp = multi_select_data
            temp[data.name_name] = null

        }
        // key={data.title + index_} id={"dropdown-containera"} className="dropdown-containera"
        return <div id={"dropdown-containera"} className="dropdown-containera">
            <label style={{ textAlign: 'left' }}>{data.title} </label>
            <Select
                className="dropdown"
                placeholder="Select Option"
                value={multi_select_dataaa}
                getOptionLabel={(option) => option.document_name}
                getOptionValue={(option) => option.id_2v_master_document_names}
                options={data.data} // set list of the data
                isMulti
                onChange={(ele) => update_multi_select_data(ele, data.id_name, data.title, data.data)}
            />
        </div>
    }









    return <div>{return_state}</div>

}





export default input_
