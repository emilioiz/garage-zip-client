// src/pages/Accounts/AccountForm.tsx
import { FC, ChangeEvent, useRef, useState } from 'react';

import {
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  InputAdornment,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

import SearchIcon from '@mui/icons-material/Search';

import { useDialogContext } from '../../context/DialogContext';
import FullScreenDialog from '../../components/FullScreenDialog';

interface UserFormProps {
  isEditUserDialogOpen: boolean;
  setIsEditUserDialogOpen: (open: boolean) => void;
  accountId: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  isPointOfContact: boolean;
  userType: string;
}

const initialUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    isPointOfContact: true,
    userType: 'Primary',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    displayName: 'Jane Smith',
    email: 'jane.smith@example.com',
    isPointOfContact: false,
    userType: 'Primary',
  },
  {
    id: '3',
    firstName: 'Alice',
    lastName: 'Johnson',
    displayName: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    isPointOfContact: false,
    userType: 'Secondary',
  },
  {
    id: '4',
    firstName: 'Bob',
    lastName: 'Brown',
    displayName: 'Bob Brown',
    email: 'bob.brown@example.com',
    isPointOfContact: false,
    userType: '',
  },
];

interface UserTypeSelectionProps {
  defaultValue?: string;
  onChange: (val: string) => void;
}

const UserTypeSelection: FC<UserTypeSelectionProps> = ({ defaultValue = '', onChange }) => {
  const [userType, setUserType] = useState<string>(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setUserType(val);
    onChange(val);
  };

  return (
    <FormControl>
      <RadioGroup value={userType} onChange={handleChange}>
        <FormControlLabel value='Primary' control={<Radio />} label='Primary' />
        <FormControlLabel value='Secondary' control={<Radio />} label='Secondary' />
        <FormControlLabel value='' control={<Radio />} label='None' />
      </RadioGroup>
    </FormControl>
  );
};

const UserForm: FC<UserFormProps> = ({
  isEditUserDialogOpen,
  setIsEditUserDialogOpen,
  accountId,
}) => {
  const { openDialog, openDialogWithContent } = useDialogContext();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedTypeRef = useRef<string>('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAddUser = (userId: string) => {
    console.log('Account Id: ', accountId);
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    selectedTypeRef.current = user.userType;

    openDialogWithContent(
      <UserTypeSelection
        defaultValue={user.userType}
        onChange={(val) => {
          selectedTypeRef.current = val;
        }}
      />,
      () => {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === userId ? { ...u, userType: selectedTypeRef.current } : u))
        );
      },
      'Save',
      'Cancel',
      'Change User Type'
    );
  };

  const handleRemoveUser = (userId: string) => {
    console.log('Account Id: ', accountId);
    openDialog(
      'Are you sure you want to remove this user?',
      () => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === userId ? { ...user, userType: '' } : user))
        );
      },
      'Remove',
      'Cancel'
    );
  };

  const handleMakePointOfContact = (userId: string) => {
    console.log('Account Id: ', accountId);
    openDialog(
      'Are you sure you want to make this user the primary point of contact? An account can only have one point of contact.',
      () => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user.userType !== 'Primary') {
              return { ...user };
            }

            if (user.id === userId) {
              return { ...user, isPointOfContact: !user.isPointOfContact };
            }

            return { ...user, isPointOfContact: false };
          })
        );
      },
      'Confirm',
      'Cancel'
    );
  };

  const filteredUsers = searchQuery
    ? users.filter(
        (user) =>
          user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users.filter((user) => user.userType !== '');

  return (
    <FullScreenDialog
      isOpen={isEditUserDialogOpen}
      onClose={() => setIsEditUserDialogOpen(false)}
      title='Manage Users'
      actions={
        <Button onClick={() => setIsEditUserDialogOpen(false)} color='primary'>
          Close
        </Button>
      }
    >
      <TextField
        label='Search Users'
        variant='outlined'
        fullWidth
        margin='normal'
        value={searchQuery}
        onChange={handleSearchChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <Divider sx={{ my: 2 }} />
      {filteredUsers.length === 0 ? (
        <Box sx={{ mt: 10, mb: 10, textAlign: 'center' }}>
          <Typography variant='h6'>No Users Found</Typography>
        </Box>
      ) : (
        <List>
          {filteredUsers.map((user) => {
            const isPOC = user.isPointOfContact;
            const canBePOC = user.userType === 'Primary';
            const isAssigned = user.userType !== '';

            return (
              <ListItem key={user.id}>
                <Box sx={{ width: '100%' }}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <ListItemText primary={user.displayName} secondary={user.email} />
                      <ListItemText secondary={user.userType} sx={{ textAlign: 'right' }} />
                    </Box>
                  </Box>
                  <Divider sx={{ my: 0.1 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title='Make Point of Contact for Account' arrow>
                      <span>
                        <IconButton
                          onClick={() => handleMakePointOfContact(user.id)}
                          disabled={!canBePOC}
                        >
                          {isPOC ? <StarIcon /> : <StarOutlineIcon />}
                        </IconButton>
                      </span>
                    </Tooltip>

                    <Tooltip title='Add/Adjust User on Account' arrow>
                      <span>
                        <IconButton onClick={() => handleAddUser(user.id)}>
                          <PersonAddIcon />
                        </IconButton>
                      </span>
                    </Tooltip>

                    <Tooltip title='Remove from Account' arrow>
                      <span>
                        <IconButton
                          onClick={() => handleRemoveUser(user.id)}
                          disabled={!isAssigned}
                        >
                          <PersonRemoveIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Box>
                  <Divider sx={{ my: 0.1 }} />
                </Box>
              </ListItem>
            );
          })}
        </List>
      )}
    </FullScreenDialog>
  );
};

export default UserForm;
