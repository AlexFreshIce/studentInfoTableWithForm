import {
  Checkbox,
  ClickAwayListener,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  hideHeaders,
  selectHiddenHeaders,
} from "../../store/slice/headersDataSlice";
import {allColumns} from "../MainTable/helper";


export const HeaderList = ({ handleClickAway }) => {
  const dispatch = useDispatch();
  const hiddenHeaders = useSelector(selectHiddenHeaders);
  const onCheckBoxToggle = (value) => {
    dispatch(hideHeaders(value));
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <List>
        {allColumns.map((col, i) => {
          return (
            <ListItem key={col.header} disablePadding>
              <ListItemButton
                onClick={() => {
                  onCheckBoxToggle(i);
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={hiddenHeaders.indexOf(i) === -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": col.header }}
                  />
                </ListItemIcon>
                <ListItemText id={col.header} primary={col.header} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </ClickAwayListener>
  );
};


