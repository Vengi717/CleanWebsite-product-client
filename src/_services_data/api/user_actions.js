import handler from './_handler'
import { notification } from 'antd';
import { set } from '../new redux';
import { useNavigate } from 'react-router-dom';


export async function login({ userData, dispatch, navigate, reduxData }) {
    const data = userData
    const route = `login`;
    // const delay = ms => new Promise(res => setTimeout(res, ms));
    return await handler
        ({ data, route ,reduxData})
        .then(async (response) => {
            if (response.success) {
                await dispatch(set("bearer", response.data.token));
                await dispatch(set("id_user", response.data.id_user));
        //        await navigate("/access_job_seeker/dashboard")
               // await navigate("/access_job_seeker/dashboard")
            } else {

                const errorMessage = `${JSON.stringify(response.error)}`;
                console.log(errorMessage);
                notification.error({
                    message: 'Failed!',
                    description: errorMessage,
                    duration: 5,
                });

                return false

            }
        })
        .catch((e) => {
            console.log("error: ", e)

        });
}

export async function logoutUser({ dispatch, navigate }) {
    await dispatch(set("bearer", ""));
    await dispatch(set("id_user", ""));
    await navigate("/login")
}



