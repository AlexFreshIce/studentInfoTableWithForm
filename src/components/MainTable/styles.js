import { TableCell, TableRow, styled, tableCellClasses } from "@mui/material";

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#c1e6f9",
  },
}));

export const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f0f4fc",
  },
  [`&:hover`]: {
    backgroundColor: "#f7f5d0",
  },
}));
