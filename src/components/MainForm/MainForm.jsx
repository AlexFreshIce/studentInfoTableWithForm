import {
  Box,
  Button,
  CircularProgress,
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
import { Link, useParams } from "react-router-dom";
import {
  fetchFormData,
  postFormData,
  selectFetchFormDataStatus,
  selectFormData,
} from "../../store/slice/formDataSlice";
import {
  fetchLinesData,
  selectFetchLinesDataStatus,
  selectLinesData,
} from "../../store/slice/formLinesDataSlice";
import {
  fetchHeadersData,
  getHeaderById,
  patchHeaderData,
  selectFetchHeadersDataStatus,
} from "../../store/slice/headersDataSlice";
import { getCurrentDate } from "../../utils/date";
import { StyledInput } from "../CustomField/styles";
import {
  COLUMN_NAMES,
  INIT_FORM_DATA,
  compareHeaders,
  createFormDataList,
  createHeaderData,
  generateInitialValues,
  generateTableHeaders,
  generateTableRows,
} from "./helper";

const submitHandler = (
  values,
  formData,
  header,
  initData,
  setInitData,
  formId,
  dispatch
) => {
  const currentDate = getCurrentDate();
  const isNew = formId.toLowerCase().includes("new");
  const lastLineId = formData.at(-1).f_pers_young_spec_line_id;

  const headerData = createHeaderData(values, header, isNew, currentDate);
  const formDataChangeList = createFormDataList(
    values,
    formId,
    lastLineId,
    initData,
    currentDate
  );

  const isHeaderChange = compareHeaders(header, headerData);
  if (isHeaderChange) {
    dispatch(patchHeaderData(headerData));
  }
  formDataChangeList.forEach((data) => dispatch(postFormData(data)));

  setInitData(values);
};

export const MainForm = () => {
  const { formId } = useParams();

  const dispatch = useDispatch();
  const [initData, setInitData] = useState(INIT_FORM_DATA);
  const rowData = useSelector(selectLinesData);
  const formData = useSelector(selectFormData);
  const header = useSelector((state) => getHeaderById(state, formId));
  const headersLoadStatus = useSelector(selectFetchHeadersDataStatus);
  const linesDataLoadStatus = useSelector(selectFetchLinesDataStatus);
  const formDataLoadStatus = useSelector(selectFetchFormDataStatus);

  const isDataLoading =
    headersLoadStatus === "loading" ||
    linesDataLoadStatus === "loading" ||
    formDataLoadStatus === "loading";

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

  if (isDataLoading) return <CircularProgress />;

  return (
    <Box>
      <Formik
        initialValues={initData}
        enableReinitialize
        onSubmit={async (values) => {
          submitHandler(
            values,
            formData,
            header,
            initData,
            setInitData,
            formId,
            dispatch
          );
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
                  required
                />
                <label htmlFor="rep_end_period">и окончания</label>
                <StyledInput
                  id="rep_end_period"
                  name="rep_end_period"
                  placeholder="Выберите дату"
                  sx={{ margin: "0 8px" }}
                  type="date"
                  required
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
                  required
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
            <Box
              display="flex"
              sx={{
                margin: "0px auto",
                width: "240px",
                justifyContent: "space-between",
              }}
            >
              <Button type="submit" variant="contained" color="primary">
                Сохранить
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="primary"
                component={Link}
                to="/"
              >
                Закрыть
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
