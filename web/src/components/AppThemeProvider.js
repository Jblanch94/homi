import theme from '../theme';
import { ThemeProvider } from '@emotion/react';

const AppThemeProvider = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default AppThemeProvider;
