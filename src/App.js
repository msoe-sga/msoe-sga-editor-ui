import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageLayout from "./views/layout/PageLayout";
import Login from './views/login/Login';
import EditorsTable from './elements/editors/EditorsTable/EditorsTable';
import MarkdownEditPage from './views/markdown/MarkdownEditPage';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import persistedReducer from './api/state/reducers';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const paths = {
    root: '/',
    editors: '/editors',
    about: '/about'
}

const store = createStore(persistedReducer);
const persistor = persistStore(store)

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
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
                                <MarkdownEditPage
                                    type="page"
                                    filePath = "about.md"
                                 />
                            </PageLayout>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}
