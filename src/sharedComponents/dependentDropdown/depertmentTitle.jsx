import React, { useState, useEffect } from 'react';
import Select from "../../ss../../sharedComponents/dependentDropdown/select";
import { useSelector } from 'react-redux';

function ddDepTitle(props) {
    const [data, setData] = useState({});
    const reduxData = useSelector((state) => state.data);
    const [loading, setLoading] = useState(true);

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
                sourceMap: { deps: 0, titles: 1 },
                selectedTitle: props.initialTitleValue,
                selectedDepartment: props.initialDepartmentValue,

            };

            setData(newStruct);
        }

        async function main() {
            if (Object.keys(dbData).length !== 0 && !dbData.loading) {
                await loadInitial();
            }
        }
        main()

    }, [props.data]);



    useEffect(() => {
        if (props.data.department_info && loading) {
            setLoading(false)
            defaultsSelected()
        } else if (props.reload && loading == false) {
            props.setReload(false)
            defaultsSelected()
        }
    }, [data]);


    async function defaultsSelected() {
        await simulateDropdownValueDep()
        await simulateDropdownValueDepTitle()
    }



    const simulateDropdownValueDep = () => {//simulate clicking option
        const selectedValue = props.data.department_info.id_department_master
        const params = {
            current: "deps",
            next: "titles",
            selectedOption: { value: selectedValue, label: props.data.department_info.department_name }, // Provide the label as needed
            inital: true
        };
        handleChange(params)(selectedValue);
    };
    const simulateDropdownValueDepTitle = () => {//simulate clicking option
        const selectedValue = props.data.title_info.id_master_title
        const params = {
            current: "titles",
            next: "",
            selectedOption: { value: selectedValue, label: props.data.title_info.title_name }, // Provide the label as needed
            inital: true
        };
        handleChange(params)(selectedValue);
    };





    const handleChange = params => ev => {
        if (ev == undefined) {//is being cleared

            if (params.current == "deps") {
                setData((prevData) => ({
                    ...prevData,
                    selectedDepartment: {},
                    selectedTitle: {}
                }));
                props.setselectedTitle(null)

            } else {
                setData((prevData) => ({
                    ...prevData,
                    selectedTitle: {}
                }));
                props.setselectedTitle(null)

            }



            clearValues(params.current);
        }
        else {
            const value = ev;
            const { current, next, selectedOption, inital } = params;
            setNewValues({ value, current, next, selectedOption, inital });
        }

    };

    const setNewValues = ({ value, current, next, selectedOption, inital }) => {


        if (current == "titles") {
            props.setselectedTitle(value)
        }
        else {
            props.setselectedTitle(null)
        }



        if (current == "deps" && !inital) {
            setData((prevData) => ({
                ...prevData,
                selectedDepartment: {
                    value: value,
                    label: selectedOption.label
                },
                selectedTitle: {}
            }));
            props.setselectedTitle(null)

        }
        else if (current == "deps" && inital) {
            setData((prevData) => ({
                ...prevData,
                selectedDepartment: {
                    value: value,
                    label: selectedOption.label
                }
            }));
        }
        else if (current == "titles") {
            setData((prevData) => ({
                ...prevData,
                selectedTitle: {
                    value: value,
                    label: selectedOption.label
                    //  key: data[0]?.name + id,
                }
            }));
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


    useEffect(() => {
        if (data.sourceMap && data?.selectedDepartment?.value) {
            handleChange({ current: "deps", next: "titles", selectedOption: data.selectedDepartment, inital: true })(data.selectedDepartment.value);
        }

    }, [data.source]);

    return (
        <div>

            <div style={{ marginBottom: '10px', marginTop: '10px' }}>{props.title}</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        {data.deps?.length > 0 && (
                            <Select
                                //   name={"id_master_title"}
                                clearValues={clearValues}
                                required={props.required}
                                key={JSON.stringify(data.deps)}
                                data={data.deps}
                                dataHook={data}
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
                                required={props.required}
                                clearValues={clearValues}

                                name={props.name}
                                dataHook={data}

                                key={JSON.stringify(data.titles)}
                                data={data.titles}
                                action={handleChange}
                                current="titles"
                                next="teamMembers"
                                placeholderText="title.."
                            />
                        ) : (
                            <Select data={[]}
                                required={props.required}

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


