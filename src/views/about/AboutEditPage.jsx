import React from 'react';
import ReactMde from 'react-mde';
import styles from './AboutEditPage.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getAboutPage, getAboutPreview, editAboutPageOnMaster, editPageOnBranch } from '../../api/about';
import { useHistory } from 'react-router-dom';
import { setAuthError } from '../../api/state/actions';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export default function AboutEditPage() {
    const [value, setValue] = React.useState('');
    const [ref, setRef] = React.useState(null);
    const [pullRequestUrl, setPullRequestUrl] = React.useState(null);
    const [selectedTab, setSelectedTab] = React.useState('write');
    
    const authToken = useSelector(state => state.authToken);
    
    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect(() => {
        getAboutPage(authToken, json => {
            if (json.isAuthorized === false) {
                dispatch(setAuthError(json.error));
                history.push('/');
            }
            setValue(json.contents);
            setRef(json.github_ref);
            setPullRequestUrl(json.pull_request_url);
        });
    }, [authToken, dispatch, history]);
    
    function formSubmit() {
        if (ref) {
            editPageOnBranch(authToken, markdown, ref, json => {
                if (json.isAuthorized === false) {
                    dispatch(setAuthError(json.error));
                    history.push('/');
                }
            });
        } else {
            editAboutPageOnMaster(authToken, value, json => {
                if (json.isAuthorized === false) {
                    dispatch(setAuthError(json.error));
                    history.push('/');
                }
            });
        }
    }

    return (
        <form onSubmit={formSubmit}>
            {pullRequestUrl && (
                <Alert variant='info'>This version of the about page is currently under review <Alert.Link href={pullRequestUrl}>here</Alert.Link>.{' '}</Alert>
            )}
            <div className={styles.editContainer}>
                <ReactMde
                    value={value}
                    onChange={setValue}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    minEditorHeight={650}
                    generateMarkdownPreview={markdown => getAboutPreview(authToken, markdown)}
                 />
                <Button variant="primary" className="aboutSubmitButton" type="submit">Save</Button>
            </div>
        </form>
    );
}
