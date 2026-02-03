import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import AppRouter from './app/app-router';

import ScrollToTop from './components/widgets/scroll-to-top';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { setupTheme } from '@/utils/setup-theme';

import './global.css';

const rootElement = document.getElementById('app') as HTMLElement;
const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

setupTheme();

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
