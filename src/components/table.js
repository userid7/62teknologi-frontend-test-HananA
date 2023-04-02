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

export default function CustomTable({ columns, data }) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    headers, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    // page,
    // canPreviousPage,
    // canNextPage,
    // pageOptions,
    // pageCount,
    // gotoPage,
    // nextPage,
    // previousPage,
    // setPageSize,
    // state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      // initialState: { pageSize: 8 },
    },
    // usePagination,
  );

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <div className="flex flex-col">
      {/* <div className="flex py-3">
        <InputGroup className="w-full">
          <Input className="w-full" />
          <Button>Search</Button>
        </InputGroup>
      </div>

      <div>
        <div className="flex flex-row">
          <Dropdown className="px-3">
            <Dropdown.Toggle>Location : NYC</Dropdown.Toggle>
            <Dropdown.Menu className="w-52">
              <Input className="w-full" />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="px-3">
            <Dropdown.Toggle>Price : 1</Dropdown.Toggle>
            <Dropdown.Menu className="w-52">
              <Dropdown.Item>all</Dropdown.Item>
              <Dropdown.Item>low</Dropdown.Item>
              <Dropdown.Item>low-mid</Dropdown.Item>
              <Dropdown.Item>mid-high</Dropdown.Item>
              <Dropdown.Item>high</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="px-3">
            <Dropdown.Toggle>Status : -</Dropdown.Toggle>
            <Dropdown.Menu className="w-52">
              <Dropdown.Item>Open only</Dropdown.Item>
              <Dropdown.Item>All</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div> */}

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

      {/* <div className="m-auto flex pt-6">
        <ButtonGroup>
          <Button
            size="sm"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </Button>{" "}
          <Button
            size="sm"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<"}
          </Button>{" "}
          <Button size="sm" animation={false} active={false}>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
          </Button>{" "}
          <Button size="sm" onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </Button>{" "}
          <Button
            size="sm"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </Button>{" "}
        </ButtonGroup>
      </div> */}
    </div>
  );
}
