import React from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.scss';

const paths = {
    editors: {
        path: '/editors',
        displayText: 'Editors'
    },
    about: {
        path: '/about',
        displayText: 'Edit About Page'
    }
};

export default function Sidebar() {
    return (
        <Nav className="col-md-12 d-none d-md-block bg-primary sidebar">
            {Object.keys(paths).map(path => {
                const href = `${paths[path].path}`;
                return (
                    <Nav.Item>
                        <Nav.Link href={href}>{paths[path].displayText}</Nav.Link>
                    </Nav.Item>
                );
            })}
        </Nav>
    );
}
