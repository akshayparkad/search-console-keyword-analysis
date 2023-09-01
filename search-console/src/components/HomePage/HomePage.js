import "./HomePage.css";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode'


const CLIENT_ID = "836550600225-hrhhe3jdtop88qf44l3u8mv9s6ondlku.apps.googleusercontent.com";
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

const HomePage = () => {
    var navigate = useNavigate();

    const [userObj, setUserObj] = useState({});

    const [tokenClient, setTokenClient] = useState({});

    function handleCallbackResponse(response) {
        console.log("Encoded: " + response.credential);
        var userObject = jwt_decode(response.credential);
        setUserObj(userObject);
        console.log(userObject);
    }

    function createToken() {
        tokenClient.requestAccessToken();
    }


    useEffect(() => {

        /* global google  */

        google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );


        //Getting Access Token using tokenClient;

        setTokenClient(
            google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPE,
                callback: (tokenResponse) => {
                    //we get the live token to access any google api
                    console.log(tokenResponse);
                }

            }));

        google.accounts.id.prompt();

    }, [])




    return (
        <div style={{ minHeight: "100vh", minWidth: "700px", height: "auto" }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "6fr 6fr",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div className="signInImage">
                    <div
                        style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                        }}
                    >
                        <h1 style={{ textShadow: "1px 1px #2c3e50" }}>
                            E-Vehicle Charging
                        </h1>
                        <p style={{ fontSize: "18px", textAlign: "center" }}>
                            Join now and track e-vehicle charging station and book your slot in advance!
                        </p>
                    </div>
                </div>
                <div>
                    <div className="container-signin">
                        <h1 style={{ textAlign: "center", textShadow: "1px 1px #2c3e50" }}>
                            Sign In
                        </h1>

                        <div id='signInDiv'>
                            {
                                userObj &&

                                navigate('/dashboard')
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
