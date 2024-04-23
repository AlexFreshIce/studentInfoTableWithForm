import { IconButton, TableCell, TableRow, styled, tableCellClasses } from "@mui/material";

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#c1e6f9",
    position: "relative",
    verticalAlign: "top",
    // paddingLeft: "5px",
    paddingRight: "30px",
    overflow: "hidden",
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

export const StyledIconButton = styled(IconButton)(() => ({
  position: "absolute",
  right: "2px",
  top: "8px",
  zIndex: "10",
}));

