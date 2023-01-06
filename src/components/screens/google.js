import React from 'react';
import GoogleLogin from "react-google-login"


const google= ()=>{

    const responseSucessGoogle=(response)=>{
        
        console.log(response);
    }
    const responseErronGoogle=(response)=>{
        
    }
    return (
        <div>
            <h1>Login with google</h1>
            <GoogleLogin
             clientId="942886519953-22gib0dgm2nm8fnr7jb66gcp9b7mimh1.apps.googleusercontent.com"
            buttonText="Login with google"
            onSuccess={responseSucessGoogle}
            onFailure={responseErronGoogle}
            cookiePolicy={'single_host_origin'}
            />,
        </div>
    )
}


export default google;