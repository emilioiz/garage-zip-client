// src/pages/Accounts/AccountForm.tsx
import { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
} from '@mui/material';

interface AccountFormProps {
  isEditAccountDialogOpen: boolean;
  setIsEditAccountDialogOpen: (open: boolean) => void;
}

const AccountForm: FC<AccountFormProps> = ({
  isEditAccountDialogOpen,
  setIsEditAccountDialogOpen,
}) => {
  const formik = useFormik({
    initialValues: {
      accountName: 'Test Account',
    },
    validationSchema: Yup.object({
      accountName: Yup.string().required('Account Name is required'),
    }),
    onSubmit: (values) => {
      console.log('Account Edited:', values);
      setIsEditAccountDialogOpen(false);
    },
  });

  return (
    <Dialog
      fullScreen
      open={isEditAccountDialogOpen}
      onClose={() => setIsEditAccountDialogOpen(false)}
      disableRestoreFocus
    >
      <DialogTitle sx={{ pt: 4 }}>Edit Account</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label='Account Name'
            variant='outlined'
            fullWidth
            margin='normal'
            required
            {...formik.getFieldProps('accountName')}
            error={formik.touched.accountName && Boolean(formik.errors.accountName)}
            helperText={formik.touched.accountName && formik.errors.accountName}
          />
          <DialogActions sx={{ pb: 4 }}>
            <Button onClick={() => setIsEditAccountDialogOpen(false)} color='primary'>
              Cancel
            </Button>
            <Button type='submit' color='primary' variant='contained'>
              Edit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountForm;
