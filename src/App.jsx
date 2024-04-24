import { CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";
import store from "./store";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<CircularProgress />} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
