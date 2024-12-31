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

  openDialogWithContent: (
    content: ReactNode,
    onConfirm: () => void,
    confirmText?: string,
    cancelText?: string,
    title?: string
  ) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);

  const [message, setMessage] = useState<string>('');
  const [confirmText, setConfirmText] = useState<string>('Yes');
  const [cancelText, setCancelText] = useState<string>('No');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});
  const [title, setTitle] = useState<string>('Confirmation');

  const [customContent, setCustomContent] = useState<ReactNode | null>(null);

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
    setCustomContent(null);
    setTitle('Confirmation');
    setOpen(true);
  };

  const openDialogWithContent = (
    content: ReactNode,
    newOnConfirm: () => void,
    newConfirmText: string = 'OK',
    newCancelText: string = 'Cancel',
    newTitle: string = 'Choose an Option'
  ) => {
    setCustomContent(content);
    setOnConfirm(() => newOnConfirm);
    setConfirmText(newConfirmText);
    setCancelText(newCancelText);
    setMessage('');
    setTitle(newTitle);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogContext.Provider value={{ openDialog, openDialogWithContent }}>
      {children}
      <Dialog open={open} onClose={handleClose} disableRestoreFocus>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {customContent ? customContent : <DialogContentText>{message}</DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='warning' variant='text'>
            {cancelText}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              handleClose();
            }}
            color='primary'
            variant='contained'
          >
            {confirmText}
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
