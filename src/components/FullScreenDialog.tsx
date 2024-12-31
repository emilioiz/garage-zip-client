import { Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';

interface FullScreenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions: React.ReactNode;
}

const FullScreenDialog = ({ isOpen, onClose, title, children, actions }: FullScreenDialogProps) => {
  return (
    <Dialog fullScreen open={isOpen} onClose={onClose} disableRestoreFocus>
      <DialogTitle sx={{ pt: 4 }}>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions
        sx={{
          p: 2,
          pb: 1,
          position: 'sticky',
          bottom: 0,
          backgroundColor: (theme) => theme.palette.background.default,
          zIndex: 1100,
        }}
      >
        {actions}
      </DialogActions>
    </Dialog>
  );
};

export default FullScreenDialog;
