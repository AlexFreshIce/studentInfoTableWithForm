import { createBrowserRouter } from "react-router-dom";
import { MainTable } from "../components/MainTable/MainTable";
import { MainForm } from "../components/MainForm/MainForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainTable />,
  },
  {
    path: "form/:formId",
    element: <MainForm />,
  },
]);
