import React from 'react';
import GoogleLogin from 'react-google-login';
import Logo from '../../components/logo/Logo';

export default function Login() {
    function onLoginSuccess(response) {
        console.log(response);
    }

    return (
        <section>
            <Logo />
            <GoogleLogin clientId="139817711555-gre9cimukf1d3l3bfkd903ofbmdjrmd2.apps.googleusercontent.com" 
                         onSuccess={onLoginSuccess}
                         onFailure={err => console.log(err)}  />
        </section>
    );
}