// src/pages/Account/index.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
  SpeedDialAction,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import CustomSpeedDial from '../../components/SpeedDial';
import AccountForm from './AccountForm';
import UsersForm from './UsersForm';
import GarageForm from './GarageForm';

const SampleAccounts = [
  {
    id: 'vSiBo7LYXDnHdOnxbRTv',
    name: 'Account 1',
    disabled: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    primaryUsers: [
      {
        id: '6MEZsaoF7Dx9oeQE7p9v',
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        isPointOfContact: true,
      },
      {
        id: '1K9iipZUySPEuz3d4fyF',
        firstName: 'Jane',
        middleName: 'Doe',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phoneNumber: '0987654321',
        isPointOfContact: false,
      },
    ],
    secondaryUsers: [
      {
        id: 'Y0irKFX3vOC24aUOATSZ',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phoneNumber: '0987654321',
      },
      {
        id: '3gmbYK7r26CntlEirqvv',
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@example.com',
        phoneNumber: '1122334455',
      },
    ],
    cars: [
      {
        id: 'J9Rul8DtPhic4UOLoqb8',
        make: 'Porsche',
        model: '911 Carrera T',
        year: 2024,
        vin: '1234567890',
      },
    ],
  },
];

const Header: React.FC = () => {
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
const Account: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [account, setAccount] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditAccountDialogOpen, setIsEditAccountDialogOpen] = useState(false);
  const [isEditUsersDialogOpen, setIsEditUsersDialogOpen] = useState(false);
  const [isEditGarageDialogOpen, setIsEditGarageDialogOpen] = useState(false);

  useEffect(() => {
    const fetchAccount = () => {
      if (!id) {
        setAccount(null);
        setLoading(false);
        return;
      }

      const foundAccount = SampleAccounts.find((acc) => acc.id === id);
      setAccount(foundAccount);
      setLoading(false);
    };

    fetchAccount();
  }, [id]);

  const handleOpenEditAccountDialog = () => {
    setIsEditAccountDialogOpen(true);
  };

  const handleOpenEditUserDialog = () => {
    setIsEditUsersDialogOpen(true);
  };

  const handleOpenEditGarageDialog = () => {
    setIsEditGarageDialogOpen(true);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!account) {
    return (
      <Box
        sx={{
          p: 2,
        }}
      >
        <Header />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='h6' sx={{ mt: 5 }}>
            Account not found
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
          <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 0.5, fontSize: '1.75rem' }}>
            {account.name}
          </Typography>
          <Typography variant='body1' sx={{ color: account.disabled ? 'red' : 'green', mb: 0.5 }}>
            <strong>Status:</strong> {account.disabled ? 'Inactive' : 'Active'}
          </Typography>
        </Box>

        <Box>
          <Typography variant='h6' sx={{ mt: 2 }}>
            Primary Users
          </Typography>
          <Divider sx={{ my: 1 }} />
          <List>
            {account.primaryUsers.map((user: any) => (
              <ListItemButton key={user.id} component={Link} to={`/users/${user.id}`}>
                <ListItemText
                  primary={
                    <>
                      {user.firstName} {user.lastName}
                      {user.isPointOfContact && (
                        <StarIcon sx={{ ml: 0.258, fontSize: '1rem', pt: 0.5 }} />
                      )}
                    </>
                  }
                  secondary={user.email}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Box>
          <Typography variant='h6' sx={{ mt: 2 }}>
            Secondary Users
          </Typography>
          <Divider sx={{ my: 1 }} />
          <List>
            {account.secondaryUsers.map((user: any) => (
              <ListItemButton key={user.id} component={Link} to={`/users/${user.id}`}>
                <ListItemText
                  primary={`${user.firstName} ${user.lastName}`}
                  secondary={user.email}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Box>
          <Typography variant='h6' sx={{ mt: 2 }}>
            Garage
          </Typography>
          <Divider sx={{ my: 1 }} />
          <List>
            {account.cars.map((car: any) => (
              <ListItemButton key={car.id} component={Link} to={`/cars/${car.id}`}>
                <ListItemText
                  primary={`${car.make} ${car.model}`}
                  secondary={`Year: ${car.year}`}
                />
              </ListItemButton>
            ))}
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
                    {account.id}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Typography variant='body1'>Created At:</Typography>
                  <Typography variant='body2' sx={{ ml: 1, color: 'rgba(0, 0, 0, 0.6)' }}>
                    {account.createdAt}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Typography variant='body1'>Updated At:</Typography>
                  <Typography variant='body2' sx={{ ml: 1, color: 'rgba(0, 0, 0, 0.6)' }}>
                    {account.updatedAt}
                  </Typography>
                </Box>
              }
            />
          </List>
        </Box>
      </Box>

      <AccountForm
        isEditAccountDialogOpen={isEditAccountDialogOpen}
        setIsEditAccountDialogOpen={setIsEditAccountDialogOpen}
      />

      <UsersForm
        isEditUsersDialogOpen={isEditUsersDialogOpen}
        setIsEditUsersDialogOpen={setIsEditUsersDialogOpen}
        accountId={account.id}
      />

      <GarageForm
        isEditGarageDialogOpen={isEditGarageDialogOpen}
        setIsEditGarageDialogOpen={setIsEditGarageDialogOpen}
        accountId={account.id}
      />

      <CustomSpeedDial>
        <SpeedDialAction
          icon={<EditIcon />}
          tooltipTitle='Edit Account'
          onClick={handleOpenEditAccountDialog}
        />
        <SpeedDialAction
          icon={<GroupIcon />}
          tooltipTitle='Add/Remove User'
          onClick={handleOpenEditUserDialog}
        />
        <SpeedDialAction
          icon={<DirectionsCarIcon />}
          tooltipTitle='Add/Remove Car'
          onClick={handleOpenEditGarageDialog}
        />
      </CustomSpeedDial>
    </Box>
  );
};

export default Account;
