import React from 'react';
import styles from './Header.module.scss';

export default function Header({ children }) {
    return (
        <section className={styles.header}>
            {children}
        </section>
    );
}