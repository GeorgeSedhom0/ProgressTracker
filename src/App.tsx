import { blue, purple } from "@mui/material/colors";
import "./App.css";
import Tracker from "./Tracker";
// imports for theme on mui
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Tracker />
    </ThemeProvider>
  );
}

export default App;
