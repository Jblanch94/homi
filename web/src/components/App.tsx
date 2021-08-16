import { FC } from "react";
import RoutesContainer from "../containers/RoutesContainer";
import AppThemeProvider from "./AppThemeProvider";
import store from "../store";
import { Provider } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const App: FC = () => {
  return (
    <>
      <Provider store={store}>
        <AppThemeProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <RoutesContainer />
          </MuiPickersUtilsProvider>
        </AppThemeProvider>
      </Provider>
    </>
  );
};

export default App;
