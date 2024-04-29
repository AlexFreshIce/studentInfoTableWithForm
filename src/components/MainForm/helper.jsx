import { TableCell, TableRow } from "@mui/material";
import { StyledInput } from "../CustomField/styles";

export const COLUMN_NAMES = [
  "Наименование показателя",
  "Всего молодых специалистов",
  "Количества молодых специалистов по Целевому",
  "Количества молодых специалистов по Распределению",
];

export const INIT_FORM_DATA = {
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
  insert_user: "",
  rep_beg_period: "",
  rep_end_period: "",
};

export const generateKeys = (current, max, isRow) => {
  const keys = [];
  for (let i = 0; i < max; i++) {
    if (isRow) {
      keys.push(`data_${current}_${i + 1}`);
    } else {
      keys.push(`data_${i}_${current}`);
    }
  }
  return keys;
};

export const createKeyList = (curRow, curCol, maxRow, maxCol) => {
  if (curCol === 0 && curRow !== maxRow) {
    return generateKeys(curRow, maxCol, true);
  }
  if (curRow === maxRow && curCol !== 0) {
    return generateKeys(curCol, maxRow, false);
  }
  if (curCol === 0 && curRow === maxRow) {
    const keys1 = generateKeys(curCol + 1, maxRow, false);
    const keys2 = generateKeys(curCol + 2, maxRow, false);
    return [...keys1, ...keys2];
  }
  return [];
};

export const generateTableHeaders = (names) => {
  return names.map((name, nameIndex) => (
    <TableCell key={nameIndex} sx={{ textAlign: "center", width: "260px" }}>
      {name}
    </TableCell>
  ));
};

export const generateTableRows = (columns, rows) => {
  return rows.map((rowName, rowIndex) => (
    <TableRow key={rowIndex}>
      <TableCell>{rowName.name}</TableCell>
      {columns.map((_, colIndex) => {
        const keys = createKeyList(
          rowIndex,
          colIndex,
          rows.length - 1,
          columns.length - 1
        );
        return (
          <TableCell key={colIndex} sx={{ textAlign: "center" }}>
            <StyledInput
              id={`data_${rowIndex}_${colIndex}`}
              name={`data_${rowIndex}_${colIndex}`}
              keys={keys}
              readOnly={
                rowName.name === "Итог" || colIndex === 0 ? true : false
              }
              sx={{ textAlign: "right", height: "40px" }}
              type="number"
              inputMode="numeric"
            />
          </TableCell>
        );
      })}
    </TableRow>
  ));
};

export const getCurrentFormDataById = (data = [], currentFormId) => {
  if (!currentFormId) return [];

  const maxValues = {};

  data.forEach((obj) => {
    if (obj.f_pers_young_spec_id === +currentFormId) {
      const curDate = Date.parse(obj.update_date);
      const inArrDate = Date.parse(
        maxValues[obj.nsi_pers_indicate_id]?.nsi_pers_indicate_id || 0
      );
      if (!maxValues[obj.nsi_pers_indicate_id] || inArrDate < curDate) {
        maxValues[obj.nsi_pers_indicate_id] = obj;
      }
    }
  });
  return Object.values(maxValues);
};

export const generateInitialValues = (
  columns,
  rows,
  data = [],
  currentFormId
) => {
  const formData = getCurrentFormDataById(data, currentFormId);

  const initialValues = {};
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let colIndex = 0; colIndex < columns; colIndex++) {
      const findData = formData.find(
        (el) => el.nsi_pers_indicate_id === rowIndex + 1
      );
      if (findData) {
        if (colIndex === 1) {
          initialValues[`data_${rowIndex}_${colIndex}`] = findData.target_count;
        } else if (colIndex === 2) {
          initialValues[`data_${rowIndex}_${colIndex}`] =
            findData.distribution_count;
        }
        // else {
        //   initialValues[`data_${rowIndex}_${colIndex}`] = 0;
        // }
      }
      // else {
      //   initialValues[`data_${rowIndex}_${colIndex}`] = 0;
      // }
    }
  }

  return initialValues;
};

export const createHeaderData = (values, header, isNew, currentDate) => {
  const headerData = {
    f_pers_young_spec_id: header.f_pers_young_spec_id,
    org_employee: header.org_employee,
    rep_beg_period: values.rep_beg_period,
    rep_end_period: values.rep_end_period,
  };
  if (isNew) {
    headerData["insert_user"] = values.insert_user;
    headerData["update_user"] = values.insert_user;
    headerData["insert_date"] = currentDate;
    headerData["update_date"] = currentDate;
  } else {
    headerData["insert_user"] = header.insert_user;
    headerData["update_user"] = values.insert_user;
    headerData["insert_date"] = header.insert_date;
    headerData["update_date"] = currentDate;
  }
};

export const createFormDataList = (
  values,
  id,
  lastLineId,
  initData,
  currentDate
) => {
  const resoult = [];
  let currentLineId = lastLineId;

  for (let inputName in values) {
    if (inputName.includes("data") && inputName.at(-1) === "2") {
      const indexArr = inputName.split("_");
      const distribution_count = values[inputName];
      const target_count = values[`data_${indexArr[1]}_1`];
      if (
        distribution_count !== initData[inputName] ||
        target_count !== initData[`data_${indexArr[1]}_1`]
      ) {
        resoult.push({
          distribution_count: distribution_count,
          f_pers_young_spec_id: +id,
          f_pers_young_spec_line_id: currentLineId,
          nsi_pers_indicate_id: +indexArr[1] + 1,
          target_count: target_count,
          update_date: currentDate,
          update_user: values.insert_user,
        });
        currentLineId++;
      }
    }
  }
  return resoult.slice(0, -1);
};
