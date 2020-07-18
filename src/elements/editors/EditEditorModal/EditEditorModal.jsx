import React from 'react';
import Modal from 'react-modal';
import styles from './EditEditorModal.module.scss';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createEditor, updateEditor } from '../../../api/editors';
import { setEditors, setAuthError } from '../../../api/state/actions';

function EditEditorModal({ isModalOpen, closeModalMethod, setTableIndexMethod, modalTitle, editorId, initialEditorName, initialEditorEmail, newEditor }) {
    const modalStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
    };
    
    const dispatch = useDispatch();
    const history = useHistory();
    
    const authToken = useSelector(state => state.authToken);
    const editors = useSelector(state => state.editors);

    const [errorMessage, setErrorMessage] = React.useState(null);
    const [editorName, setEditorName] = React.useState(initialEditorName);
    const [editorEmail, setEditorEmail] = React.useState(initialEditorEmail);

    React.useEffect(() => {
        setEditorName(initialEditorName);
        setEditorEmail(initialEditorEmail);
    }, [initialEditorName, initialEditorEmail]);

    function formSubmit() {
      if (newEditor) {
        createEditor(editorName, editorEmail, authToken, json => {
          if (json.isAuthorized === false) {
            dispatch(setAuthError(json.error));
            history.push('/');
          } else if (json.error) {
            setErrorMessage(json.error);
          } else {
            setTableIndexMethod();
            let newEditors = editors;
            newEditors.push(json);
            newEditors = newEditors.sort((a, b) => a.name.localeCompare(b.name));
            dispatch(setEditors(newEditors)); 
            closeModalMethod();
          }
        });
      } else {
        updateEditor(editorId, editorName, editorEmail, authToken, json => {
          if (json.isAuthorized === false) {
            dispatch(setAuthError(json.error));
            history.push('/');
          } else if (json.error) {
            setErrorMessage(json.error);
          } else {
            setTableIndexMethod();
            let newEditors = editors.filter(editor => editor.id !== editorId);
            newEditors.push(json);
            newEditors = newEditors.sort((a, b) => a.name.localeCompare(b.name));
            dispatch(setEditors(newEditors)); 
            closeModalMethod();
          }
        });
      }
    }

    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModalMethod}
        style={modalStyles}
      >
        <h2>{modalTitle}</h2>
        {errorMessage && (
          <div className="errorMessage">{errorMessage}</div>
        )}
        <form onSubmit={formSubmit}>
          <div className={styles.formControlContainer}>
            <label>
              Name: <input type="text" value={editorName} onChange={(event) => setEditorName(event.target.value)} />
            </label>
          </div>
          <div className={styles.formControlContainer}>
            <label>
              Email: <input type="text" value={editorEmail} onChange={(event) => setEditorEmail(event.target.value)} />
            </label>
          </div>
          <span>
            <Button variant="primary" className="modalButton" type="submit">Save</Button>
            <Button variant="primary" onClick={closeModalMethod}>Cancel</Button>
          </span>
        </form>
      </Modal>
    );
}

EditEditorModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModalMethod: PropTypes.func.isRequired,
    setTableIndexMethod: PropTypes.func.isRequired,
    modalTitle: PropTypes.string.isRequired,
    editorId: PropTypes.string,
    initialEditorName: PropTypes.string.isRequired,
    initialEditorEmail: PropTypes.string.isRequired,
    newEditor: PropTypes.bool.isRequired 
}

export default EditEditorModal;
