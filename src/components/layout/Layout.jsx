import React from 'react';
import * as styles from './Layout.scss';

export function Header({ children }) {
    return (
        <section className={styles.header}>
            {children}
        </section>
    );
}