import Routes from './Routes';
import AppThemeProvider from './AppThemeProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          <Routes />
        </AppThemeProvider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  );
};

export default App;
