import { TableCell, TableRow } from "@mui/material";
import { StyledInput } from "./styles";

export const COLUMN_NAMES = [
  "Наименование показателя",
  "Всего молодых специалистов",
  "Количества молодых специалистов по Целевому",
  "Количества молодых специалистов по Распределению",
];

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

              // disabled={rowName === "Итог" || colIndex === 0 ? true : false}
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
    if (obj.f_pers_young_spec_id === currentFormId) {
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
