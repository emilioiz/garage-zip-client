// src/pages/Account/AccountForm.tsx
import { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { TextField, Button } from '@mui/material';

import FullScreenDialog from '../../components/FullScreenDialog';

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
    <FullScreenDialog
      isOpen={isEditAccountDialogOpen}
      onClose={() => setIsEditAccountDialogOpen(false)}
      title='Edit Account'
      actions={
        <>
          <Button onClick={() => setIsEditAccountDialogOpen(false)} color='warning'>
            Cancel
          </Button>
          <Button type='submit' color='primary' variant='contained'>
            Submit
          </Button>
        </>
      }
      onSubmit={formik.handleSubmit}
    >
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
    </FullScreenDialog>
  );
};

export default AccountForm;
