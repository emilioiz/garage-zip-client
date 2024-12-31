// src/components/FullScreenDialog.tsx
import { Dialog, DialogContent, DialogActions, DialogTitle, Box } from '@mui/material';

interface FullScreenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FullScreenDialog = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  onSubmit,
  ...dialogProps
}: FullScreenDialogProps) => {
  const ContainerElement = onSubmit ? 'form' : 'div';

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose} disableRestoreFocus {...dialogProps}>
      <DialogTitle sx={{ pt: 4 }}>{title}</DialogTitle>
      <Box
        component={ContainerElement}
        onSubmit={onSubmit}
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <DialogContent>{children}</DialogContent>
        <DialogActions
          sx={{
            p: 2.5,
            position: 'sticky',
            bottom: 0,
            backgroundColor: (theme) => theme.palette.background.default,
            zIndex: 1100,
          }}
        >
          {actions}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default FullScreenDialog;
