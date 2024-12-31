// src/pages/Account.tsx
import { FC, useEffect, useState } from 'react';
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

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';

import CustomSpeedDial from '../../components/SpeedDial';
import { useDialogContext } from '../../context/DialogContext';
import UserForm from './UserForm';

const SampleUsers = [
  {
    id: 'vSiBo7LYXDnHdOnxbRTv',
    displayName: 'John Doe',
    disabled: false,
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    accounts: [
      {
        id: 'vSiBo7LYXDnHdOnxbRTv',
        name: 'Account 1',
        disabled: false,
        isPointOfContact: true,
        userType: 'Primary',
      },
      {
        id: '9xt5hXYN4JIhgJYJ28fm',
        name: 'Account 2',
        disabled: false,
        isPrimaryUser: false,
        userType: 'Secondary',
      },
    ],
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
const Account: FC = () => {
  const { openDialog } = useDialogContext();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUser = () => {
      if (!id) {
        setUser(null);
        setLoading(false);
        return;
      }

      const foundUser = SampleUsers.find((user) => user.id === id);
      setUser(foundUser);
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  const handleOpenEditUserDialog = () => {
    setIsEditUserDialogOpen(true);
  };

  const handleToggleUserStatus = () => {
    openDialog(
      `Are you sure you want to ${user.disabled ? 'activate' : 'deactivate'} this account?`,
      () => {
        console.log('Toggle User Status');
      },
      'Add',
      'Cancel'
    );
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!user) {
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
          <Box sx={{ mb: 0.5 }}>
            <Typography variant='h5' sx={{ fontWeight: 'bold', fontSize: '1.75rem' }}>
              {user.displayName}
            </Typography>
            <Typography variant='body2' sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
              {user.email}
            </Typography>
            <Typography variant='body2' sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
              {user.phoneNumber}
            </Typography>
          </Box>
          <Typography variant='body1' sx={{ color: user.disabled ? 'red' : 'green', mb: 0.5 }}>
            <strong>Status:</strong> {user.disabled ? 'Inactive' : 'Active'}
          </Typography>
        </Box>

        <Box>
          <Typography variant='h6' sx={{ mt: 2 }}>
            Accounts
          </Typography>
          <Divider sx={{ my: 1 }} />
          <List>
            {user.accounts.map((account: any) => (
              <ListItemButton key={account.id} component={Link} to={`/accounts/${account.id}`}>
                <ListItemText
                  primary={
                    <>
                      {account.name}
                      {account.isPointOfContact && (
                        <StarIcon sx={{ ml: 0.258, fontSize: '1rem', pt: 0.5 }} />
                      )}
                    </>
                  }
                  secondary={account.userType}
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
                    {user.id}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Typography variant='body1'>Created At:</Typography>
                  <Typography variant='body2' sx={{ ml: 1, color: 'rgba(0, 0, 0, 0.6)' }}>
                    {user.createdAt}
                  </Typography>
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Typography variant='body1'>Updated At:</Typography>
                  <Typography variant='body2' sx={{ ml: 1, color: 'rgba(0, 0, 0, 0.6)' }}>
                    {user.updatedAt}
                  </Typography>
                </Box>
              }
            />
          </List>
        </Box>
      </Box>

      <UserForm
        isEditUserDialogOpen={isEditUserDialogOpen}
        setIsEditUserDialogOpen={setIsEditUserDialogOpen}
      />

      <CustomSpeedDial>
        <SpeedDialAction
          icon={<EditIcon />}
          tooltipTitle='Edit User'
          onClick={handleOpenEditUserDialog}
        />
        <SpeedDialAction
          icon={user.disabled ? <PersonAddAlt1Icon /> : <PersonOffIcon />}
          tooltipTitle={user.disabled ? 'Activate User' : 'Deactivate User'}
          onClick={handleToggleUserStatus}
        />
      </CustomSpeedDial>
    </Box>
  );
};

export default Account;
