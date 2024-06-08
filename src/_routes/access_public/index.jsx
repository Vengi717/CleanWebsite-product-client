import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import routeItems from './ApplyJob/routeItems'
// import BaseUrlRouting from '../../_services/routing/baseUrlRouting' //TODO: maybe create something like this?
import permissionsService from '../../sharedServices/permissions'; // Update the import path

const PubicAccessRouter = ({ match, ...props }) => {
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
        let isMounted = true;
      
        async function main() {
          all_routes_and_components = addBaseURL(all_routes_and_components);
          const PermissibleRoutesArray = await permissionsService.GetPermissibleRoutes({
            all_routes_and_components,
            reduxData,
          });
          const PermissibleRoutesTemp = await permissionsService.createPermissibleRoutes({
            PermissibleRoutesArray,
            all_routes_and_components,
            baseUrl: props.base,
            props,
            reduxData,
            location,
          });
      
          if (isMounted) {
            setPermissibleRoutes(PermissibleRoutesTemp);
          }
        }
      
        main();
      
        return () => {
          isMounted = false;
        };
      }, [props.base, reduxData]);
      
    return PermissibleRoutes
};

export default PubicAccessRouter;
