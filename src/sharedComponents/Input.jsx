import React from "react";
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
export const handleInputChangeClass = (evt, setState) => {
    const field = evt.target.name;
    const fieldVal = evt.target.value;

    // set the state
    setState(state => ({
        ...state,
        [field]: fieldVal
    }));
}

export default function Input({  input, handleChange, name, children, type, value, readOnly, classes, required, key_ }) {
    //  console.log("here", value)
    //  console.log("required", required)
    const ran = getRandomInt(99999999)//TODO: remove the need for this. currently, without this, when updating data in db, it will not set the default values in the modal correctly
    key_ = ran
    //console.log("key_", key_)
    if (required) {
        return (
            <div className="form-group">
                {children}
                {!input ?
                    <input
                        id={key_}
                        style={{ minWidth: "max-content" }}
                        key={key_}
                        type={type}
                        name={name}
                        className={`form-control ` + classes}
                        onChange={handleChange}
                        readOnly={readOnly}
                        defaultValue={value}
                        required
                    />
                    :
                    <textarea
                        id={key_}

                        key={key_}
                        type={type}
                        name={name}
                        onChange={handleChange}
                        defaultValue={value}
                        // value={value}
                        rows={4}
                        className={`form-control ` + classes}
                        required
                    ></textarea>
                }
            </div>
        );
    } else {
        return (
            <div className="form-group">
                {children}
                {!input ?
                    <input
                        key={key_}
                        type={type}
                        name={name}
                        className={`form-control ` + classes}
                        onChange={handleChange}
                        readOnly={readOnly}
                        defaultValue={value}
                    />
                    :
                    <textarea
                        key={key_}
                        name={name}
                        onChange={handleChange}
                        defaultValue={value}
                        rows={4}
                        className={`form-control ` + classes}
                    />
                }
            </div>
        );
    }


}