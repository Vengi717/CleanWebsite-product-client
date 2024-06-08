import React, { useState, useEffect } from 'react';
import permissionsService from '../../sharedServices/permissions'; // Update the import path
import { useDispatch, useSelector } from 'react-redux';
import routeItems from './routeItems'
// import BaseUrlRouting from '../../_services/routing/baseUrlRouting' //TODO: maybe create something like this?

const AdminRoute = ({ match, ...props }) => {

    const [PermissibleRoutes, setPermissibleRoutes] = useState(null);
    const reduxData = useSelector((state) => state.data);
    var all_routes_and_components = routeItems

    function addBaseURL(routesArray) {
        return routesArray.map((routeObj) => ({
            route: props.base + "/" + routeObj.route,
            component: routeObj.component,
        }));
    }

    useEffect(() => {
        all_routes_and_components = addBaseURL(all_routes_and_components);
        async function main() {
            const PermissibleRoutesArray = await permissionsService.GetPermissibleRoutes({
                all_routes_and_components,
                reduxData
            });
            const PermissibleRoutesTemp = await permissionsService.createPermissibleRoutes({
                PermissibleRoutesArray,
                all_routes_and_components,
                baseUrl: props.base,
                props,
                reduxData,
                location
            });
            setPermissibleRoutes(PermissibleRoutesTemp);
        }
        if (reduxData.bearer) {
            main()

        }
    }, [props.base, reduxData]);

    return PermissibleRoutes
};

export default AdminRoute;





/*import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Team_member_all from './team_members/team_members_all';

const AdminRoute = ({ match }) => {
    const all_routes_and_components = [
        {
            path: 'team_members_other_profile/:id',
            element: <team_members_other_profile />,
        },
        {
            path: 'team_members_all',
            element: <Team_member_all />,
        },
    ];

    return (
        <Routes>
            {all_routes_and_components.map((route, index) => (
                <Route
                    key={index}
                    path={`${match.url}/${route.path}`}
                    element={route.element}
                />
            ))}
            <Navigate to={`${match.url}/welcome`} replace />
        </Routes>
    );
};

export default AdminRoute;
*/


