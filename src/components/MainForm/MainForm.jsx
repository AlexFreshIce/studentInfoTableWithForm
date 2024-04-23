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
import { data } from "../../api/mockData";
import {
  fetchLinesData,
  selectLinesData,
} from "../../store/slice/formLinesDataSlice";

import {
  COLUMN_NAMES,
  generateInitialValues,
  generateTableHeaders,
  generateTableRows,
} from "./helper";
import { StyledInput } from "./styles";

export const MainForm = ({
  // f_pers_young_spec_id,
  // insert_date,
  // insert_user,
  // org_employee,
  rep_beg_period,
  rep_end_period,
  // update_date,
  update_user,
}) => {
  const dispatch = useDispatch();
  const rowData = useSelector(selectLinesData);
  const [formData, setFormData] = useState({
    data_0_0: 0,
    data_0_1: 0,
    data_0_2: 0,
    data_1_0: 0,
    data_1_1: 0,
    data_1_2: 0,
    data_2_0: 0,
    data_2_1: 0,
    data_2_2: 0,
    data_3_0: 0,
    data_3_1: 0,
    data_3_2: 0,
    data_4_0: 0,
    data_4_1: 0,
    data_4_2: 0,
    data_5_0: 0,
    data_5_1: 0,
    data_5_2: 0,
    insert_user: update_user || "",
    rep_beg_period: rep_beg_period || "",
    rep_end_period: rep_end_period || "",
  });

  useEffect(() => {
    if (rowData) {
      const updInitValue = generateInitialValues(
        COLUMN_NAMES.length - 1,
        rowData.length + 1,
        data,
        25
      );
      setFormData((prev) => {
        return { ...prev, ...updInitValue };
      });
    }
  }, [rowData]);

  useEffect(() => {
    dispatch(fetchLinesData());
  }, [dispatch]);

  const tableHeaders = useMemo(() => generateTableHeaders(COLUMN_NAMES), []);

  const tableData = useMemo(
    () =>
      generateTableRows(COLUMN_NAMES.slice(1), [...rowData, { name: "Итог" }]),
    [COLUMN_NAMES, rowData]
  );

  return (
    <Box>
      <Formik
        initialValues={formData}
        enableReinitialize
        onSubmit={(values) => {
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
                  sx={{ margin: "0 8px" }}
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
