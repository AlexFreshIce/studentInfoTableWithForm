import { TableCell, TableRow } from "@mui/material";
import { StyledInput } from "./styles";

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
}

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

export const genKeys = (curRow, curCol, maxRow, maxCol) => {
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
    <TableCell key={nameIndex}  sx={{ textAlign: "center", width:"260px"}}>{name}</TableCell>
  ));
};

export const generateTableRows = (columns, rows) => {
  return rows.map((rowName, rowIndex) => (
    <TableRow key={rowIndex}>
      <TableCell>{rowName.name}</TableCell>
      {columns.map((_, colIndex) => {
        const keys = genKeys(
          rowIndex,
          colIndex,
          rows.length - 1,
          columns.length - 1
        );
        return (
          <TableCell key={colIndex}  sx={{ textAlign: "center", }}>
            <StyledInput
              id={`data_${rowIndex}_${colIndex}`}
              name={`data_${rowIndex}_${colIndex}`}
              keys={keys}
              // value={props.values[`data_${rowIndex}_${colIndex}`]}
              readOnly={
                rowName.name === "Итог" || colIndex === 0 ? true : false
              }
              sx={{ textAlign: "right", height:"40px" }}
              type="number"
              inputMode="numeric"
              // disabled={rowName === "Итог" || colIndex === 0 ? true : false}
            />
          </TableCell>
        );
      })}
    </TableRow>
  ));
};



export const getCurrentFormDataById = (data = [], currentFormId) => {
  // console.log(data, currentFormId);
  if (!currentFormId) return [];

  const maxValues = {};

  data.forEach((obj) => {
    if (obj.f_pers_young_spec_id === +currentFormId) {
      const curDate = Date.parse(obj.update_date);
      const inArrDate = Date.parse(maxValues[obj.nsi_pers_indicate_id]);
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
      // console.log(formData);
      // console.log(`data.${rowIndex}.${colIndex}`);

      const findData = formData.find(
        (el) => el.nsi_pers_indicate_id === rowIndex + 1
      );
      // console.log(findData);
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
