import React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import Editors from '../editors/Editors';
import { getAllEditors } from '../../api/editors';

const paths = {
    editors: {
        path: 'editors',
        displayText: 'Editors',
        onClick: (setLocalState) => {
            setLocalState(null); // Do this to clear view when switching
            getAllEditors(json => {
                setLocalState(json);
            })
        }
    }
};

export default function SidebarRouter() {
    const { url, path } = useRouteMatch();
    const [switchContent, setSwitchContent] = React.useState(null);

    return (
        <div>
            <div>
                {Object.keys(paths).map(path => {
                    const toPath = `${url}/${paths[path].path}`;
                    return (
                        <Link
                            to={toPath}
                            key={path}
                            onClick={
                                () => paths[path].onClick(setSwitchContent)
                            }
                        >
                            <span>{paths[path].displayText}</span>
                        </Link>
                    );
                })}
            </div>
            <Switch>
                <Route exact={true} path={`${path}/${paths.editors.path}`}>
                    <Editors editors={switchContent} />
                </Route>
            </Switch>
        </div>
    );
}
