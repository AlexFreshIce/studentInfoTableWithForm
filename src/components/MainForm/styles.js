import { styled } from "@mui/material";
import { CustomField } from "../CustomField/CustomField";

export const StyledInput = styled(CustomField)(({ theme, readOnly }) => ({
  backgroundColor: readOnly ? "#f0f4fc" : theme.palette.background.paper,
  color: theme.palette.text.primary,
  border: 0,
  height: "24px",
  borderRadius: "4px",
  fontFamily: "Roboto",
  fontSize: "16px",
  padding: "4px 8px",
  boxSizing: "border-box",
  colorScheme: theme.palette.mode,
  boxShadow:
    "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  [`&:hover`]: {backgroundColor: "#f7f5d0"},
  [`&:focus`]: {backgroundColor: "#f7f5d0"},
  
    // Скрытие стандартных кнопок регулировки ввода числа
    "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "&[type='number']": {
      "-moz-appearance": "textfield",
    },
}));
