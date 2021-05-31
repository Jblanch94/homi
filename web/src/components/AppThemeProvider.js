import { ThemeProvider } from '@material-ui/core';
import theme from '../theme';

const AppThemeProvider = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default AppThemeProvider;
