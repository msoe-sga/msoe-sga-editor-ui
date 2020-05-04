import React from 'react';
import { getAllEditors, createEditor, updateEditor, deleteEditor } from '../../api/editors';
import { useSelector, useDispatch } from 'react-redux';
import { setEditors } from '../../api/state/actions';
import { useTable, usePagination } from 'react-table';
import Modal from 'react-modal';
import styles from './EditorsTable.module.scss';
import Button from 'react-bootstrap/Button';

export default function EditorsTable() {
    const tableColumns = React.useMemo(() => [
        {
            Header: 'Editors',
            columns: [
                {
                    Header: "Name",
                    accessor: "name"
                },
                {
                    Header: "Email",
                    accessor: "email"
                }
            ]
        },
        {
          Header: () => null,
          id: 'edit',
          Cell: ({ row }) => (
            <Button variant="primary" onClick={() => editEditorRowOnClick(row)}>Edit</Button>
          )
        },
        {
          Header: () => null,
          id: 'delete',
          Cell: ({ row }) => (
            <Button variant="primary" onClick={() => deleteEditorRowOnClick(row)}>Delete</Button>
          )
        }
    ], []);

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

    const editors = useSelector(state => state.editors);
    const [isLoading, setIsLoading] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [initialPageIndex, setInitialPageIndex] = React.useState(0);

    const [isCreateEditorModalOpen, setIsCreateEditorModalOpen] = React.useState(false);
    const [createEditorModalName, setCreateEditorModalName] = React.useState('');
    const [createEditorModalEmail, setCreateEditorModalEmail] = React.useState('');
    const [createEditorModalErrorMessage, setCreateEditorModalErrorMessage] = React.useState(null);

    const [isEditEditorModalOpen, setIsEditEditorModalOpen] = React.useState(false);
    const [editEditorModalId, setEditEditorModalId] = React.useState(null);
    const [editEditorModalName, setEditEditorModalName] = React.useState('');
    const [editEditorModalEmail, setEditEditorModalEmail] = React.useState('');
    const [editEditorModalErrorMessage, setEditEditorModalErrorMessage] = React.useState(null);

    const [isDeleteEditorConfirmationModalOpen, setIsDeleteEditorConfirmationModalOpen] = React.useState(false);
    const [deleteEditorConfirmationModalId, setDeleteEditorConfirmationModalId] = React.useState(null);
    const [deleteEditorConfirmationModalName, setDeleteEditorConfirmationModalName] = React.useState('');

    const dispatch = useDispatch();

    if (isLoading) {
      getAllEditors(json => {
        if (json.error) {
          setErrorMessage(json.error);
        } else {
          dispatch(setEditors(json));
        }
        setIsLoading(false);
      });
    }

    const tableEditors = React.useMemo(() => editors.map(editor => {
      return {
        id: editor.id,
        name: editor.fields.Name,
        email: editor.fields.Email
      }
    }), [editors]);

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      state: { pageIndex, pageSize }
    } = useTable({
      columns: tableColumns,
      data: tableEditors,
      initialState: { pageIndex: initialPageIndex, pageSize: 10 }
    }, usePagination);

    function editEditorRowOnClick(row) {
      setEditEditorModalId(row.original.id);
      setEditEditorModalName(row.original.name);
      setEditEditorModalEmail(row.original.email);
      setIsEditEditorModalOpen(true);
    }

    function deleteEditorRowOnClick(row) {
      setDeleteEditorConfirmationModalId(row.original.id);
      setDeleteEditorConfirmationModalName(row.original.name);
      setIsDeleteEditorConfirmationModalOpen(true);
    }

    function openCreateEditorModal() {
      setCreateEditorModalName(null);
      setCreateEditorModalEmail(null);
      setIsCreateEditorModalOpen(true);
    }

    function onCreateEditorFormSubmit() {
      createEditor(createEditorModalName, createEditorModalEmail, json => {
        if (json.error) {
          setCreateEditorModalErrorMessage(json.error);
        } else {
          setInitialPageIndex(Math.floor((editors.length + 1) / pageSize));
          setIsLoading(true);
          setIsCreateEditorModalOpen(false);
        }
      });
    }

    function onEditEditorFormSubmit() {
      updateEditor(editEditorModalId, editEditorModalName, editEditorModalEmail, json => {
        if (json.error) {
          setEditEditorModalErrorMessage(json.error);
        } else {
          setInitialPageIndex(pageIndex);
          setIsLoading(true);
          setIsEditEditorModalOpen(false);
        }
      });
    }

    function deleteEditorOnClick() {
      deleteEditor(deleteEditorConfirmationModalId, json => {
        if (json.error) {
          setErrorMessage(json.error);
        } else {
          setInitialPageIndex(Math.floor((editors.length - 1) / pageSize));
          setIsLoading(true);
        }
        setIsDeleteEditorConfirmationModalOpen(false);
      });
    }

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading && 
              <div>
                {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                <table {...getTableProps()}>
                  <thead>
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                          <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                      prepareRow(row)
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <div className={styles.pagination}>
                  <Button variant="light" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                  </Button>{' '}
                  <Button variant="light" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                  </Button>{' '}
                  <Button variant="light" onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                  </Button>{' '}
                  <Button variant="light" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                  </Button>{' '}
                  <span>
                    Page{' '}
                      <strong>
                        {pageIndex + 1} of {pageOptions.length}
                      </strong>{' '}
                    </span>
                </div>
                <Button variant="primary" onClick={openCreateEditorModal} className={styles.createEditorButton}>Create Editor</Button>
                <Modal
                  isOpen={isCreateEditorModalOpen}
                  onRequestClose={() => setIsCreateEditorModalOpen(false)}
                  style={modalStyles}
                >
                  <h2>Create Editor</h2>
                  {createEditorModalErrorMessage && (
                    <div className={styles.errorMessage}>{createEditorModalErrorMessage}</div>
                  )}
                  <form onSubmit={onCreateEditorFormSubmit}>
                    <div className={styles.formControlContainer}>
                      <label>
                        Name: <input type="text" value={createEditorModalName} onChange={(event) => setCreateEditorModalName(event.target.value)} />
                      </label>
                    </div>
                    <div className={styles.formControlContainer}>
                      <label>
                        Email:
                        <input type="text" value={createEditorModalEmail} onChange={(event) => setCreateEditorModalEmail(event.target.value)} />
                      </label>
                    </div>
                    <span>
                      <Button variant="primary" className={styles.modalButton} type="submit">Save</Button>
                      <Button variant="primary" onClick={() => setIsCreateEditorModalOpen(false)}>Cancel</Button>
                    </span>
                  </form>
                </Modal>
                <Modal
                  isOpen={isEditEditorModalOpen}
                  onRequestClose={() => setIsEditEditorModalOpen(false)}
                  style={modalStyles}
                >
                  <h2>Edit Editor</h2>
                  {editEditorModalErrorMessage && (
                    <div className={styles.errorMessage}>{editEditorModalErrorMessage}</div>
                  )}
                  <form onSubmit={onEditEditorFormSubmit}>
                    <div className={styles.formControlContainer}>
                      <label>
                        Name: <input type="text" value={editEditorModalName} onChange={(event) => setEditEditorModalName(event.target.value)} />
                      </label>
                    </div>
                    <div className={styles.formControlContainer}>
                      <label>
                        Email: <input type="text" value={editEditorModalEmail} onChange={(event) => setEditEditorModalEmail(event.target.value)} />
                      </label>
                    </div>
                    <span>
                      <Button variant="primary" className={styles.modalButton} type="submit">Save</Button>
                      <Button variant="primary" onClick={() => setIsEditEditorModalOpen(false)}>Cancel</Button>
                    </span>
                  </form>
                </Modal>
                <Modal
                  isOpen={isDeleteEditorConfirmationModalOpen}
                  onRequestClose={() => setIsDeleteEditorConfirmationModalOpen(false)}
                  style={modalStyles}
                >
                  <h2>Delete Editor</h2>
                  <div className={styles.deleteConfirmationMessage}>Are you sure you want to delete the editor {deleteEditorConfirmationModalName}?</div>
                  <span>
                    <Button variant="primary" className={styles.modalButton} onClick={deleteEditorOnClick}>Yes</Button>
                    <Button variant="primary" onClick={() => setIsDeleteEditorConfirmationModalOpen(false)}>No</Button>
                  </span>
                </Modal>
              </div>}
        </div>
    );
}
