// src/pages/Car/CarForm.tsx
import { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { TextField, Button } from '@mui/material';

import FullScreenDialog from '../../components/FullScreenDialog';

interface CarFormProps {
  isEditCarDialogOpen: boolean;
  setIsEditCarDialogOpen: (open: boolean) => void;
}

const CarForm: FC<CarFormProps> = ({ isEditCarDialogOpen, setIsEditCarDialogOpen }) => {
  const formik = useFormik({
    initialValues: {
      year: '2024',
      make: 'Porsche',
      model: '911 Carerra T',
      color: 'Black',
      vin: 'PBS83CD0FP51T12345',
      licensePlate: 'PRC911',
    },
    validationSchema: Yup.object({
      year: Yup.string().required('Year is required'),
      make: Yup.string().required('Make is required'),
      model: Yup.string().required('Model is required'),
      color: Yup.string().required('Color is required'),
      vin: Yup.string().required('VIN is required'),
    }),
    onSubmit: (values) => {
      console.log('Account Edited:', values);
      setIsEditCarDialogOpen(false);
    },
  });

  return (
    <FullScreenDialog
      isOpen={isEditCarDialogOpen}
      onClose={() => setIsEditCarDialogOpen(false)}
      title='Edit Car'
      actions={
        <>
          <Button onClick={() => setIsEditCarDialogOpen(false)} color='warning'>
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
        label='Year'
        variant='outlined'
        fullWidth
        margin='normal'
        required
        {...formik.getFieldProps('firstName')}
        error={formik.touched.year && Boolean(formik.errors.year)}
        helperText={formik.touched.year && formik.errors.year}
      />
      <TextField
        label='Make'
        fullWidth
        margin='normal'
        required
        {...formik.getFieldProps('make')}
        error={formik.touched.make && Boolean(formik.errors.make)}
        helperText={formik.touched.make && formik.errors.make}
      />
      <TextField
        label='Model'
        fullWidth
        margin='normal'
        required
        {...formik.getFieldProps('model')}
        error={formik.touched.model && Boolean(formik.errors.model)}
        helperText={formik.touched.model && formik.errors.model}
      />
      <TextField
        label='Color'
        fullWidth
        margin='normal'
        required
        {...formik.getFieldProps('color')}
        error={formik.touched.color && Boolean(formik.errors.color)}
        helperText={formik.touched.color && formik.errors.color}
      />
      <TextField
        label='VIN'
        fullWidth
        margin='normal'
        required
        {...formik.getFieldProps('vin')}
        error={formik.touched.vin && Boolean(formik.errors.vin)}
        helperText={formik.touched.vin && formik.errors.vin}
      />
      <TextField
        label='License Plate'
        fullWidth
        margin='normal'
        required
        {...formik.getFieldProps('licensePlate')}
        error={formik.touched.licensePlate && Boolean(formik.errors.licensePlate)}
        helperText={formik.touched.licensePlate && formik.errors.licensePlate}
      />
    </FullScreenDialog>
  );
};

export default CarForm;
