import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageLayout from "./views/PageLayout";
import EditorsTable from './components/editors/EditorsTable';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './api/state/reducers';
import GoogleLogin from 'react-google-login';

const paths = {
    root: '/'
}

const store = createStore(allReducers);

function onLoginSuccess(response) {
    console.log(response);
}

export default function App() {
    return (
        <Provider store={store}>
            <GoogleLogin clientId="112125019226-r2f9eiejmqv1o6077ea7vtbanie22gfb.apps.googleusercontent.com" onSuccess={onLoginSuccess} isSignedIn={true} />
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path={paths.root}>
                        <PageLayout>
                            <EditorsTable />
                        </PageLayout>
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}
