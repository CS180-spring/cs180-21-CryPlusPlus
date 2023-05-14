"use client";

import React from 'react'
import { useTable } from "react-table";

// {
//   firstName: "Daniel",
//   lastName: "Castaneda",
//   age: 20,
//   year: 3,
//   major: "Computer Science",
// }

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({columns, data});

  return (
    <table className='w-full' {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className='font-inter px-4 py-3.5 border-b-2 border'>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className='hover:bg-figma-lightpink'>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className='font-inter px-4 py-3.5 border'>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table