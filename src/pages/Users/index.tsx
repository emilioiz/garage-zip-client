// src/pages/Users/index.tsx
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

import NewUserForm from './NewUserForm';
import CustomSpeedDial from '../../components/SpeedDial';

const SampleUsers = [
  {
    id: 'vSiBo7LYXDnHdOnxbRTv',
    displayname: 'John Doe',
    disabled: false,
    primaryUserEmail: 'john.doe@example.com',
  },
  {
    id: '9xt5hXYN4JIhgJYJ28fm',
    displayname: 'Jane Doe',
    disabled: false,
    primaryUserEmail: 'jane.doe@example.com',
  },
  {
    id: '81iCbarJdhSnkjVDKRLT',
    displayname: 'John Smith',
    disabled: true,
    primaryUserEmail: 'john.smith@example.com',
  },
  {
    id: 'o2Dm8hvhM6092xID6qPn',
    displayname: 'Jane Smith',
    disabled: false,
    primaryUserEmail: 'jane.smith@example.com',
  },
  {
    id: 'BhEwhUpC3VvL9oBSle7Y',
    displayname: 'John Doe',
    disabled: true,
    primaryUserEmail: 'john.doe@example.com',
  },
];

const Users: FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterOption, setFilterOption] = useState('all');
  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] = useState(false);

  const handleOpenCreateUserDialog = () => {
    setIsCreateUserDialogOpen(true);
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

  const filteredUsers = SampleUsers.filter((user) => {
    if (filterOption === 'active') return !user.disabled;
    if (filterOption === 'inactive') return user.disabled;
    return true;
  });

  return (
    <Box>
      <List>
        {filteredUsers.map((user) => (
          <ListItemButton key={user.id} onClick={() => navigate(`/users/${user.id}`)}>
            <ListItemText primary={user.displayname} secondary={user.primaryUserEmail} />
            <Box sx={{ ml: 2, textAlign: 'right' }}>
              <Typography variant='body2' color='textSecondary'>
                {user.disabled ? 'Inactive' : 'Active'}
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
          <FormLabel component='legend'>Filter Users</FormLabel>
          <RadioGroup
            aria-label='filter'
            name='filter'
            value={filterOption}
            onChange={handleFilterChange}
          >
            <FormControlLabel value='all' control={<Radio />} label='All Users' />
            <FormControlLabel value='active' control={<Radio />} label='Active Users' />
            <FormControlLabel value='inactive' control={<Radio />} label='Inactive Users' />
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
            label='Search Users'
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

      <NewUserForm
        isCreateUserDialogOpen={isCreateUserDialogOpen}
        setIsCreateUserDialogOpen={setIsCreateUserDialogOpen}
      />

      <CustomSpeedDial>
        <SpeedDialAction
          icon={<CreateIcon />}
          tooltipTitle='Create New User'
          onClick={handleOpenCreateUserDialog}
        />
        <SpeedDialAction
          icon={<FilterListIcon />}
          tooltipTitle='Filter Users'
          onClick={handleOpenFilterModal}
        />
        <SpeedDialAction
          icon={<SearchIcon />}
          tooltipTitle='Search Users'
          onClick={handleOpenSearchModal}
        />
      </CustomSpeedDial>
    </Box>
  );
};

export default Users;
