// src/pages/Accounts/index.tsx
import { FC, KeyboardEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  SpeedDialAction,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';

import CreateIcon from '@mui/icons-material/Create';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';

import AccountForm from './AccountForm';
import CustomSpeedDial from '../../components/SpeedDial';

const SampleAccounts = [
  {
    id: 'vSiBo7LYXDnHdOnxbRTv',
    name: 'Account 1',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: '9xt5hXYN4JIhgJYJ28fm',
    name: 'Account 2',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: '81iCbarJdhSnkjVDKRLT',
    name: 'Account 3',
    disabled: true,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 'o2Dm8hvhM6092xID6qPn',
    name: 'Account 4',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 'BhEwhUpC3VvL9oBSle7Y',
    name: 'Account 5',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 'ACuTvok6Kr95mjqU36u9',
    name: 'Account 6',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 'AWXJtjYLQKZ884fJVTAm',
    name: 'Account 7',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 'MYVHx77EIj68N3Btmv71',
    name: 'Account 8',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 'vhyKNEgd0kCsWQOMK6Gh',
    name: 'Account 9',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 'GF8qThPb8JHWK1GwBX8d',
    name: 'Account 10',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 'EzEsk1W5mJeY4MKBr1XV',
    name: 'Account 11',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 'HBcIPP7s9gYhuzEn5UpH',
    name: 'Account 12',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 'GYe7L2iR8eY1sZCFbocl',
    name: 'Account 13',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 'CQuVQp1RnEjyTHhzRlZP',
    name: 'Account 14',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 'VEdLosHMF2kvyQBa4Pdo',
    name: 'Account 15',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
  {
    id: 'oBtycDdhzkML8l4j7J1f',
    name: 'Account 16',
    disabled: false,
    primaryUserEmail: 'test@test.com',
  },
];

const Accounts: FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterOption, setFilterOption] = useState('all');
  const [isCreateAccountDialogOpen, setIsCreateAccountDialogOpen] = useState(false);

  const handleOpenCreateAccountDialog = () => {
    setIsCreateAccountDialogOpen(true);
  };

  const handleOpenSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOption(event.target.value);
  };

  const handleSearchKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCloseSearchModal();
    }
  };

  const filteredAccounts = SampleAccounts.filter((account) => {
    if (filterOption === 'active') return !account.disabled;
    if (filterOption === 'inactive') return account.disabled;
    return true;
  });

  return (
    <Box>
      <List>
        {filteredAccounts.map((account) => (
          <ListItemButton key={account.id} onClick={() => navigate(`/accounts/${account.id}`)}>
            <ListItemText primary={account.name} secondary={account.primaryUserEmail} />
            <Box sx={{ ml: 2, textAlign: 'right' }}>
              <Typography variant='body2' color='textSecondary'>
                {account.disabled ? 'Inactive' : 'Active'}
              </Typography>
            </Box>
          </ListItemButton>
        ))}
      </List>

      <Dialog
        open={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        disableRestoreFocus
        fullWidth
        maxWidth='sm'
      >
        <DialogContent>
          <FormLabel component='legend'>Filter Accounts</FormLabel>
          <RadioGroup
            aria-label='filter'
            name='filter'
            value={filterOption}
            onChange={handleFilterChange}
          >
            <FormControlLabel value='all' control={<Radio />} label='All Accounts' />
            <FormControlLabel value='active' control={<Radio />} label='Active Accounts' />
            <FormControlLabel value='inactive' control={<Radio />} label='Inactive Accounts' />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFilterModal} color='primary' variant='contained'>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isSearchModalOpen}
        onClose={handleCloseSearchModal}
        disableRestoreFocus
        fullWidth
        maxWidth='sm'
      >
        <DialogContent>
          <TextField
            label='Search Accounts'
            variant='outlined'
            fullWidth
            margin='normal'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyPress}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSearchModal} color='primary' variant='contained'>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <AccountForm
        isCreateAccountDialogOpen={isCreateAccountDialogOpen}
        setIsCreateAccountDialogOpen={setIsCreateAccountDialogOpen}
      />

      <CustomSpeedDial>
        <SpeedDialAction
          icon={<CreateIcon />}
          tooltipTitle='Create New Account'
          onClick={handleOpenCreateAccountDialog}
        />
        <SpeedDialAction
          icon={<FilterListIcon />}
          tooltipTitle='Filter Accounts'
          onClick={handleOpenFilterModal}
        />
        <SpeedDialAction
          icon={<SearchIcon />}
          tooltipTitle='Search Accounts'
          onClick={handleOpenSearchModal}
        />
      </CustomSpeedDial>
    </Box>
  );
};

export default Accounts;
