import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ModalProvider } from 'services/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from 'services/context/UserContext';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);
