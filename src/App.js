import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageLayout from "./views/PageLayout";
import Editors from './components/editors/Editors';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './api/state/reducers';

const paths = {
    root: '/'
}

const store = createStore(allReducers);

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path={paths.root}>
                        <PageLayout>
                            <Editors />
                        </PageLayout>
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}
