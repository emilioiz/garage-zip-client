// src/pages/Users/NewUserForm.tsx
import { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AsYouType } from 'libphonenumber-js';

import { TextField, Button } from '@mui/material';

import FullScreenDialog from '../../components/FullScreenDialog';

interface NewUserFormProps {
  isCreateUserDialogOpen: boolean;
  setIsCreateUserDialogOpen: (open: boolean) => void;
}

const NewUserForm: FC<NewUserFormProps> = ({
  isCreateUserDialogOpen,
  setIsCreateUserDialogOpen,
}) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      displayName: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: (values) => {
      console.log('User Created:', values);
      setIsCreateUserDialogOpen(false);
    },
  });

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedNumber = new AsYouType().input(input);

    formik.setFieldValue('phoneNumber', formattedNumber);
  };

  return (
    <FullScreenDialog
      isOpen={isCreateUserDialogOpen}
      onClose={() => setIsCreateUserDialogOpen(false)}
      title='Create New User'
      actions={
        <>
          <Button onClick={() => setIsCreateUserDialogOpen(false)} color='warning'>
            Cancel
          </Button>
          <Button type='submit' color='primary' variant='contained'>
            Create
          </Button>
        </>
      }
      onSubmit={formik.handleSubmit}
    >
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
    </FullScreenDialog>
  );
};

export default NewUserForm;
