import { Provider } from "react-redux";
import "./App.css";
import { MainTable } from "./components/MainTable/MainTable";
import store from "./store";
import { TableBar } from "./components/TableBar/TableBar";

function App() {
  return (
    <Provider store={store}>
      <h1>Table</h1>
      <TableBar/>
      <MainTable />
    </Provider>
  );
}

export default App;
