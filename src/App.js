import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageLayout from "./views/layout/PageLayout";
import Login from './views/login/Login';
import EditorsTable from './elements/editors/EditorsTable';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './api/state/reducers';
import GoogleLogin from 'react-google-login';

const paths = {
    root: '/',
    editors: '/editors'
}

const store = createStore(allReducers);

function onLoginSuccess(response) {
    console.log(response);
}

export default function App() {
    return (
        <Provider store={store}>
            <GoogleLogin clientId="112125019226-r2f9eiejmqv1o6077ea7vtbanie22gfb.apps.googleusercontent.com" 
                         render={null}
                         onSuccess={onLoginSuccess} 
                         isSignedIn={false}
                         uxMode="redirect"
                         autoLoad={true} />
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path={paths.root}>
                        <Login />
                    </Route>
                    <Route exact={true} path={paths.editors}>
                        <PageLayout>
                            <EditorsTable />
                        </PageLayout>
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}
