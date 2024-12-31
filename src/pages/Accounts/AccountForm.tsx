// src/pages/Accounts/AccountForm.tsx
import { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AsYouType } from 'libphonenumber-js';

import {
  Typography,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  Divider,
} from '@mui/material';

interface AccountFormProps {
  isCreateAccountDialogOpen: boolean;
  setIsCreateAccountDialogOpen: (open: boolean) => void;
}

const AccountForm: FC<AccountFormProps> = ({
  isCreateAccountDialogOpen,
  setIsCreateAccountDialogOpen,
}) => {
  const formik = useFormik({
    initialValues: {
      accountName: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      displayName: '',
    },
    validationSchema: Yup.object({
      accountName: Yup.string().required('Account Name is required'),
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: (values) => {
      console.log('Account Created:', values);
      setIsCreateAccountDialogOpen(false);
    },
  });

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedNumber = new AsYouType().input(input);

    formik.setFieldValue('phoneNumber', formattedNumber);
  };

  return (
    <Dialog
      fullScreen
      open={isCreateAccountDialogOpen}
      onClose={() => setIsCreateAccountDialogOpen(false)}
      disableRestoreFocus
    >
      <DialogTitle sx={{ pt: 4 }}>Create New Account</DialogTitle>
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
          <Divider sx={{ my: 2 }} />
          <Typography variant='body2'>Primary User Details</Typography>
          <TextField
            label='First Name'
            variant='outlined'
            fullWidth
            margin='normal'
            required
            {...formik.getFieldProps('firstName')}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            label='Middle Name'
            variant='outlined'
            fullWidth
            margin='normal'
            {...formik.getFieldProps('middleName')}
          />
          <TextField
            label='Last Name'
            variant='outlined'
            fullWidth
            margin='normal'
            required
            {...formik.getFieldProps('lastName')}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            label='Display Name'
            variant='outlined'
            fullWidth
            margin='normal'
            {...formik.getFieldProps('displayName')}
          />
          <TextField
            label='Email'
            variant='outlined'
            fullWidth
            margin='normal'
            required
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label='Phone Number'
            variant='outlined'
            fullWidth
            margin='normal'
            name='phoneNumber'
            value={formik.values.phoneNumber}
            onChange={handlePhoneNumberChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <DialogActions sx={{ pb: 4 }}>
            <Button onClick={() => setIsCreateAccountDialogOpen(false)} color='primary'>
              Cancel
            </Button>
            <Button type='submit' color='primary' variant='contained'>
              Create
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountForm;
