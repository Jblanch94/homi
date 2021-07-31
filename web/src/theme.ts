import { createTheme } from "@material-ui/core";
import { lightBlue, amber, lightGreen } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    primary: {
      ...lightBlue,
      main: lightBlue[500],
    },
    secondary: {
      ...amber,
      main: amber[300],
    },
    success: {
      ...lightGreen,
      main: lightGreen[700],
    },
  },
  typography: {
    fontFamily: "Raleway",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

export default theme;
