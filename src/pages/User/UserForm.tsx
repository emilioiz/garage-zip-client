// src/pages/User/UserForm.tsx
import { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AsYouType } from 'libphonenumber-js';

import { TextField, Button } from '@mui/material';

import FullScreenDialog from '../../components/FullScreenDialog';

interface UserFormProps {
  isEditUserDialogOpen: boolean;
  setIsEditUserDialogOpen: (open: boolean) => void;
}

const UserForm: FC<UserFormProps> = ({ isEditUserDialogOpen, setIsEditUserDialogOpen }) => {
  const formik = useFormik({
    initialValues: {
      firstName: 'John',
      middleName: '',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      displayName: 'John Doe',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: (values) => {
      console.log('Account Edited:', values);
      setIsEditUserDialogOpen(false);
    },
  });

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedNumber = new AsYouType().input(input);

    formik.setFieldValue('phoneNumber', formattedNumber);
  };

  return (
    <FullScreenDialog
      isOpen={isEditUserDialogOpen}
      onClose={() => setIsEditUserDialogOpen(false)}
      title='Edit User'
      actions={
        <>
          <Button onClick={() => setIsEditUserDialogOpen(false)} color='warning'>
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

export default UserForm;
