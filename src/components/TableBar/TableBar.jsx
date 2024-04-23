import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
  IconButton,
  Tooltip
} from "@mui/material";

import { useState } from "react";
import { HeaderList } from "../HeaderList/HeaderList";

export const TableBar = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  return (
    <Box sx={{ bgcolor: "white", height:"50px", paddingTop:"10px"}}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        open={openFilter}
        title={<HeaderList handleClickAway={handleCloseFilter} />}
      >
        <IconButton onClick={handleOpenFilter}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
