import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './features/authentication/Login';
import Expenses from './pages/Expenses';
import GlobalStyles from './styles/GlobalStyles';
import Header from './ui/Header';
import ProtectedRoute from './ui/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <GlobalStyles>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/expenses" element={<Expenses />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalStyles>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#FFFFFF',
            color: '#374151',
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
