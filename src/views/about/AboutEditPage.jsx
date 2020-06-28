import React from 'react';
import ReactMde from 'react-mde';
import styles from './AboutEditPage.module.scss';

export default function AboutEditPage() {
    const [value, setValue] = React.useState('');
    const [selectedTab, setSelectedTab] = React.useState('write');

    return (
        <div className={styles.editContainer}>
            <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                minEditorHeight={650}
             />
        </div>
    );
}
