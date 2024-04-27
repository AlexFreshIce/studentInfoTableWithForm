import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchHeadersData,
  selectFetchHeadersDataStatus,
  selectHeadersData,
  selectHiddenHeaders,
} from "../../store/slice/headersDataSlice";
import { TableBar } from "../TableBar/TableBar";
import { allColumns } from "./helper";
import { StyledIconButton, StyledTableCell, StyledTableRow } from "./styles";

export const MainTable = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectHeadersData);
  const hiddenHeaders = useSelector(selectHiddenHeaders);
  const status = useSelector(selectFetchHeadersDataStatus);

  const navigate = useNavigate();
  // const handleRowClick = (rowData) => {
  //   navigate(`/form/${rowData.f_pers_young_spec_id}`, {state:rowData});
  // };
  const handleRowClick = (rowData) => {
    navigate(`/form/${rowData.f_pers_young_spec_id}`);
  };

  const columns = useMemo(
    () => allColumns.filter((_, i) => !hiddenHeaders.includes(i)),
    [hiddenHeaders]
  );
  useEffect(() => {
    dispatch(fetchHeadersData());
  }, [dispatch]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  switch (status) {
    case "loading":
      return <CircularProgress />;
    case "resolved":
      return (
        <>
          <TableBar />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <StyledTableCell key={header.id} align="center">
                        {header.column.getCanSort() && (
                          <StyledIconButton
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <SwapVertIcon />
                          </StyledIconButton>
                        )}
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <StyledTableRow
                      key={row.id}
                      onClick={() => {
                        handleRowClick(row.original);
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          sx={{ width: cell.column.getSize() }}
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      );
    default:
      return <CircularProgress />;
  }
};
