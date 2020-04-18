import React from 'react';
import { getAllEditors, createEditor } from '../../api/editors';
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
        }
    ], []);

    const editors = useSelector(state => state.editors);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isCreateEditorModalOpen, setIsCreateEditorModalOpen] = React.useState(false);
    const [createEditorModalName, setCreateEditorModalName] = React.useState(null);
    const [createEditorModalEmail, setCreateEditorModalEmail] = React.useState(null);

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

    function openCreateEditorModal() {
      setCreateEditorModalName(null);
      setCreateEditorModalEmail(null);
      setIsCreateEditorModalOpen(true);
    }

    function closeCreateEditorModal() {
      setIsCreateEditorModalOpen(false);
    }

    function onCreateEditorFormSubmit() {
      closeCreateEditorModal();
      setIsLoading(true);
      createEditor(createEditorModalName, createEditorModalEmail, json => {
        setIsLoading(false);
      });
    }

    function onCreateEditorModalNameChange(event) {
      setCreateEditorModalName(event.target.value);
    }

    function onCreateEditorModalEmailChange(event) {
      setCreateEditorModalEmail(event.target.value);
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
                  onRequestClose={closeCreateEditorModal}
                >
                  <h2>Create Editor</h2>
                  <form onSubmit={onCreateEditorFormSubmit}>
                    <label>
                      Name:
                      <input type="text" value={createEditorModalName} onChange={onCreateEditorModalNameChange} />
                    </label>
                    <label>
                      Email:
                      <input type="text" value={createEditorModalEmail} onChange={onCreateEditorModalEmailChange} />
                    </label>
                    <button type="submit">Save</button>
                  </form>
                </Modal>
              </div>}
        </div>
    );
}
