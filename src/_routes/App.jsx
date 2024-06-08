// App.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Authentication
import LoginPage from './access_public/loginpage';
import jwtDecode from 'jwt-decode';
import { logoutUser } from '../_services_data/api/user_actions';



import { Provider, useDispatch, useSelector } from 'react-redux';



// TODO: remove jquery at some point
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
import Routing from '../_services/routing'



function App() {
    const navigate = useNavigate();

    const reduxData = useSelector((state) => state.data);
    const token = reduxData.bearer;
    const location = useLocation();
    const authenticated = token != ""//TODO: this needs to send the token to the server to see if its authentic
    const dispatch = useDispatch();



    useEffect(() => {
        // Use a try-catch block to handle any errors from persistor.persist()
        const checkToken = async () => {
            try {
                setIsReady(true); // Set isReady to true when the store is ready
                if (token) {
                    const decodedToken = jwtDecode(token);
                    if (decodedToken.exp * 1000 < Date.now()) {
                        logoutUser({ dispatch, navigate });
                        //   await navigate("/login");
                    }
                }
            } catch (error) {
                console.error("Error during store rehydration:", error);
                setIsReady(true); // Set isReady to true even if there's an error
            }
        };

        checkToken();
    }, []);


    const [isReady, setIsReady] = useState(false); // State to track if the store is ready

    if (!isReady) {
        // If the store is not ready yet, you can show a loading indicator or splash screen
        return <div>Loading...</div>; // You can replace this with your custom loading component
    }




    if (!authenticated) {
        return <Routing auth={false} />
    }

    return (
        <Routing auth={true} />
    );
}

export default App;