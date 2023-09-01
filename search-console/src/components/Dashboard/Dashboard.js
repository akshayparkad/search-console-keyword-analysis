import "./DashBord.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Authorize from "../Authorize/Authorize";
import Analysis from "../Analysis/Analysis";
import { verifyToken } from "../Service";

const CLIENT_ID = "836550600225-hrhhe3jdtop88qf44l3u8mv9s6ondlku.apps.googleusercontent.com";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

export default function DashBord() {

    const [userObj, setUserObj] = useState({});
    const [tokenClient, setTokenClient] = useState({});
    const [component, setComponent] = useState("authorize");
    const [bool, setBool] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    

    function callComponent(value) {
        setComponent(value);
    }

    const handleChildTrigger = () => {
        setBool(!bool);
    };


    const verifyUserToken = async () => {

        const { data } = await verifyToken();
        console.log(data.status);
        if (data.status !== 'ok') {
            sessionStorage.removeItem('jwt-token');
            navigate('/login');
        }
    }

    useEffect(() => {

        verifyUserToken();

    }, [bool])

    const user_name = location?.state?.name;

    const logout = () => {
        sessionStorage.clear();
        verifyUserToken();
    }

    // function handleCallbackResponse(response) {
    //     console.log("Encoded: " + response.credential);
    //     var userObject = jwt_decode(response.credential);
    //     setUserObj(userObject);
    //     console.log(userObject);
    // }

    // function createToken() {
    //     tokenClient.requestAccessToken();
    // }

    // useEffect(() => {
    //     /* global google  */

    //     google.accounts.id.initialize({
    //         client_id: CLIENT_ID,
    //         callback: handleCallbackResponse,
    //     });

    //     google.accounts.id.renderButton(document.getElementById("signInDiv"), {
    //         theme: "outline",
    //         size: "large",
    //     });

    //     //Getting Access Token using tokenClient;

    //     setTokenClient(
    //         google.accounts.oauth2.initTokenClient({
    //             client_id: CLIENT_ID,
    //             scope: SCOPE,
    //             callback: (tokenResponse) => {
    //                 //we get the live token to access any google api
    //                 console.log(tokenResponse);
    //             },
    //         })
    //     );

    //     // google.accounts.id.prompt();
    // }, []);

    return (
        <div className="dashboard">
            <div className="sidebar-dashboard">
                <div className="sidebar-header-dashboard">
                    <h3 className="mx-5 px-1">Dashbord</h3>
                </div>
                <ul className="sidebar-menu-dashboard d-flex flex-column justify-content-between align-items-left">
                    <div>

                        <li onClick={() => {
                            callComponent('authorize')
                        }}>
                            <i className="fas fa-user-edit"></i>
                            Authorize
                        </li>

                        <li onClick={() => {
                            callComponent('analysis')
                        }}>
                            <i className="fas fa-user-edit"></i>
                            Data Analysis
                        </li>

                        <li>
                            <i className="fas fa-user-edit"></i>
                            Change Password
                        </li>

                    </div>


                    <div>
                        
                        <li className="d-flex gap-2 align-items-center" onClick={logout}>
                            <i className="fas fa-sign-out-alt"></i>
                            Logout
                        </li>
                    </div>
                </ul>
            </div>
            <div className="content-dashboard" style={{ overflowY: "scroll" }}>
                <header className="dashboard-header">
                    <div className="header-left-dashboard">
                        <div className="header-logo-dashboard">
                            <img src="logo.png" alt="Logo" />
                        </div>
                    </div>
                    <div className="header-right-dashboard">
                        <div class="header-user-dashboard">
                            <span class="header-label-dashboard">Welcome, {user_name}</span>
                            <button class="header-button-dashboard">
                                <i class="fas fa-user"></i>
                            </button>
                        </div>
                    </div>
                </header>
                <div>

                    <div>
                        {component == "analysis" ? (
                            <Analysis setComponent={setComponent} handleChildTrigger={handleChildTrigger} />)

                            : component == "authorize" ? (
                                <Authorize setComponent={setComponent} handleChildTrigger={handleChildTrigger} />

                            ) : null}
                    </div>

                </div>
            </div>
        </div>
    );
}
