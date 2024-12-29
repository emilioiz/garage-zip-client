// src/components/Header.tsx
import { FC, useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useUser } from '../context/UserContext';
import { useDialogContext } from '../context/DialogContext';
import { useAlertContext } from '../context/AlertContext';

const Logo = () => {
  return (
    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
      Garage Zip
    </Typography>
  );
};

const AuthHeader: FC<{
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ drawerOpen, setDrawerOpen }) => {
  const { openDialog } = useDialogContext();
  const { setAlert } = useAlertContext();
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSignOut = () => {
    openDialog('Are you sure you want to sign out?', () => {
      const auth = getAuth();
      signOut(auth)
        .then(() => setAlert('success', 'Signed out successfully'))
        .catch((error) => {
          console.error('Error signing out: ', error);
          setAlert('error', 'Failed to sign out.');
        });
    });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <Toolbar>
      <Logo />
      <IconButton edge='end' color='inherit' onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor='top' open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItemButton onClick={() => handleNavigate('/')}>
            <ListItemText primary='Dashboard' />
          </ListItemButton>
          <ListItemButton onClick={() => handleNavigate('/accounts')}>
            <ListItemText primary='Accounts' />
          </ListItemButton>
          <ListItemButton onClick={() => handleNavigate('/users')}>
            <ListItemText primary='Users' />
          </ListItemButton>
        </List>
        <Divider />
        <List>
          <ListItemButton onClick={handleSignOut}>
            <ListItemText primary='Sign Out' />
          </ListItemButton>
        </List>
      </Drawer>
    </Toolbar>
  );
};

const UnAuthHeader: React.FC = () => {
  return (
    <Toolbar>
      <Logo />
    </Toolbar>
  );
};

const Header: React.FC = () => {
  const { user } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setDrawerOpen(false);
    }
  }, [user]);

  return (
    <AppBar position='static'>
      {user ? (
        <AuthHeader drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      ) : (
        <UnAuthHeader />
      )}
    </AppBar>
  );
};

export default Header;
