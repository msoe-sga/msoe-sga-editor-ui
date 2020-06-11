import React from 'react';
import GoogleLogin from 'react-google-login';
import Logo from '../../components/logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setAuthToken, setAuthError } from '../../api/state/actions';
import Alert from 'react-bootstrap/Alert';

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const authError = useSelector(state => state.authError);

    function onLoginSuccess(response) {
        dispatch(setAuthToken(response.tokenId));
        dispatch(setAuthError(null));
        history.push('/editors');
    }

    return (
        <section>
            <Logo />
            {authError && (
                <Alert variant='danger'>
                    {authError}
                </Alert>
            )}
            <GoogleLogin clientId="139817711555-gre9cimukf1d3l3bfkd903ofbmdjrmd2.apps.googleusercontent.com" // TODO: Update this to a permanant client id and access it from the environment
                         onSuccess={onLoginSuccess}
                         onFailure={err => console.log(err)}  />
        </section>
    );
}