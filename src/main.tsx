import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import AppRouter from './app/app-router';

import ScrollToTop from './components/widgets/scroll-to-top';

import { setupTheme } from '@/utils/setup-theme';

import './global.css';

const rootElement = document.getElementById('app') as HTMLElement;

setupTheme();

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AppRouter />
    </BrowserRouter>
  </StrictMode>
);
