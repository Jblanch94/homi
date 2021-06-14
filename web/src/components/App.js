import Routes from './Routes';
import AppThemeProvider from './AppThemeProvider';
import store from '../store';

import { Provider } from 'react-redux';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppThemeProvider>
          <Routes />
        </AppThemeProvider>
      </Provider>
    </>
  );
};

export default App;
