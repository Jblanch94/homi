import { ThemeProvider } from "@material-ui/core";
import { FC } from "react";
import theme from "../theme";

const AppThemeProvider: FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
