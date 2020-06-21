import React from 'react';
import Header from '../../components/header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './PageLayout.module.scss';
import Logo from '../../components/logo/Logo';

export default function PageLayout({ children }) {
    return (
        <>
            <Header>
                <Logo />
            </Header>
            <section className={styles.pageLayoutContainer}>
                <Sidebar />
                {children}
            </section>
        </>
    );
}