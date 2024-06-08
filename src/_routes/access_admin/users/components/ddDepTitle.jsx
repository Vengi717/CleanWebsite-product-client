import React, { useState, useEffect } from 'react';
import Select from "../../../../sharedComponents/dependentDropdown/select";
import api from '../../../../_services_data/api/_handler';
import { useSelector } from 'react-redux';

function ddDepTitle(props) {
    const [data, setData] = useState({});
    const reduxData = useSelector((state) => state.data);

    useEffect(() => {
        const dbData = props.data;

        async function loadInitial() {
            const processedDeps = dbData.deps.map((item, index) => {
                item.id = item.id_department_master;
                item.label = item.department_name;
                return item;
            });

            const processedTitles = dbData.titles.map((item, index) => {
                item.id = item.id_master_title;
                item.label = item.title_name;
                item.deps = item.id_department_master;
                return item;
            });

            const newStruct = {
                deps: processedDeps,
                teamMembers: [],
                titles: [],
                source: { deps: processedDeps, titles: processedTitles, },
                sourceMap: { deps: 0, titles: 1 }
            };

            setData(newStruct);
        }

        if (Object.keys(dbData).length !== 0) {
            loadInitial();
        }
    }, [props.data]);

    const handleChange = params => ev => {
        const value = ev;
        const { current, next } = params;
        setNewValues({ value, current, next });
    };

    const setNewValues = ({ value, current, next }) => {

        if (current == "titles") {
            props.setselectedTitle(value)
        }
        else {
            props.setselectedTitle(null)
        }
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
            <div style={{ marginBottom: '10px', marginTop: '10px' }}>Designate Department & Title</div>
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
                                name="id_master_title"

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

            </div>
        </div>
    );
}

export default ddDepTitle;


