import React from 'react';
import styles from './Logo.module.scss';

export default function Logo() {
    return (
        <section>
            <img alt="Logo" src={logo} className={styles.logo}></img>
            <h1>MSOE Student Government Website Editor</h1>
        </section>
    );
}
