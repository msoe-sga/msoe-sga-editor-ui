import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageLayout from "./views/PageLayout";
import EditorsTable from './components/editors/EditorsTable';
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
                            <EditorsTable />
                        </PageLayout>
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}
