import React from 'react';
import { getAllEditors } from '../../../api/editors';
import { useSelector, useDispatch } from 'react-redux';
import { setEditors, setAuthError } from '../../../api/state/actions';
import { useTable, usePagination } from 'react-table';
import styles from './EditorsTable.module.scss';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useHistory } from 'react-router-dom';
import DeleteEditorModal from '../DeleteEditorModal/DeleteEditorModal';
import EditEditorModal from '../EditEditorModal/EditEditorModal';

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
          id: 'actions',
          Cell: ({ row }) => (
            <DropdownButton as={ButtonGroup} title="Actions" id="bg-nested-dropdown">
              <Dropdown.Item onClick={() => editEditorRowOnClick(row)} eventKey="1">Edit</Dropdown.Item>
              <Dropdown.Item onClick={() => deleteEditorRowOnClick(row)} eventKey="2">Delete</Dropdown.Item>
            </DropdownButton>
          )
        }
    ], []);

    const editors = useSelector(state => state.editors);
    const authToken = useSelector(state => state.authToken);
    const [isLoading, setIsLoading] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [initialPageIndex, setInitialPageIndex] = React.useState(0);

    const [isCreateEditorModalOpen, setIsCreateEditorModalOpen] = React.useState(false);
    const [createEditorModalName, setCreateEditorModalName] = React.useState('');
    const [createEditorModalEmail, setCreateEditorModalEmail] = React.useState('');

    const [isEditEditorModalOpen, setIsEditEditorModalOpen] = React.useState(false);
    const [editEditorModalId, setEditEditorModalId] = React.useState(null);
    const [editEditorModalName, setEditEditorModalName] = React.useState('');
    const [editEditorModalEmail, setEditEditorModalEmail] = React.useState('');

    const [isDeleteEditorConfirmationModalOpen, setIsDeleteEditorConfirmationModalOpen] = React.useState(false);
    const [deleteEditorConfirmationModalId, setDeleteEditorConfirmationModalId] = React.useState(null);
    const [deleteEditorConfirmationModalName, setDeleteEditorConfirmationModalName] = React.useState('');

    const dispatch = useDispatch();
    const history = useHistory();
    
    React.useEffect(() => {
      if (isLoading) {
        getAllEditors(authToken, json => {
          if (json.isAuthorized === false) {
            dispatch(setAuthError(json.error));
            history.push('/');
          } else if (json.error) {
            setErrorMessage(json.error);
          } else {
            dispatch(setEditors(json));
          }
          setIsLoading(false);
        });
      }
    }, [isLoading])

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
                <EditEditorModal
                  isModalOpen={isCreateEditorModalOpen}
                  closeModalMethod={() => setIsCreateEditorModalOpen(false)}
                  setTableIndexMethod={() => setInitialPageIndex(Math.floor((editors.length + 1) / pageSize))}
                  modalTitle="Create Editor"
                  initialEditorName={createEditorModalName}
                  initialEditorEmail={createEditorModalEmail}
                  newEditor={true}
                />
                <EditEditorModal
                  isModalOpen={isEditEditorModalOpen}
                  closeModalMethod={() => setIsEditEditorModalOpen(false)}
                  setTableIndexMethod={() => setInitialPageIndex(pageIndex)}
                  modalTitle="Edit Editor"
                  editorId={editEditorModalId}
                  initialEditorName={editEditorModalName}
                  initialEditorEmail={editEditorModalEmail}
                  newEditor={false}
                />
                <DeleteEditorModal
                  isModalOpen={isDeleteEditorConfirmationModalOpen}
                  closeModalMethod={() => setIsDeleteEditorConfirmationModalOpen(false)}
                  setTableIndexMethod={() => setInitialPageIndex(Math.floor((editors.length + 1) / pageSize))}
                  editorName={deleteEditorConfirmationModalName}
                  editorId={deleteEditorConfirmationModalId}
                />
              </div>}
        </div>
    );
}
