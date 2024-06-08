import React, { useEffect } from 'react';//TODO: clean this file
import { Route, Routes, Link } from 'react-router-dom';
import authRoutes from './routeItems'; // This is all the BASE routes that exist
import nonAuthRoutes from './nonAuthRoutes'; // This is all the BASE routes that exist

import Header from '../../sharedComponents/header/header';//TODO: why are these all in the sidebar folder?
import SidebarContent from '../../sharedComponents/Sidebar/sidebar';


import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { set, deleteData } from '../../_services_data/new redux';

import Error404 from '../../_routes/access_public/error404.jsx';





function App(props) {
  const reduxData = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("authed: ", props.auth)


  useEffect(() => {
    // If the user is authenticated and on a non-authenticated route, redirect to /access_job_seeker/dashboard
    const currentPath = location.pathname;

    if (props.auth) {
      //TODO: this still loads a 404 page. when user is changed from nonauth to auth and redirected to the dashboard
      const isNonAuthRoute = nonAuthRoutes.some(route => route.path == currentPath);
      if (isNonAuthRoute) {
        console.log("logged in on wrong route")
        navigate('/access_job_seeker/dashboard');
      }

      if (location.pathname == "/") {
        navigate('/access_job_seeker/dashboard');
      }
    }
    else {
      const isAuthRoute = authRoutes.some(route => route.path == currentPath);
      if (isAuthRoute) {
        console.log("logged out on wrong route")
        navigate('/login');
      }

      if (location.pathname == "/") {
        navigate('/login');
      }
    }
  }, [props.auth, location.pathname, navigate]);





  return <div className="main-wrapper">
    {
      props.auth && <Header
        reduxData={reduxData}
      />
    }

    <div>
      {
        props.auth ?
          <Routes>
            {authRoutes.map((route, key) => (
              <Route
                key={key}
                path={`/${route.path}/*`}
                match={route.path}
                element={<route.component {...props} base={route.path} />}
              />
            ))}



            <Route
              path='/*'
              element={<Error404></Error404>}
            ></Route>
          </Routes>
          :
          <Routes>
            {
              nonAuthRoutes.map((route, key) => {
                if (route.path == "Redirect") {
                  return <Route
                    key={key}
                    path={`/*`}
                    match={`/*`}
                    element={<route.component />}
                  />
                }
                return <Route
                  key={key}
                  path={`/${route.path}/*`}
                  match={route.path}
                  element={<route.component {...props} base={route.path} />}
                />
              }
              )
            }
          </Routes>
      }
    </div>
    {
      props.auth && <SidebarContent />
    }

  </div>
}

export default App;


