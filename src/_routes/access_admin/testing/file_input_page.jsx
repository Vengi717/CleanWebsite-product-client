import React, { useState, useEffect } from 'react';

import File_input from '../../../sharedComponents/file_inputs/input_component'

function main() {
    var data
    const [input_data, set_input_data] = useState({});
    const [default_url, set_default_url] = useState('');

    useEffect(() => {//new 
        set_default_url("https://firebasestorage.googleapis.com/v0/b/hr-v2-79983.appspot.com/o/v2%2Fcompany%2Fmate2_2022-12-18%2018-11-57?alt=media&token=4697894d-b722-4cb5-83c5-044b051e4d2a")
        set_input_data({})

    }, [])

    return (
        <div className="page-wrapper">
            <div
                style={{ width: "1000px" }}>
                <File_input
                    default_url={default_url}
                    set_default_url={set_default_url}
                    input_unique="id_one"
                    input_data={input_data}
                    set_input_data={set_input_data}
                ></File_input>
            </div>
        </div >
    );
}



export default main
