import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

const CLIENT_ID = "836550600225-hrhhe3jdtop88qf44l3u8mv9s6ondlku.apps.googleusercontent.com";
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

function CooperAuth() {

    const [tokenClient, setTokenClient] = useState({});

    function handleCallbackResponse (response){
        console.log("Encoded: " + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
    }

    function createToken (){
            tokenClient.requestAccessToken();
    }

    useEffect(()=>{

             /* global google  */ 

            google.accounts.id.initialize({
                client_id : CLIENT_ID,
                callback : handleCallbackResponse
            });

            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                {theme: "outline", size : "large"}
            );


             //Getting Access Token using tokenClient;

            setTokenClient( 
            google.accounts.oauth2.initTokenClient({
                client_id : CLIENT_ID,
                scope: SCOPE,
                callback: (tokenResponse) =>{
                    //we get the live token to access any google api
                    console.log(tokenResponse);
                }
        
            }) );

            google.accounts.id.prompt();
        
    }, [])

    
  return (
    <>
        <div id='signInDiv'>
            
        </div>

        <button type='submit' onClick={createToken} >Create Token</button>

    </>
  )
}

export default CooperAuth