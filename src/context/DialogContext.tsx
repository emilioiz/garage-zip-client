import { FC, createContext, useContext, useState, ReactNode } from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

interface DialogContextType {
  openDialog: (
    message: string,
    onConfirm: () => void,
    confirmText?: string,
    cancelText?: string
  ) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [confirmText, setConfirmText] = useState<string>('Yes');
  const [cancelText, setCancelText] = useState<string>('No');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const openDialog = (
    newMessage: string,
    newOnConfirm: () => void,
    newConfirmText: string = 'Continue',
    newCancelText: string = 'Cancel'
  ) => {
    setMessage(newMessage);
    setOnConfirm(() => newOnConfirm);
    setConfirmText(newConfirmText);
    setCancelText(newCancelText);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogContext.Provider value={{ openDialog }}>
      {children}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='warning' variant='text'>
            {cancelText || 'Cancel'}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              handleClose();
            }}
            color='primary'
            variant='contained'
          >
            {confirmText || 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
};

export const useDialogContext = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialogContext must be used within a DialogProvider');
  }
  return context;
};
