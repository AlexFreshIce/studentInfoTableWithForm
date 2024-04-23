import { createColumnHelper } from "@tanstack/react-table";
import { parseDate } from "../../utils/parseData";

const columnHelper = createColumnHelper();

export const allColumns = [
  columnHelper.accessor("f_pers_young_spec_id", {
    header: "ID",
    // cell: (info) => info.getValue(),
    size: 30,
  }),
  columnHelper.accessor("insert_date", {
    header: "Дата и время добавления записи",
    cell: (info) => parseDate(info.getValue()),
    size: 120,
  }),
  columnHelper.accessor("insert_user", {
    header: "Имя пользователя который добавил запись",
    size: 160,
  }),
  columnHelper.accessor("org_employee", {
    header: "ФИО и контактные данные сотрудника организации для связи",
    size: 160,
  }),
  columnHelper.accessor("rep_beg_period", {
    header: "Дата начала отчетного периода",
    size: 120,
  }),
  columnHelper.accessor("rep_end_period", {
    header: "Дата окончания отчетного периода",
    size: 120,
  }),
  columnHelper.accessor("update_date", {
    header: "Дата и время последнего изменения записи",
    cell: (info) => parseDate(info.getValue()),
    size: 120,
  }),
  columnHelper.accessor("update_user", {
    header: "Имя пользователя изменившего запись",
    size: 120,
  }),
];
