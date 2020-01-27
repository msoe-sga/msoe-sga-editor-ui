import React from 'react';
import styles from './Sidebar.module.scss';

export default function Sidebar({ children }) {
    return (
        <section className={styles.sidebar}>
            {children}
        </section>
    );
}