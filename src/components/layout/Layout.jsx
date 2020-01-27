import React from 'react';
import styles from './Layout.module.scss';

export function Header({ children }) {
    return (
        <section className={styles.header}>
            {children}
        </section>
    );
}