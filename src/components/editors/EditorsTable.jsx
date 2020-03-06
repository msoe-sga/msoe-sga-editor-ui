import React from 'react';
import { getAllEditors } from '../../api/editors';
import { useSelector, useDispatch } from 'react-redux';
import { setEditors } from '../../api/state/actions';
import {useTable } from 'react-table';

export default function Editors() {
    const tableColumns = [
        {
            Header: 'Editors',
            columns: [
                {
                    Header: "Id",
                    accessor: "id"
                },
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
    ];

    const editors = useSelector(state => state.editors);
    const [isLoading, setIsLoading] = React.useState(true);
    const dispatch = useDispatch();
    let tableEditors = [];

    getAllEditors(json => {
        if (isLoading) {
            setIsLoading(false);
            dispatch(setEditors(json));
        }
    });

    if (editors !== null) {
        tableEditors = editors.map(editor => {
            return {
                id: editor.id,
                name: editor.fields.Name,
                email: editor.fields.Email
            }
        });
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns: tableColumns,
        data: tableEditors,
    });

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading && 
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
              {rows.map((row, i) => {
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
          </table>}
        </div>
    );
}
