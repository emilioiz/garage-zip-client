// src/pages/Car/index.tsx
import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItemText,
  IconButton,
  Divider,
  SpeedDialAction,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

import CustomSpeedDial from '../../components/SpeedDial';
import UserForm from './CarForm';

const SampleCars = [
  {
    id: 'vSiBo7LYXDnHdOnxbRTv',
    year: '2024',
    make: 'Porsche',
    model: '911 Carerra T',
    color: 'Black',
    vin: 'PBS83CD0FP51T12345',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    account: {
      id: 'vSiBo7LYXDnHdOnxbRTv',
      name: 'Account 1',
      disabled: false,
      licensePlate: 'PRC911',
      registrationState: 'CA',
      registrationOwner: 'John Doe',
      registrationExpiration: '2025-12-31',
      carrier: 'XYZ Insurance',
      policyNumber: 'ABC1234567',
      coverageStart: '2024-01-01',
      coverageEnd: '2024-12-31',
      isAssigned: false,
    },
  },
];

const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => navigate(-1)}
      sx={{ width: '5rem', height: '2rem', borderRadius: '0%' }}
      aria-label='go back'
    >
      <ArrowBackIcon sx={{ fontSize: '1.25rem' }} />
      <Typography variant='body1' sx={{ ml: 1 }}>
        Back
      </Typography>
    </IconButton>
  );
};

const Car: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditCarDialogOpen, setIsEditCarDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUser = () => {
      if (!id) {
        setCar(null);
        setLoading(false);
        return;
      }

      const foundCar = SampleCars.find((user) => user.id === id);
      setCar(foundCar);
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  const handleOpenEditCarDialog = () => {
    setIsEditCarDialogOpen(true);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!car) {
    return (
      <Box
        sx={{
          p: 2,
        }}
      >
        <Header />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='h6' sx={{ mt: 5 }}>
            Car not found
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Header />
      <Box sx={{ p: 2, pt: 1 }}>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ mb: 0.5 }}>
            <Typography variant='h5' sx={{ fontWeight: 'bold', fontSize: '1.75rem' }}>
              {car.model}
            </Typography>
          </Box>
          <Typography variant='body1' sx={{ color: car.isAssigned ? 'red' : 'green', mb: 0.5 }}>
            <strong>Status:</strong> {car.isAssigned ? 'Not Assigned' : 'Assigned'}
          </Typography>
        </Box>

        <Box>
          <Typography variant='h6' sx={{ mt: 2 }}>
            Vehicle Information
          </Typography>
          <Divider sx={{ my: 1 }} />
          <List sx={{ pl: 2 }}>
            <ListItemText
              primary={
                <Box display='flex' alignItems='center'>
                  <Typography variant='body1'>Year:</Typography>
                  <Typography variant='body2' sx={{ ml: 1 }}>
                    {car.year}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box display='flex' alignItems='center'>
                  <Typography variant='body1'>Make:</Typography>
                  <Typography variant='body2' sx={{ ml: 1 }}>
                    {car.make}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box display='flex' alignItems='center'>
                  <Typography variant='body1'>Model:</Typography>
                  <Typography variant='body2' sx={{ ml: 1 }}>
                    {car.model}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box display='flex' alignItems='center'>
                  <Typography variant='body1'>Color:</Typography>
                  <Typography variant='body2' sx={{ ml: 1 }}>
                    {car.color}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box display='flex' alignItems='center'>
                  <Typography variant='body1'>VIN:</Typography>
                  <Typography variant='body2' sx={{ ml: 1 }}>
                    {car.vin}
                  </Typography>
                </Box>
              }
            />
          </List>
        </Box>

        <Box>
          <Typography variant='h6' sx={{ mt: 2 }}>
            Registration
          </Typography>
          <Divider sx={{ my: 1 }} />
          <List sx={{ pl: 2 }}>
            <ListItemText
              primary={
                <Box display='flex' alignItems='center'>
                  <Typography variant='body1'>State:</Typography>
                  <Typography variant='body2' sx={{ ml: 1 }}>
                    {car.account.registrationState}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box display='flex' alignItems='center'>
                  <Typography variant='body1'>Owner:</Typography>
                  <Typography variant='body2' sx={{ ml: 1 }}>
                    {car.account.registrationOwner}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box display='flex' alignItems='center'>
                  <Typography variant='body1'>Expiration:</Typography>
                  <Typography variant='body2' sx={{ ml: 1 }}>
                    {car.account.registrationExpiration}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box display='flex' alignItems='center'>
                  <Typography variant='body1'>License Plate:</Typography>
                  <Typography variant='body2' sx={{ ml: 1 }}>
                    {car.account.licensePlate}
                  </Typography>
                </Box>
              }
            />
          </List>
        </Box>

        <Box>
          <Typography variant='h6' sx={{ mt: 2 }}>
            Insurance
          </Typography>
          <Divider sx={{ my: 1 }} />
          <List sx={{ pl: 2 }}>
            <ListItemText
              primary={
                <Box display='flex' alignItems='center'>
                  <Typography variant='body1'>Carrier:</Typography>
                  <Typography variant='body2' sx={{ ml: 1 }}>
                    {car.account.carrier}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box display='flex' alignItems='center'>
                  <Typography variant='body1'>Policy Number:</Typography>
                  <Typography variant='body2' sx={{ ml: 1 }}>
                    {car.account.policyNumber}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box display='flex' alignItems='center'>
                  <Typography variant='body1'>Coverage Start:</Typography>
                  <Typography variant='body2' sx={{ ml: 1 }}>
                    {car.account.coverageStart}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box display='flex' alignItems='center'>
                  <Typography variant='body1'>Coverage End:</Typography>
                  <Typography variant='body2' sx={{ ml: 1 }}>
                    {car.account.coverageEnd}
                  </Typography>
                </Box>
              }
            />
          </List>
        </Box>

        <Box>
          <Typography variant='h6' sx={{ mt: 2 }}>
            Details
          </Typography>
          <Divider sx={{ my: 1 }} />
          <List sx={{ pl: 2 }}>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Typography variant='body1'>Id:</Typography>
                  <Typography variant='body2' sx={{ ml: 1, color: 'rgba(0, 0, 0, 0.6)' }}>
                    {car.id}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Typography variant='body1'>Make:</Typography>
                  <Typography variant='body2' sx={{ ml: 1, color: 'rgba(0, 0, 0, 0.6)' }}>
                    {car.make}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Typography variant='body1'>Model:</Typography>
                  <Typography variant='body2' sx={{ ml: 1, color: 'rgba(0, 0, 0, 0.6)' }}>
                    {car.model}
                  </Typography>
                </Box>
              }
            />

            <ListItemText
              primary={
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Typography variant='body1'>Created At:</Typography>
                  <Typography variant='body2' sx={{ ml: 1, color: 'rgba(0, 0, 0, 0.6)' }}>
                    {car.createdAt}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Typography variant='body1'>Updated At:</Typography>
                  <Typography variant='body2' sx={{ ml: 1, color: 'rgba(0, 0, 0, 0.6)' }}>
                    {car.updatedAt}
                  </Typography>
                </Box>
              }
            />
          </List>
        </Box>
      </Box>

      <UserForm
        isEditCarDialogOpen={isEditCarDialogOpen}
        setIsEditCarDialogOpen={setIsEditCarDialogOpen}
      />

      <CustomSpeedDial>
        <SpeedDialAction
          icon={<EditIcon />}
          tooltipTitle='Edit Car'
          onClick={handleOpenEditCarDialog}
        />
      </CustomSpeedDial>
    </Box>
  );
};

export default Car;
