import { createMuiTheme } from '@material-ui/core';
import { lightBlue, amber } from '@material-ui/core/colors';
import { light } from '@material-ui/core/styles/createPalette';

const theme = createMuiTheme({
  palette: {
    primary: {
      ...light,
      main: lightBlue[500],
    },
    secondary: {
      ...amber,
      main: amber[300],
    },
  },
  typography: {
    fontFamily: 'Raleway',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

export default theme;
