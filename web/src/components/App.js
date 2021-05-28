import Routes from './Routes';
import AppThemeProvider from './AppThemeProvider';

const App = () => {
  return (
    <>
      <AppThemeProvider>
        <Routes />
      </AppThemeProvider>
    </>
  );
};

export default App;
