// src/pages/Accounts.tsx
import { FC } from 'react';

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import FilterListIcon from '@mui/icons-material/FilterList';

const SampleAccounts = [
  {
    id: 1,
    name: 'Account 1',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 2,
    name: 'Account 2',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 3,
    name: 'Account 3',
    disabled: true,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 4,
    name: 'Account 4',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 5,
    name: 'Account 5',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 6,
    name: 'Account 6',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 7,
    name: 'Account 7',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 8,
    name: 'Account 8',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 9,
    name: 'Account 9',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 10,
    name: 'Account 10',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 11,
    name: 'Account 11',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 12,
    name: 'Account 12',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 13,
    name: 'Account 13',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 14,
    name: 'Account 14',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 15,
    name: 'Account 15',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 16,
    name: 'Account 16',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
];

const Accounts: FC = () => {
  return (
    <Box>
      <List>
        {SampleAccounts.map((account) => (
          <ListItemButton key={account.id}>
            <ListItemText primary={account.name} secondary={account.primaryUserEmail} />
            <Box sx={{ ml: 2, textAlign: 'right' }}>
              <Typography variant='body2' color='textSecondary'>
                {account.disabled ? 'Inactive' : 'Active'}
              </Typography>
            </Box>
          </ListItemButton>
        ))}
      </List>
      <SpeedDial
        ariaLabel='SpeedDial for account actions'
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<CreateIcon />}
          tooltipTitle='Create New Account'
          onClick={() => {
            // Add your logic to create a new account here
            console.log('Create New Account clicked');
          }}
        />
        <SpeedDialAction
          icon={<FilterListIcon />}
          tooltipTitle='Filter Accounts'
          onClick={() => {
            // Add your logic to filter accounts here
            console.log('Filter Accounts clicked');
          }}
        />
      </SpeedDial>
    </Box>
  );
};

export default Accounts;
