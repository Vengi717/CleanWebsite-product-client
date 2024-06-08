import React from "react";
import Select, { components } from 'react-select';






const customStyles = {
  placeholder: (base) => ({
    ...base,
    fontSize: '12px', // Adjust the font size for the placeholder text
  }),
};

export default ({ data = [], action, current, next, placeholderText, name, dataHook, clearValues, ...props }) => {
  const options = data.map(({ id = 0, label = 0 }) => {
    return {
      value: id,
      label: label,
      key: data[0]?.name + id,
    };
  });
 
  if (current == "deps") {
    return (
      <Select
       isClearable
       // components={() => ClearIndicator("deps")} // Use your custom ClearIndicator component

        required={props.required}
        isSearchable={true}
        placeholder={placeholderText}
        styles={customStyles} // Apply custom styles here
        name={name} // Use the name provided as a prop
        options={options}
        onChange={(selectedOption) => {
          if (typeof action === 'function') {
            action({ current, next, selectedOption })(selectedOption?.value);
          }
        }}
        value={dataHook?.selectedDepartment ? dataHook?.selectedDepartment : ""} // Set the selected option here

      />
    );
  }
  else if (current == "titles"){
    return <Select
    isClearable 
    //      components={() => ClearIndicator("titles")} // Use your custom ClearIndicator component

      required={props.required}
      isSearchable={true}
      placeholder={placeholderText}
      styles={customStyles} // Apply custom styles here
      name={name} // Use the name provided as a prop
      options={options}
      onChange={(selectedOption) => {
        if (typeof action === 'function') {
          action({ current, next, selectedOption })(selectedOption?.value);
        }
      }}
      value={dataHook?.selectedTitle ? dataHook?.selectedTitle : ""} // Set the selected option here

    />
  }
  else {
    return <Select
    isClearable 
    //      components={() => ClearIndicator("titles")} // Use your custom ClearIndicator component

      required={props.required}
      isSearchable={true}
      placeholder={placeholderText}
      styles={customStyles} // Apply custom styles here
      name={name} // Use the name provided as a prop
      options={options}
      onChange={(selectedOption) => {
        if (typeof action === 'function') {
          action({ current, next, selectedOption })(selectedOption?.value);
        }
      }}
      value={dataHook?.selectedTeamMembers ? dataHook?.selectedTeamMembers : ""} // Set the selected option here

    />
  }

};
