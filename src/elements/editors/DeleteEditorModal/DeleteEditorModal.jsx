import React from 'react';
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './DeleteEditorModal.module.scss';
import { setEditors, setAuthError } from '../../../api/state/actions';
import { deleteEditor } from '../../../api/editors';


function DeleteEditorModal({ isModalOpen, closeModalMethod, setTableIndexMethod, editorName, editorId }) {
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

    function deleteEditorOnClick() {
      deleteEditor(editorId, authToken, json => {
        if (json.isAuthorized === false) {
          dispatch(setAuthError(json.error));
          history.push('/');
        } else if (json.error) {
          setErrorMessage(json.error);
        } else {
          setTableIndexMethod();
          const newEditors = editors.filter(editor => editor.id !== editorId).sort((a, b) => a.fields.Name.localeCompare(b.fields.Name));
          dispatch(setEditors(newEditors));
          closeModalMethod();
        }
      });
    }

    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModalMethod}
        style={modalStyles}
      >
        <h2>Delete Editor</h2>
        {errorMessage && (
            <div className="errorMessage">{errorMessage}</div>
        )}
        <div className={styles.deleteConfirmationMessage}>Are you sure you want to delete the editor {editorName}?</div>
        <span>
          <Button variant="primary" className="modalButton" onClick={deleteEditorOnClick}>Yes</Button>
          <Button variant="primary" onClick={closeModalMethod}>No</Button>
        </span>
      </Modal>
    );
}

DeleteEditorModal.propTypes = {
    isDeleteEditorConfirmationModalOpen: PropTypes.bool,
    closeModalMethod: PropTypes.func.isRequired,
    setTableIndexMethod: PropTypes.func.isRequired,
    editorName: PropTypes.string.isRequired,
    editorId: PropTypes.string
}

export default DeleteEditorModal;
