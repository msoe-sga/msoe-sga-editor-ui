import React from 'react';
import styles from './Header.module.scss';

export function Header({ children }) {
    return (
        <section className={styles.header}>
            {children}
        </section>
    );
}