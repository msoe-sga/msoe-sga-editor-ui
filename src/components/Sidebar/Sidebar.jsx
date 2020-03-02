import React from 'react';
import { Link } from 'react-router-dom';
import { getAllEditors } from '../../api/editors';

const paths = {
    editors: {
        path: '/',
        displayText: 'Editors',
        onClick: (setLocalState) => {
            setLocalState(null); // Do this to clear view when switching
            getAllEditors(json => {
                setLocalState(json);
            })
        }
    }
};

export default function Sidebar() {
    const [switchContent, setSwitchContent] = React.useState(null);

    return (
        <div>
            <div>
                {Object.keys(paths).map(path => {
                    const toPath = `${paths[path].path}`;
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
        </div>
    );
}
