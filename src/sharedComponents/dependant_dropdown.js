//TODO: needs major refractoring

import React from 'react';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function process_prop_data(inputs) {
   // console.log("PROCESSED DATA: ", inputs)
    if (true) {
        var temp = []

        inputs.map((ele, index) => {
            if (index == 0) {
                ele.index = index,
                    ele.showing = ele.default_id ? ele.default_id : ele.data[0][ele.unique_id_name]
                temp.push(ele)
            }
            else {
                ele.index = index,
                    ele.showing = inputs[index - 1].showing,
                    temp.push(ele)
            }
        })

        return temp
    }
    else {
        var temp = []
        //  console.log(inputs)
        inputs.map((ele, index) => {
            if (index == 0) {



                ele.index = index,
                    ele.showing = ele.data[0][ele.unique_id_name],
                    temp.push(ele)
            }
            else {
                ele.index = index,
                    ele.showing = inputs[index - 1].showing,
                    temp.push(ele)
            }
        })
        return temp
    }

}







async function main(props) {

    const { inputs, old_dd_state_data, set_old_dd_state_data, job_editing_data, dd_changed, set_dd_changed } = props
  //  console.log("-------------------------------")
    // console.log("job_editing_data: ", job_editing_data)
    await initial_processing(inputs, job_editing_data)
    //console.log("processed data", processed_data)
    function objectsEqual(o1, o2) {
        if (o2 === null && o1 !== null) return false;
        return o1 !== null && typeof o1 === 'object' && Object.keys(o1).length > 0 ?
            Object.keys(o1).length === Object.keys(o2).length &&
            Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
            : (o1 !== null && Array.isArray(o1) && Array.isArray(o2) && !o1.length &&
                !o2.length) ? true : o1 === o2;
    }

    function initial_processing(inputs, job_editing_data) {//sets up the initial state for editing
        var new_whole_data = []
        inputs.map((whole_dropdown, index) => {
            // whole_dropdown.index = job_editing_data[whole_dropdown.unique_id_name]
            whole_dropdown.inputs = whole_dropdown.data
            whole_dropdown.showing = job_editing_data[whole_dropdown.unique_id_name] ? parseInt(job_editing_data[whole_dropdown.unique_id_name]) : undefined
            new_whole_data.push(whole_dropdown)
        })
        if (dd_changed == false) {
          //  console.log("aa")

            check_if_state_updated_required(new_whole_data)
        }
        else {
         //   console.log("bb")
            set_dd_changed(false)
        }
    }

    function check_if_state_updated_required(new_whole_data) {
        if (!objectsEqual(new_whole_data, old_dd_state_data)) {
       //.log("State Updated: ", new_whole_data)
            set_old_dd_state_data(new_whole_data)
        }
    }




    function selection_change(props) {
        const { event, title } = props
        // event.preventDefault()
        //    event.stopPropagation()
        const selected_dd_index = event.target.options[event.target.selectedIndex].id.split("dd_")[1].split("_")[0]
        const selected_option_index = event.target.options[event.target.selectedIndex].id.split("option_")[1]
        // console.log("fff: ", event.target.options[event.target.selectedIndex].id)
        //   console.log("selected_dd_index", selected_dd_index)
        //     console.log("selected_option_index", selected_option_index)

        var new_whole_data = old_dd_state_data
        new_whole_data[selected_dd_index].showing = parseInt(selected_option_index)

        set_dd_changed(true)
        // console.log("new_whole_data: ", ...new_whole_data)
        // check_if_state_updated_required(new_whole_data)
        set_old_dd_state_data([...new_whole_data])

    }


    var returned_array = []
    //if (processed_data?.inputs?.length != 0) {

    returned_array = await old_dd_state_data?.map((whole_dropdown, whole_dropdown_index) => {

        const selected_option_data = whole_dropdown.inputs.find(row => whole_dropdown.showing == row[whole_dropdown.unique_id_name])
        const selected_option_value = selected_option_data?.[whole_dropdown.name_name]
        //  console.log("selected_option_data", selected_option_data)
        //     console.log("selected_option_value ", selected_option_value)
        //   console.log("name id: ",whole_dropdown.name_name)
        return < div className="form-group" >
            <label>{whole_dropdown.title}</label>
            <select value={selected_option_value} name={whole_dropdown.id_name} onChange={(event) => selection_change({ title: event.target.value, event, changed_dropdown_index: whole_dropdown_index })} className="custom-select custom-select-sm">
                {
                    whole_dropdown.inputs.map((option_data, option_index) => {
                        const value = option_data[whole_dropdown.name_name]
                        const id = "dd_" + whole_dropdown_index + "_option_" + option_data[whole_dropdown.unique_id_name]
                        return < option value={value} id={id} key={id}>
                            {value}
                        </option>
                    })
                }

            </select>
        </div >
    })
    //  }

    return returned_array
}
export default main



/*
 const dd = old_dd_state_data.map((ele, index) => {//this is a dropdown
        var default_row = ""

        if (changed_ == false & ele.default_id) {
            // console.log("not changed")
            ele.default_id ?
                default_row = ele.data.find(row => ele.default_id == row[ele.unique_id_name])
                :
                null
            return < div className="form-group" >
                <label>{ele.title}</label>
                <select value={default_row[ele.name_name]} name={ele.id_name} onChange={(e) => selection_changed(e, index)} className="custom-select custom-select-sm">
                    {
                        ele.data.map((ele_, index_) => {
                            console.log("data1: ", ele_)

                            const id = ele.unique_id_name + '_' + getRandomInt(999)//ele_[ele.unique_id_name]

                            return <option value={ele_[ele.name_name]} id={id} key={id}>
                                {ele_[ele.name_name]}
                            </option>

                              if (index == 0) {//if the first dropdown then 
                                  console.log("data: ",ele_)
                                  return <option value={ele_[ele.name_name]} id={id} key={id}>
                                      {ele_[ele.name_name]}
                                  </option>
                              }
                              else if (ele.showing == ele_[ele.depenant_on_id_name]) {
                                  return <option value={ele_[ele.name_name]} id={id} key={id}>
                                      {ele_[ele.name_name]}
                                  </option>
                              }
                            }
                            )
                        }
                    </select>
                </div>
            }
            else {
    
    
                const temp = changed_
                set_changed(false)
                // console.log("changed",temp)
    
                var default_option
                ele.showing != 0 ?
                    default_option = ele.data.find(row => ele.default_id == row[ele.unique_id_name])
                    :
                    null
                return < div className="form-group" >
                <label>{ele.title}</label>
                <select value={default_row[ele.name_name]
            
    
    
                console.log("---------------------------------------")
                // console.log("was changed: ", ele)
                console.log("default option: ", default_option)
                console.log("name: ", ele.id_name)
                console.log("name: ", default_option?.[ele.id_name])
    
                return < div className="form-group" >
                    <label>{ele.title}</label>
                    <select value={default_option?.[ele.id_name]} name={ele.id_name} onChange={(e) => selection_changed(e, index)} className="custom-select custom-select-sm">
                        {
                            ele.data.map((ele_, index_) => {
                                const id = ele.unique_id_name + '_' + getRandomInt(999)//+ ele_[ele.unique_id_name]
    
    
                                return <option value={ele_[ele.name_name]} id={id} key={id}>
                                    {ele_[ele.name_name]}
                                </option>
    
                                
                                if (index == 0) {//if the first dropdown then 
                                      return <option value={ele_[ele.name_name]} id={id} key={id}>
                                          {ele_[ele.name_name]}
                                      </option>
                                  }
                                  else if (ele.showing == ele_[ele.depenant_on_id_name]) {
                                      return <option value={ele_[ele.name_name]} id={id} key={id}>
                                          {ele_[ele.name_name]}
                                      </option>
                                  }
                                 
                            }
                            )
                        }
                    </select>
                </div>
            }
    
        })
*/