
import React, { useState, useEffect } from 'react';
import permissionsService from '../../sharedServices/permissions'; // Update the import path
import { useDispatch, useSelector } from 'react-redux';
import routeItems from './routesItems'
// import BaseUrlRouting from '../../_services/routing/baseUrlRouting' //TODO: maybe create something like this?

const JobseekersRoute = ({ match, ...props }) => {
    
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
        main()
    }, [props.base,reduxData]);

    return PermissibleRoutes
};

export default JobseekersRoute;
