import React from 'react';
import { Header } from '../components/layout/Layout';
import Sidebar from '../components/Sidebar/Sidebar';
import styles from './PageLayout.module.scss';
import logo from '../assets/logo.png';

export default function PageLayout({ children }) {
    return (
        <>
            <Header>
                <img alt="Logo" src={logo} className={styles.logo}></img>
                <h1>MSOE Student Government Website Editor</h1>
            </Header>
            <Sidebar />
            {children}
        </>
    );
}