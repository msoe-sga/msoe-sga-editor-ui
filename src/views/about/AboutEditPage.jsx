import React from 'react';
import ReactMde from 'react-mde';
import styles from './AboutEditPage.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getAboutPage, editAboutPageOnMaster, editPageOnBranch } from '../../api/about';
import { getKramdownPreview } from '../../api/preview';
import { useHistory } from 'react-router-dom';
import { setAuthError } from '../../api/state/actions';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export default function AboutEditPage() {
    const [value, setValue] = React.useState('');
    const [ref, setRef] = React.useState(null);
    const [pullRequestUrl, setPullRequestUrl] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [selectedTab, setSelectedTab] = React.useState('write');
    const [showSaveSuccessfulAlert, setShowSaveSuccessfulAlert] = React.useState(false);
    const [readOnly, setReadOnly] = React.useState(false);
    
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
    
    function onSaveClick() {
        document.body.style.cursor = 'wait';
        setReadOnly(true);
        if (ref) {
            editPageOnBranch(authToken, value, ref, json => {
                if (json && json.isAuthorized === false) {
                    dispatch(setAuthError(json.error));
                    history.push('/');
                } else if (json.error) {
                    setError(json.error);
                } else {
                    setShowSaveSuccessfulAlert(true);
                }
                setReadOnly(false);
                document.body.style.cursor = 'default';
            });
        } else {
            editAboutPageOnMaster(authToken, value, json => {
                if (json.isAuthorized === false) {
                    dispatch(setAuthError(json.error));
                    history.push('/');
                } else if (json.error) {
                    setError(json.error);
                } else {
                    setRef(json.github_ref);
                    setPullRequestUrl(json.pull_request_url);
                    setShowSaveSuccessfulAlert(true);
                }
                setReadOnly(false);
                document.body.style.cursor = 'default';
            });
        }
    }

    return (
        <div>
            {pullRequestUrl && (
                <Alert variant='info'>This version of the page is currently pending review from the Secretary. You can still update this version of the page below and view review comments from the Secretary <Alert.Link href={pullRequestUrl}>here</Alert.Link>.</Alert>
            )}
            {error && (
                <Alert variant='danger'>{error}</Alert>
            )}
            {showSaveSuccessfulAlert && (
                <Alert variant='success' onClose={() => setShowSaveSuccessfulAlert(false)} dismissible>About Page Save Successfuly.</Alert>
            )}
            <div className={styles.editContainer}>
                <ReactMde
                    value={value}
                    onChange={setValue}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    minEditorHeight={650}
                    readOnly={readOnly}
                    loadingPreview="Loading..."
                    generateMarkdownPreview={markdown => getKramdownPreview(authToken, markdown)}
                 />
                <Button variant="primary" className={styles.aboutSubmitButton} onClick={onSaveClick}>Save</Button>
            </div>
        </div>
    );
}
