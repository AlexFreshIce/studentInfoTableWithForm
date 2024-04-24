import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLinesData,
  selectLinesData,
} from "../../store/slice/formLinesDataSlice";

import { useLocation, useNavigate } from "react-router-dom";
import { fetchFormData, selectFormData } from "../../store/slice/formDataSlice";
import { StyledInput } from "../CustomField/styles";
import {
  COLUMN_NAMES,
  INIT_FORM_DATA,
  generateInitialValues,
  generateTableHeaders,
  generateTableRows,
} from "./helper";

export const MainForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(INIT_FORM_DATA);
  const rowData = useSelector(selectLinesData);
  const data = useSelector(selectFormData);

  const {
    state: {
      f_pers_young_spec_id,
      rep_beg_period,
      rep_end_period,
      insert_user,
      update_user,
    },
  } = useLocation();

  useEffect(() => {
    // console.log(rowData, formId);
    if ((rowData, f_pers_young_spec_id, data)) {
      const updInitValue = generateInitialValues(
        COLUMN_NAMES.length - 1,
        rowData.length + 1,
        data,
        f_pers_young_spec_id
      );
      // console.log(updInitValue);
      setFormData((prev) => {
        return {
          ...prev,
          ...updInitValue,
          rep_beg_period,
          rep_end_period,
          insert_user: update_user || insert_user,
        };
      });
    }
  }, [rowData, f_pers_young_spec_id, data]);

  useEffect(() => {
    dispatch(fetchLinesData());
    dispatch(fetchFormData());
  }, [dispatch]);

  const tableHeaders = useMemo(() => generateTableHeaders(COLUMN_NAMES), []);

  const tableData = useMemo(
    () =>
      generateTableRows(COLUMN_NAMES.slice(1), [...rowData, { name: "Итог" }]),
    [rowData]
  );

  return (
    <Box>
      <Formik
        initialValues={formData}
        enableReinitialize
        onSubmit={(values) => {
          navigate(`/`);
          console.log(values);
        }}
      >
        {() => (
          <Form>
            <Box marginBottom={4} component={Paper} padding={2}>
              <Box display="flex" marginBottom={2}>
                <label htmlFor="rep_beg_period">Дата начала</label>
                <StyledInput
                  id="rep_beg_period"
                  name="rep_beg_period"
                  placeholder="Выберите дату"
                  sx={{ margin: "0 8px" }}
                  type="date"
                />
                <label htmlFor="rep_end_period">и окончания</label>
                <StyledInput
                  id="rep_end_period"
                  name="rep_end_period"
                  placeholder="Выберите дату"
                  sx={{ margin: "0 8px" }}
                  type="date"
                />
                <Typography>отчетного периода.</Typography>
              </Box>
              <Box display="flex">
                <label htmlFor="insert_user">
                  Ответственный заполнивший форму (Ф.И.О., должность, телефон)
                </label>
                <StyledInput
                  id="insert_user"
                  name="insert_user"
                  placeholder="Введите данные"
                  sx={{ margin: "0 8px", width: "480px" }}
                />
              </Box>
            </Box>
            <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
              <Table>
                <TableHead>
                  <TableRow>{tableHeaders}</TableRow>
                </TableHead>
                <TableBody>{tableData}</TableBody>
              </Table>
            </TableContainer>
            <Button type="submit" variant="contained" color="primary">
              Сохранить
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
