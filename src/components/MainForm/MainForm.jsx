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
import { useParams } from "react-router-dom";
import { fetchFormData, selectFormData } from "../../store/slice/formDataSlice";
import { StyledInput } from "../CustomField/styles";
import {
  COLUMN_NAMES,
  INIT_FORM_DATA,
  generateInitialValues,
  generateTableHeaders,
  generateTableRows,
} from "./helper";
import {
  fetchHeadersData,
  getHeaderById,
  patchHeaderData,
} from "../../store/slice/headersDataSlice";
import { getCurrentDate } from "../../utils/date";

export const MainForm = () => {
  const { formId } = useParams();
  const [initData, setInitData] = useState(INIT_FORM_DATA);
  const dispatch = useDispatch();
  const rowData = useSelector(selectLinesData);
  const formData = useSelector(selectFormData);
  const header = useSelector((state) => getHeaderById(state, formId));

  useEffect(() => {
    dispatch(fetchLinesData());
    dispatch(fetchFormData());
    dispatch(fetchHeadersData());
  }, [dispatch]);

  useEffect(() => {
    if (rowData && formData && header) {
      const updInitValue = generateInitialValues(
        COLUMN_NAMES.length - 1,
        rowData.length + 1,
        formData,
        header.f_pers_young_spec_id
      );
      setInitData((prev) => {
        return {
          ...prev,
          ...updInitValue,
          rep_beg_period: header.rep_beg_period,
          rep_end_period: header.rep_end_period,
          insert_user: header.update_user || header.insert_user,
        };
      });
    }
  }, [rowData, formData, header]);

  const tableHeaders = useMemo(() => generateTableHeaders(COLUMN_NAMES), []);
  const tableData = useMemo(
    () =>
      generateTableRows(COLUMN_NAMES.slice(1), [...rowData, { name: "Итог" }]),
    [rowData]
  );

  return (
    <Box>
      <Formik
        initialValues={initData}
        enableReinitialize
        onSubmit={(values) => {
          const currentDate = getCurrentDate();
          const isNew = formId.toLowerCase().includes("new");
          const data = {
            f_pers_young_spec_id: header.f_pers_young_spec_id,
            org_employee: header.org_employee,
            rep_beg_period: values.rep_beg_period,
            rep_end_period: values.rep_end_period,
          };
          if (isNew) {
            data["insert_user"] = values.insert_user;
            data["update_user"] = values.insert_user;
            data["insert_date"] = currentDate;
            data["update_date"] = currentDate;
          } else {
            data["insert_user"] = header.insert_user;
            data["update_user"] = values.insert_user;
            data["insert_date"] = header.insert_date;
            data["update_date"] = currentDate;
          }
          dispatch(patchHeaderData(data));
          // console.log(values);
          // navigate(`/`);
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
