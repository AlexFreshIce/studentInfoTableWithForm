import { Provider } from "react-redux";
import "./App.css";
import { MainTable } from "./components/MainTable/MainTable";
import store from "./store";
import { TableBar } from "./components/TableBar/TableBar";
import { MainForm } from "./components/MainForm/MainForm";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <Provider store={store}>
       <ThemeProvider theme={theme}>
      <CssBaseline />
      <h2>Таблица</h2>
      <TableBar/>
      <MainTable />
      <h2>Форма</h2>
      <MainForm/>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
