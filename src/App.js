import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageLayout from "./views/layout/PageLayout";
import Login from './views/login/Login';
import EditorsTable from './elements/editors/EditorsTable';
import AboutEditPage from './views/about/AboutEditPage';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './api/state/reducers';

const paths = {
    root: '/',
    editors: '/editors',
    about: '/about'
}

const store = createStore(allReducers);

export default function App() {
    return (
        <Provider store={store}>
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
                    <Route exact={true} path={paths.about}>
                        <PageLayout>
                            <AboutEditPage />
                        </PageLayout>
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}
