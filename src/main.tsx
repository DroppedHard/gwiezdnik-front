import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ModalProvider } from 'services/context';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from 'services/context/UserContext';
import { toast, ToastContainer } from 'react-toastify';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => toast.error(`Something went wrong: ${error.message}`),
  }),
  defaultOptions: {
    queries: {
      retry: 1,
    },
    mutations: {
      onError: (error: unknown) => {
        if (error instanceof Error) {
          console.error('Mutation error:', error.message);
          toast.error('An error occurred while submitting data.');
        }
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
        <ToastContainer autoClose={3000} style={{ zIndex: 999999 }} />
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);
