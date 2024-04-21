import { Provider } from "react-redux";
import "./App.css";
import { MainTable } from "./components/MainTable/MainTable";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <h1>Table</h1>
      <MainTable />
    </Provider>
  );
}

export default App;
