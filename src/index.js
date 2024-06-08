import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Outlet, useLocation, useNavigate } from 'react-router-dom';

import jwtDecode from 'jwt-decode';
import "babel-polyfill";
import Main from "./_routes/Main_";
import { notification } from 'antd';
import { store, persistor } from './_services_data/new redux/store'; // Import your Redux store and persistor
import { logoutUser } from './_services_data/api/user_actions';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

function Index() {
  const reduxData = useSelector((state) => state.data);
  const token = reduxData.bearer;


  useEffect(() => {
    persistor.persist();
  }, []);

  return (
    <Main />
  );
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <Index />
    </PersistGate>
  </Provider>,

  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}