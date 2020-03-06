import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const paths = {
    editors: {
        path: '/',
        displayText: 'Editors'
    }
};

export default function Sidebar() {
    return (
        <div className={styles.sidebarContainer}>
            {Object.keys(paths).map(path => {
                const toPath = `${paths[path].path}`;
                return (
                    <Link
                        to={toPath}
                        key={path}
                    >
                        <span>{paths[path].displayText}</span>
                    </Link>
                );
            })}
        </div>
    );
}
