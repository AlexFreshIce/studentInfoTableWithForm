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
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHeadersData,
  selectFetchHeadersDataStatus,
  selectHeadersData,
  selectHiddenHeaders,
} from "../../store/slice/headersDataSlice";
import allColumns from "./columns";
import { StyledTableCell, StyledTableRow } from "./styles";

export const MainTable = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectHeadersData);
  const hiddenHeaders = useSelector(selectHiddenHeaders);
  const status = useSelector(selectFetchHeadersDataStatus);
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
  });

  switch (status) {
    case "loading":
      return <CircularProgress />;
    case "resolved":
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <StyledTableCell key={header.id}>
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
              {table.getRowModel().rows.map((row) => (
                <StyledTableRow
                  key={row.id}
                  onClick={() => {
                    console.log(row);
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    default:
      return <CircularProgress />;
  }
};
