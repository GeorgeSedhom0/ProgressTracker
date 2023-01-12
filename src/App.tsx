import { blue, purple } from "@mui/material/colors";
import "./App.css";
import Tracker from "./pages/Tracker";
// imports for theme on mui
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Settings from "./pages/Settings";

const theme = createTheme({
  palette: {
    primary: {
      main: blue["A400"],
      light: blue["A200"],
      dark: blue["A700"],
      contrastText: "#fff",
    },
    secondary: {
      main: purple["A400"],
      light: purple["A200"],
      dark: purple["A700"],
      contrastText: "#fff",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "white",
          borderColor: "white",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tracker />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
