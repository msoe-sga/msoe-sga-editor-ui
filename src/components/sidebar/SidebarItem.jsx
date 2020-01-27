import React from 'react';
import styles from './SidebarItem.module.scss';

export default function SidebarItem(props) {
    return (
        <section className={styles.sidebarItem}>
            {props.text}
        </section>
    );
}