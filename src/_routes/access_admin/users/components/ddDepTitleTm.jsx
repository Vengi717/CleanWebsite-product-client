import React, { useState, useEffect } from 'react';
import Select from "../../../../sharedComponents/dependentDropdown/select";
import api from '../../../../_services_data/api/_handler';
import { useSelector } from 'react-redux';

function ddDepTitleTm(props) {
    const [data, setData] = useState({});
    const reduxData = useSelector((state) => state.data);

    useEffect(() => {
        const dbData = props.data;

        async function loadInitial() {
            const processedDeps = dbData.deps.map((item, index) => {
                item.id = item.id_department_master;
                item.label = item.department_name;
                item.name = "departmentId11";
                return item;
            });

            const processedTitles = dbData.titles.map((item, index) => {
                item.id = item.id_master_title;
                item.label = item.title_name;
                item.deps = item.id_department_master;
                item.name = "titleId";
                return item;
            });

            const processedTeamMembers = dbData.teamMembers.map((item, index) => {
                item.id = item.id_user;
                item.label = item.first_name;
                item.titles = item.id_master_title;
                item.name = "reportToId";
                return item;
            });

            const newStruct = {
                deps: processedDeps,
                teamMembers: [],
                titles: [],
                source: { deps: processedDeps, titles: processedTitles, teamMembers: processedTeamMembers },
                sourceMap: { deps: 0, titles: 1, teamMembers: 2 }
            };

            setData(newStruct);
        }

        if (Object.keys(dbData).length !== 0) {
            loadInitial();
        }
    }, [props]);

    const handleChange = params => ev => {
        const value = ev;
        const { current, next } = params;
        setNewValues({ value, current, next });
    };

    const setNewValues = ({ value, current, next }) => {
        const { source } = data;
        const newData = source[next];
        if (newData) {
            setData((prevData) => ({
                ...prevData,
                [next]: newData.filter(el => el[current] === Number(value))
            }));
        }
        clearValues(next);
    };

    const clearValues = next => {
        const { sourceMap } = data;
        const nextKey = sourceMap[next];

        Object.entries(sourceMap)
            .filter(([_, value]) => value > nextKey)
            .forEach(([key]) => {
                setData((prevData) => ({
                    ...prevData,
                    [key]: [],
                }));
            });
    };

    return (
        <div>
            <div style={{ marginBottom: '10px' }}>Report To</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        {data.deps?.length > 0 && (
                            <Select
                                key={JSON.stringify(data.deps)}
                                data={data.deps}
                                action={handleChange}
                                current="deps"
                                next="titles"
                                placeholderText="department.."
                            />
                        )}
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        {data.titles?.length > 0 ? (
                            <Select
                                key={JSON.stringify(data.titles)}
                                data={data.titles}
                                action={handleChange}
                                current="titles"
                                next="teamMembers"
                                placeholderText="title.."

                            />
                        ) : (
                            <Select data={[]}
                                placeholderText="title.."

                            />
                        )}
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        {data.teamMembers?.length > 0 ? (
                            <Select
                                key={JSON.stringify(data.teamMembers)}
                                data={data.teamMembers}
                                current="teamMembers"
                                action={handleChange}
                                placeholderText="team member.."
                                name="reportsTo"


                            />
                        ) : (
                            <Select data={[]}
                                placeholderText="team member.."
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ddDepTitleTm;







/*import { Container } from "../../../../sharedComponents/dependentDropdown/container";
import { Section } from "../../../../sharedComponents/dependentDropdown/section";
import Select from "../../../../sharedComponents/dependentDropdown/select";
import React, { useState, useEffect, useRef, Component } from 'react';
import api from '../../../../_services_data/api/_handler'
import { useDispatch, useSelector } from 'react-redux';

function ddDepTitleTm(props) {
    const [data, setData] = useState({});
    const reduxData = useSelector((state) => state.data);



    useEffect(() => {
        const dbData = props.data // await api({ data: { only_active: false }, route: 'AccessAdminUsersTeamMembers', reduxData })
        console.log(dbData)
        async function loadinital() {

            const processedDeps = dbData.deps.map((item, index) => {
                item.id = item.id_department_master
                item.label = item.department_name
                item.name = "departmentId"
                return item
            })

            const processedTitles = dbData.titles.map((item, index) => {
                item.id = item.id_master_title
                item.label = item.title_name
                item.deps = item.id_department_master
                item.name = "titleId"

                return item
            })

            const processedTeamMembers = dbData.teamMembers.map((item, index) => {
                item.id = item.id_user

                item.label = item.first_name
                item.titles = item.id_master_title
                item.name = "reportToId"
                return item
            })
            const newStruct = {
                deps: processedDeps,
                teamMembers: [],
                titles: [],
                source: { deps: processedDeps, titles: processedTitles, teamMembers: processedTeamMembers },
                sourceMap: { deps: 0, titles: 1, teamMembers: 2 }
            }
            setData(newStruct)
        }

        if (Object.keys(dbData) != 0) {
            loadinital()

        }
    }, [props]);


    const handleChange = params => ev => {
        console.log(params)
        const value = ev;
        const { current, next } = params;
        setNewValues({ value, current, next });
    };

    const setNewValues = ({ value, current, next }) => {
        const { source } = data;
        const newData = source[next];
        if (newData) { // Update references to newData
            setData((prevData) => ({
                ...prevData,
                [next]: newData.filter(el => el[current] === Number(value))
            }));
        }

        clearValues(next);
    };


    const clearValues = next => {
        const { sourceMap } = data;
        const nextkey = sourceMap[next];

        //  console.log("before: ", tempData)

        Object.entries(sourceMap)
            .filter(([_, value]) => value > nextkey)
            .forEach(([key]) => {
                setData((prevData) => ({
                    ...prevData,
                    [key]: [],
                }));
            })
    };

    return (
        <div>
            <div className="form-group">
                <label>{"Department"}</label>
                {data.deps?.length > 0 && (
                    <Select
                        key={JSON.stringify(data.deps)}
                        data={data.deps}
                        action={handleChange}
                        current="deps"
                        next="titles"
                    />
                )}
            </div>
            <div className="form-group">
                <label>{"Title"}</label>

                {data.titles?.length > 0 ? (
                    <Select
                        key={JSON.stringify(data.titles)}
                        data={data.titles}
                        action={handleChange}
                        current="titles"
                        next="teamMembers"
                    />
                )
                    :
                    <Select
                        data={[]}
                    />

                }  </div>
            <div className="form-group">
                <label>{"Team Member"}</label>
                {data.teamMembers?.length > 0 ? (
                    <Select
                        key={JSON.stringify(data.teamMembers)}
                        data={data.teamMembers}
                        current="teamMembers"
                        action={handleChange}

                    />
                )
                    :
                    <Select
                        data={[]}
                    />
                }  </div>
        </div>
    )
}


export default ddDepTitleTm;*/