import RoutesContainer from "../containers/RoutesContainer";
import AppThemeProvider from "./AppThemeProvider";
import store from "../store";

import { Provider } from "react-redux";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppThemeProvider>
          <RoutesContainer />
        </AppThemeProvider>
      </Provider>
    </>
  );
};

export default App;
