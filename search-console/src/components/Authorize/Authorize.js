import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import './Authorize.css'

const CLIENT_ID = '836550600225-hrhhe3jdtop88qf44l3u8mv9s6ondlku.apps.googleusercontent.com';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

function Authorize({setComponent}) {

    const [authorized, setAuthorized] = useState(false);
    const [tokenClient, setTokenClient] = useState({});
    const [bool, setBool] = useState(false);


    useEffect(()=>{

        if(sessionStorage.getItem('token')){
            setAuthorized(true);
        }

    },[bool])

   

    function createToken() {
        tokenClient.requestAccessToken();
    }

    function revoke() {
        sessionStorage.removeItem('token');
        setAuthorized(false);
    }

    useEffect(() => {

        /* global google */

        const google = window.google;
        //Getting Access Token using tokenClient;

        setTokenClient(
            google?.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPE,
                callback: (tokenResponse) => {
                    //we get the live token to access any google api
                    console.log(tokenResponse.access_token);
                    sessionStorage.setItem('token', `Bearer ${tokenResponse.access_token}`);
                    setBool(!bool);
                }

            }));

    }, [])


    return (
        <div className='inner-component'>
            <div className='authorization-header-box'>
                <h3>To gain access to your data, please authorize your Google Search Console account.</h3>

                {
                    authorized ?

                        <button className="authorize-btn" onClick={revoke}>Revoke Authorization</button>
                        :
                        <button className="authorize-btn" onClick={createToken}>Authorize</button>

                }

            </div>

        </div>
    )
}

export default Authorize