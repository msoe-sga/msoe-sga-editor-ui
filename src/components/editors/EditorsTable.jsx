import React from 'react';
import { getAllEditors, createEditor, updateEditor } from '../../api/editors';
import { useSelector, useDispatch } from 'react-redux';
import { setEditors } from '../../api/state/actions';
import { useTable, usePagination } from 'react-table';
import Modal from 'react-modal';
import styles from './EditorsTable.module.scss';

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
            <button onClick={() => editEditorRowOnClick(row)}>Edit</button>
          )
        },
        {
          Header: () => null,
          id: 'delete',
          Cell: ({ row }) => (
            <button onClick={() => deleteEditorRowOnClick(row)}>Delete</button>
          )
        }
    ], []);

    const editors = useSelector(state => state.editors);
    const [isLoading, setIsLoading] = React.useState(true);

    const [isCreateEditorModalOpen, setIsCreateEditorModalOpen] = React.useState(false);
    const [createEditorModalName, setCreateEditorModalName] = React.useState(null);
    const [createEditorModalEmail, setCreateEditorModalEmail] = React.useState(null);

    const [isEditEditorModalOpen, setIsEditEditorModalOpen] = React.useState(false);
    const [editEditorModalId, setEditEditorModalId] = React.useState(null);
    const [editEditorModalName, setEditEditorModalName] = React.useState(null);
    const [editEditorModalEmail, setEditEditorModalEmail] = React.useState(null);

    const [isDeleteEditorConfirmationModalOpen, setIsDeleteEditorConfirmationModalOpen] = React.useState(false);
    const [deleteEditorConfirmationModalId, setDeleteEditorConfirmationModalId] = React.useState(null);
    const [deleteEditorConfirmationModalName, setDeleteEditorConfirmationModalName] = React.useState(null);

    const dispatch = useDispatch();

    if (isLoading) {
      getAllEditors(json => {
        setIsLoading(false);
        dispatch(setEditors(json));
      });
    }

    const tableEditors = React.useMemo(() => editors.map(editor => {
      return {
        id: editor.id,
        name: editor.fields.Name,
        email: editor.fields.Email
      }
    }), [editors]);

    function editEditorRowOnClick(row) {
      setEditEditorModalId(row.original.id);
      setEditEditorModalName(row.original.name);
      setEditEditorModalEmail(row.original.email);
      setIsEditEditorModalOpen(true);
    }

    function deleteEditorRowOnClick(row) {
      setDeleteEditorConfirmationModalId(row.original.id);
      setDeleteEditorConfirmationModalName(row.original.name);
      setIsEditEditorModalOpen(true);
    }

    function openCreateEditorModal() {
      setCreateEditorModalName(null);
      setCreateEditorModalEmail(null);
      setIsCreateEditorModalOpen(true);
    }

    function onCreateEditorFormSubmit() {
      setIsCreateEditorModalOpen(false);
      setIsLoading(true);
      createEditor(createEditorModalName, createEditorModalEmail, json => {
        setIsLoading(false);
      });
    }

    function onEditEditorFormSubmit() {
      setIsLoading(true);
      updateEditor(editEditorModalId, editEditorModalName, editEditorModalEmail, () => {
        setIsLoading(false);
      });
    }

    function deleteEditor() {
      setIsLoading(true);
      deleteEditor(deleteEditorConfirmationModalId, () => {
        setIsLoading(false);
      });
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
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
        initialState: { pageIndex: 0, pageSize: 10 }
    }, usePagination);

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading && 
              <div>
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
                  <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                  </button>{' '}
                  <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                  </button>{' '}
                  <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                  </button>{' '}
                  <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                  </button>{' '}
                  <span>
                    Page{' '}
                      <strong>
                        {pageIndex + 1} of {pageOptions.length}
                      </strong>{' '}
                    </span>
                </div>
                <button onClick={openCreateEditorModal} className={styles.createEditorButton}>Create Editor</button>
                <Modal
                  isOpen={isCreateEditorModalOpen}
                  onRequestClose={() => setIsCreateEditorModalOpen(false)}
                >
                  <h2>Create Editor</h2>
                  <form onSubmit={onCreateEditorFormSubmit}>
                    <label>
                      Name:
                      <input type="text" value={createEditorModalName} onChange={(event) => setCreateEditorModalName(event.target.value)} />
                    </label>
                    <label>
                      Email:
                      <input type="text" value={createEditorModalEmail} onChange={(event) => setCreateEditorModalEmail(event.target.value)} />
                    </label>
                    <button type="submit">Save</button>
                  </form>
                </Modal>
                <Modal
                  isOpen={isEditEditorModalOpen}
                  onRequestClose={() => setIsEditEditorModalOpen(false)}
                >
                  <h2>Edit Editor</h2>
                  <form onSubmit={onEditEditorFormSubmit}>
                    <label>
                      Name:
                      <input type="text" value={editEditorModalName} onChange={(event) => setEditEditorModalName(event.target.value)} />
                    </label>
                    <label>
                      Email:
                      <input type="text" value={editEditorModalEmail} onChange={(event) => setEditEditorModalEmail(event.target.value)} />
                    </label>
                    <button type="submit">Save</button>
                  </form>
                </Modal>
                <Modal
                  isOpen={isDeleteEditorConfirmationModalOpen}
                  onRequestClose={() => setIsDeleteEditorConfirmationModalOpen(false)}
                >
                  <div>Are you sure you want to delete the editor {deleteEditorConfirmationModalName}?</div>
                  <button> onClick={deleteEditor}Yes</button>
                </Modal>
              </div>}
        </div>
    );
}
