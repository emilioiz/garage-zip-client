import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { Alert, AlertProps, Slide, Container } from '@mui/material';

interface AlertContextType {
  setAlert: (severity: AlertProps['severity'], message: string, duration?: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertProps['severity']>('info');
  const [message, setMessage] = useState<string>('');
  const [duration, setDuration] = useState<number>(1000);

  const setAlert = (
    newSeverity: AlertProps['severity'],
    newMessage: string,
    newDuration: number = 1500
  ) => {
    setSeverity(newSeverity);
    setMessage(newMessage);
    setDuration(newDuration);
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [open, duration]);

  const AlertComponent = (
    <Slide direction='up' in={open} timeout={{ enter: 500, exit: 500 }} mountOnEnter unmountOnExit>
      <Container sx={{ position: 'fixed', bottom: '0%', zIndex: 1300, width: '100vw' }}>
        <Alert
          severity={severity}
          sx={{
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            maxWidth: '350px',
            margin: '0 auto',
          }}
        >
          {message}
        </Alert>
      </Container>
    </Slide>
  );

  return (
    <AlertContext.Provider value={{ setAlert }}>
      {children}
      {AlertComponent}
    </AlertContext.Provider>
  );
};

export const useAlertContext = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
};
