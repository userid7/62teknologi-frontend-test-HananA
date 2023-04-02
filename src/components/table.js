import React from "react";
import { useTable, usePagination } from "react-table";

import {
  Table,
  Pagination,
  Button,
  Input,
  InputGroup,
  ButtonGroup,
  Card,
  Toggle,
  Dropdown,
  Collapse,
} from "react-daisyui";

export default function CustomTable({ columns, data, searchString }) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    headers, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
  } = useTable({
    columns,
    data,
  });

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <div className="flex flex-col">
      <div className="flex overflow-x-auto py-3">
        <Table {...getTableProps()} className="w-full">
          <Table.Head>
            {headers.map((column) => (
              <span {...column.getHeaderProps()}>
                {column.render("Header")}
              </span>
            ))}
          </Table.Head>
          <Table.Body {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <Table.Row {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <span {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </span>
                    );
                  })}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
