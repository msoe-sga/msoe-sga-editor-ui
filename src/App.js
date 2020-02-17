import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageLayout from "./views/PageLayout";

const paths = {
    root: '/'
}

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path={paths.root}>
                    <PageLayout />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
