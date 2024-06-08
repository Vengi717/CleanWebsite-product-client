import services_data from '../_services_data'
import { notification } from 'antd';

const dev = true//TODO: move this to the env


export async function main(route, requestOptions) {
  let response = {};
  return new Promise(function (resolve, reject) {
    var route_full = process.env.DEV_APIENDPOINT + "/" + route;
    if (!dev) {
      route_full = process.env.PROD_APIENDPOINT + "/" + route;
    }


    fetch(route_full, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        response = result;
        resolve(result);
      })
      .catch((error) => {
        const errorMessage = `URL: ${route_full}\nroute: ${route}\nerror: \n${error}`;
        console.log(errorMessage);

        notification.error({
          message: 'Failed!',
          description: errorMessage,
          duration: 5,
        });
      });
    return response;
  });
}

async function object_size(object) {
  // This returns the size of a given object
  Object.size = async function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  return await Object.size(object);
}

export default async function api_post({ data, route, notif, reduxData }, showRequestOptions) {
  if (!reduxData) {
    console.log("api_post without reduxdata passed for api: ", route)

  }

  /* console.log("*************************")
 
   console.log("route", route)
 
   console.log("data", data)
   console.log("*************************")
 */


  var myHeaders = new Headers(); // Use the browser's Headers class
  let response = {};
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded', 'x-api-key: ZMOPlb6Yyj23kp7NkvyzO3YQX5aDCAEt1GzufVbQ');//TODO: put key in env
  var urlencoded = new URLSearchParams(); // Use the browser's URLSearchParams class
  const object_sizea = await object_size(data);
  for (let index = 0; index < object_sizea; index++) {
    const key = Object.keys(data)[index];
    const value = Object.values(data)[index];

    if (key !== 'token' || (key == 'token' && value)) {
      urlencoded.append(key.toString(), value?.toString());
    }
  }



  data.auth = reduxData.bearer //services_data.access_public.general.get_bearer()

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow',

  };

  if (showRequestOptions) {
    console.log("API: ", route)
    console.log("requestOptions: ", requestOptions)

  }




  await main(route, requestOptions)
    .then((_response) => {
      response = { ..._response };
      if (notif) {
        if (response.success) {
          notification.success({
            message: 'Success!',
            description: response.api,
            duration: 5,
          });
        } else {

          notification.error({
            message: 'Failed!',
            description: response.api,
            duration: 5,
          });
        }
      }
    })
    .catch((_error) => {
      response = { ..._error };
    });

  return response;
}
