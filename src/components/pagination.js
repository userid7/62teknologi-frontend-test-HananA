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

export default function CustomPagination({ page, totalPage, gotoPage }) {
  //   var gotoPage = (page) => {};

  var canPreviousPage = page > 1;
  var canNextPage = page < totalPage;

  return (
    <div className="flex flex-col">
      <div className="m-auto flex">
        <ButtonGroup>
          <Button
            size="sm"
            onClick={() => gotoPage(1)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </Button>{" "}
          <Button
            size="sm"
            onClick={() => gotoPage(parseInt(page) - 1)}
            disabled={!canPreviousPage}
          >
            {"<"}
          </Button>{" "}
          <Button size="sm" animation={false} active={false}>
            <span>
              Page{" "}
              <strong>
                {page} of {totalPage}
              </strong>{" "}
            </span>
          </Button>{" "}
          <Button
            size="sm"
            onClick={() => gotoPage(parseInt(page) + 1)}
            disabled={!canNextPage}
          >
            {">"}
          </Button>{" "}
          <Button
            size="sm"
            onClick={() => gotoPage(totalPage)}
            disabled={!canNextPage}
          >
            {">>"}
          </Button>{" "}
        </ButtonGroup>
      </div>
    </div>
  );
}
