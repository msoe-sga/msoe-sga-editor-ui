import React from 'react';
import ReactMde from 'react-mde';
import styles from './MarkdownEditPage.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getJekyllItem, editJekyllItem, getKramdownPreview } from '../../api/jekyll-items';
import { useHistory } from 'react-router-dom';
import { setAuthError } from '../../api/state/actions';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export default function MarkdownEditPage({ type, filePath}) {
    const [item, setItem] = React.useState(null);
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
        getJekyllItem(authToken, type, filePath, json => {
            if (json.isAuthorized === false) {
                dispatch(setAuthError(json.error));
                history.push('/');
            }
            setItem(json);
            setValue(json.contents);
            setRef(json.github_ref);
            setPullRequestUrl(json.pull_request_url);
        });
    }, [authToken, dispatch, history, type, filePath]);
    
    function onSaveClick() {
        document.body.style.cursor = 'wait';
        setReadOnly(true);

        const newItem = Object.assign({}, item)
        newItem.contents = value;
        editJekyllItem(authToken, type, ref, newItem, json => {
            if (json.isAuthorized === false) {
                dispatch(setAuthError(json.error));
                history.push('/');
            } else if (json.error) {
                setError(json.error);
            } else {
                if (!ref) {
                    setRef(json.github_ref);
                    setPullRequestUrl(json.pull_request_url);
                }
                setItem(newItem);
                setShowSaveSuccessfulAlert(true);
            }
            setReadOnly(false);
            document.body.style.cursor = 'default';
        });
    }

    return (
        <div>
            {pullRequestUrl && (
                <Alert variant='info'>This version of the {type} is currently pending review from the Secretary. You can still update this version of the {type} below and view review comments from the Secretary <Alert.Link href={pullRequestUrl}>here</Alert.Link>.</Alert>
            )}
            {error && (
                <Alert variant='danger'>{error}</Alert>
            )}
            {showSaveSuccessfulAlert && (
                <Alert variant='success' onClose={() => setShowSaveSuccessfulAlert(false)} dismissible>{type} Saved Successfuly.</Alert>
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
