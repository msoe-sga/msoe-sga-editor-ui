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
            <GoogleLogin clientId="112125019226-r2f9eiejmqv1o6077ea7vtbanie22gfb.apps.googleusercontent.com" 
                         onSuccess={onLoginSuccess}
                         onFailure={err => console.log(err)}  />
        </section>
    );
}