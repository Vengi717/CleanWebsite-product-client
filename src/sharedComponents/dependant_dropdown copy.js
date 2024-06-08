//TODO: needs major refractoring

import React from 'react';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function process_prop_data(inputs, set_changed) {
    console.log("PROCESSED DATA: ", inputs)
    set_changed(false)
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

function main(props) {
    const { inputs, state_data, set_state_data, changed_, set_changed } = props

    if (state_data.length == 0)//|| state_data != processed_data) {
    {
        set_state_data(process_prop_data(inputs, set_changed))
    }

    var changed = false
    inputs.map((new_dropdown, new_dropdown_index) => {
        if (new_dropdown?.default_id != state_data?.[new_dropdown_index]?.default_id) {
            changed = true
        }
    })

    if (changed) {
        console.log("hhhhhhhhhhhhhhhhhhhh")
        set_state_data(process_prop_data(inputs, set_changed))
    }


    function selection_changed(e, current_dropdown_index) {
        var temp = state_data
        const selected_index = e.target.selectedIndex
        const selected_element = e.target.options[selected_index]
        const department_id = parseInt(selected_element.id.split("_").pop())
        set_changed(selected_element.value)

        if (temp[current_dropdown_index + 1]) {
            temp[current_dropdown_index + 1].showing = department_id
            //      temp.changed = true
            //  console.log("qqqqqq: ", temp)
            set_state_data([...temp])
        }
    }
    const dd = state_data.map((ele, index) => {//this is a dropdown


        var default_option_data
        ele.showing != 0 ?
            default_option_data = ele.data.find(row => ele.default_id == row[ele.unique_id_name])
            :
            null

console.log("")



    })
    return dd
}
export default main



/*
 const dd = state_data.map((ele, index) => {//this is a dropdown
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