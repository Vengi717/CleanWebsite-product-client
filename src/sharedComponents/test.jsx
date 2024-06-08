
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';


export default function company_list() {
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            console.log("does this actually get called?")
            await axios.get(`/company/master/v1`)
                .then(res => setData(res.data.data))
                .catch(err => console.log(err)
                );
        })();
    }, []);
    return  data?.map((row, index) => {
        return    <option id={"company_"+row.id} >{row.company_name}</option>
    })
}