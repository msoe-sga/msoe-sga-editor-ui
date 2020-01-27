import React from 'react';
import { Header } from '../components/layout/Layout';
import * as styles from './PageLayout.scss';
const logo = require('../assets/logo.png');

export default function PageLayout() {
    return (
        <>
            <Header>
                <img alt="Logo" src={logo} className={styles.logo}></img>
                <h1>MSOE Student Government Website Editor</h1>
            </Header>
        </>
    );
}