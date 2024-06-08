import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

function Error404() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(-1); // Navigate back to the previous route
    };

    useEffect(() => {

        
     /*   notification.error({
            message: 'Error!',
            description: "Page Does not Exist or Incorrect access level",
            duration: 5
        });*/
    }, []); 

    return (
        <div className="main-wrapper">
            <Helmet>
                <title>Error 404 - Utopia Tech PTY LTD</title>
                <meta name="description" content="Login page" />
            </Helmet>
            <div className="error-box">
                <h1>404</h1>
                <h3><i className="fa fa-warning" /> Oops! Page not found!</h3>
                <p>The page you requested was not found. Or you have the incorrect access level.</p>
                <button onClick={handleNavigate} className="btn btn-custom">Go back</button>
            </div>
        </div>
    );
}

export default Error404;
