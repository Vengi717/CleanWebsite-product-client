import React from 'react';
import api from '../_services_data/api/_handler.js';
import { Route, Routes } from 'react-router-dom';
import Error404 from '../_routes/access_public/error404.jsx';
import TestDashboard from '../_routes/access_job_seeker/job_seeker_dashboard.jsx'


export default class {
    constructor() {
        console.log("This page loads. It is old, I think.");
      }

    static GetPermissibleRoutes({ all_routes_and_components, reduxData }) {
    if (!all_routes_and_components[0].route) {//this is the sidebar calling 
        all_routes_and_components = all_routes_and_components.map(url => ({
            route: url,
            component: () => { } // Replace with your component function or component reference
        }));
    }

    const requestedRoutes = processAll_routes_and_components(all_routes_and_components);
    function processAll_routes_and_components(routesArray) {
        return routesArray.map((routeObj) => `${routeObj.route}`);
    }
    async function setDBBlockedRoutesWithUserAccess({ dbBlockedRoutesTemp, userPermissionsTemp }) {
        const dbBlockedRoutesWithUserAccessTemp = [];
        const dbBlockedRoutesWithoutUserAccessTemp = [];

        dbBlockedRoutesTemp.forEach((dbRoute) => {

            const matchingPermission = userPermissionsTemp.find((permission) => permission.url === dbRoute.url);

            if (matchingPermission && matchingPermission.read) {
                dbBlockedRoutesWithUserAccessTemp.push(dbRoute);
            } else {
                dbBlockedRoutesWithoutUserAccessTemp.push(dbRoute);
            }
        });

        return {
            dbBlockedRoutesWithUserAccessTemp,
            dbBlockedRoutesWithoutUserAccessTemp,
        };
    }

    async function setRequestedRoutesWithAccess({ dbBlockedRoutesWithoutUserAccessTemp, requestedRoutes }) {
        const RequestedRoutesWithAccess = requestedRoutes.filter((requestedRoute) =>
            dbBlockedRoutesWithoutUserAccessTemp.every((blockedRoute) => requestedRoute !== blockedRoute.url)
        );

        return RequestedRoutesWithAccess;
    }

    async function getDBdata(reduxData) {
        /*   const data = {
               auth: reduxData.bearer,
           };*/


        const dbBlockedRoutesTemp = await api({ data: {}, route: 'getPermissionsMaster', reduxData })
            .then((response) => {
                if (response.success) {
                    return response.data;
                }
                return [];
            })
            .catch((e) => {
                console.log('Unhandled Error: ', e);
                return [];
            });

        var userPermissionsTemp = []
        if (reduxData.bearer != "") {
            userPermissionsTemp = await api({ data: {}, route: 'getUserPermission', reduxData })
                .then((response) => {
                    if (response.success) {
                        return response.data.module_permission;
                    }
                    return [];
                })
                .catch((e) => {
                    console.log('Unhandled Error: ', e);
                    return [];
                });
        }



        const { dbBlockedRoutesWithUserAccessTemp, dbBlockedRoutesWithoutUserAccessTemp } = await setDBBlockedRoutesWithUserAccess({
            dbBlockedRoutesTemp,
            userPermissionsTemp,
        });


        const RequestedRoutesWithAccess = await setRequestedRoutesWithAccess({
            dbBlockedRoutesWithoutUserAccessTemp,
            requestedRoutes,
        });



        return RequestedRoutesWithAccess;
    }

    // Return RequestedRoutesWithAccess
    return getDBdata(reduxData);
}

    //TODO: make this the only thing needed to be called to create the routes. currently we need to call GetPermissibleRoutes then pass the results to this. instead this function should call GetPermissibleRoutes and use its reulsts directly in this function

    static createPermissibleRoutes({ reduxData, PermissibleRoutesArray, all_routes_and_components, baseUrl, props }) {
    const matchingRoutes = all_routes_and_components.filter((route) =>
        PermissibleRoutesArray.includes(`${route.route}`)
    );

    return (
        <Routes>
            {matchingRoutes.map((route, index) => {
                const pathParts = route.route.split('/');
                const newPath = pathParts.slice(2).join('/');
                return (
                    <Route
                        key={index}
                        path={newPath}
                        element={<route.component {...props} />} // Render the component associated with the route
                    />
                );
            })}
            <Route
                path={"/*"}
                element={<Error404 />} // Render the component associated with the route
            />
        </Routes>
    );
}
}