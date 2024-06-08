import React, { useEffect } from 'react';

import Login from '../../_routes/access_public/loginpage'
import ApplyJob from '../../_routes/access_public/index'
import Register from '../../_routes/access_public/RegistrationPage'

import { useNavigate } from 'react-router-dom';

function Redirect() {
   const navigate = useNavigate();
   useEffect(() => {
      console.log("ffffff")
      navigate("/login");
   }, []); // Empty dependency array to run once on component mount

   return <></>;
}

export default [
   {
      path: '/applyjob',
      component: ApplyJob
   },
   {
      path: `/login`,
      component: Login
   },
   {
      path: `/register`,
      component: Register
   },
   {
      path: 'Redirect',
      component: Redirect,
   },
]