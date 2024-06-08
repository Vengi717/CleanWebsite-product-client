
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import "../index.css"

const Welcome = (props) => {
  useEffect(() => {
  }, []);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Welcome - Utopia Tech PTY LTD</title>
        <meta name="description" content="Dashboard" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Welcome</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item active">Welcome features coming soon...</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}

      </div>
      {/* /Page Content */}
    </div>
  );
}

export default Welcome