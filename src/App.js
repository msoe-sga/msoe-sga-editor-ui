import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageLayout from "./views/layout/PageLayout";
import Login from './views/login/Login';
import EditorsTable from './elements/editors/EditorsTable';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './api/state/reducers';
import PostListPage from './elements/posts/PostListPage';
const paths = {
    root: '/',
    editors: '/editors',
    posts: '/posts',
    editpost: '/posts/edit'
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

                    <Route exact={true} path={paths.posts}>
                        <PageLayout>
                            <PostListPage/>
                        </PageLayout>
                    </Route>

                    <Route exact={true} path={paths.editpost}>
                        <PageLayout>
                            <div>you can edit your post soon</div>
                        </PageLayout>
                    </Route>

                </Switch>
            </BrowserRouter>
        </Provider>
    );
}
