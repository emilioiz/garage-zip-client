// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles.css';
import { UserProvider } from './context/UserContext';
import { AlertProvider } from './context/AlertContext';
import { DialogProvider } from './context/DialogContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <AlertProvider>
        <DialogProvider>
          <App />
        </DialogProvider>
      </AlertProvider>
    </UserProvider>
  </StrictMode>
);
