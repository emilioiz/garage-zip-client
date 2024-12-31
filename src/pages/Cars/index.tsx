// src/pages/Cars/index.tsx
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

import NewUserForm from './NewCarForm';
import CustomSpeedDial from '../../components/SpeedDial';

const SampleCars = [
  {
    id: 'vSiBo7LYXDnHdOnxbRTv',
    year: '2024',
    make: 'Porsche',
    model: '911 Carerra T',
    color: 'Black',
    vin: 'PBS83CD0FP51T12345',
    licensePlate: 'PRC911',
    isAssigned: true,
  },
  {
    id: '2',
    year: '2023',
    make: 'BMW',
    model: 'M3 Competition',
    color: 'Alpine White',
    vin: 'WBS83CD0XP5T12345',
    licensePlate: 'BMW2023',
    isAssigned: true,
  },
  {
    id: '3',
    year: '2023',
    make: 'Mercedes-Benz',
    model: 'AMG GT 63',
    color: 'Obsidian Black',
    vin: 'WDDYJ7JA3PA012345',
    licensePlate: 'AMGGT63',
    isAssigned: false,
  },
  {
    id: '4',
    year: '2024',
    make: 'Audi',
    model: 'RS e-tron GT',
    color: 'Daytona Gray',
    vin: 'WUAPCYFF8PA123456',
    licensePlate: 'ETRNGT',
    isAssigned: false,
  },
  {
    id: '5',
    year: '2023',
    make: 'Ferrari',
    model: '296 GTB',
    color: 'Rosso Corsa',
    vin: 'ZFF89HGB8P0123456',
    licensePlate: 'FERR296',
    isAssigned: false,
  },
  {
    id: '6',
    year: '2024',
    make: 'Lamborghini',
    model: 'Huracan STO',
    color: 'Verde Mantis',
    vin: 'ZHWBE2ZF9PL123456',
    licensePlate: 'HURSTO',
    isAssigned: false,
  },
  {
    id: '7',
    year: '2023',
    make: 'McLaren',
    model: '765LT Spider',
    color: 'Papaya Spark',
    vin: 'SBM13PAA6PW123456',
    licensePlate: 'MCL765',
    isAssigned: false,
  },
];

const Users: FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterOption, setFilterOption] = useState('all');
  const [isCreateCarDialogOpen, setIsCreateCarDialogOpen] = useState(false);

  const handleOpenCreateCarDialog = () => {
    setIsCreateCarDialogOpen(true);
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

  const filteredCars = SampleCars.filter((car) => {
    if (filterOption === 'active') return !car.isAssigned;
    if (filterOption === 'inactive') return car.isAssigned;
    return true;
  });

  return (
    <Box>
      <List>
        {filteredCars.map((car) => (
          <ListItemButton key={car.id} onClick={() => navigate(`/cars/${car.id}`)}>
            <ListItemText
              primary={`${car.make} ${car.model}`}
              secondary={
                <>
                  <Typography variant='body2' component='span' sx={{ display: 'block' }}>
                    {car.year} | {car.color} | {car.licensePlate}
                  </Typography>
                  <Typography variant='body2' component='span' sx={{ display: 'block' }}>
                    {car.vin}
                  </Typography>
                </>
              }
            />
            <Box sx={{ ml: 2, textAlign: 'right' }}>
              <Typography variant='body2' color='textSecondary'>
                {car.isAssigned ? 'Not Assigned' : 'Assigned'}
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
        isCreateCarDialogOpen={isCreateCarDialogOpen}
        setIsCreateCarDialogOpen={setIsCreateCarDialogOpen}
      />

      <CustomSpeedDial>
        <SpeedDialAction
          icon={<CreateIcon />}
          tooltipTitle='Create New Car'
          onClick={handleOpenCreateCarDialog}
        />
        <SpeedDialAction
          icon={<FilterListIcon />}
          tooltipTitle='Filter Car'
          onClick={handleOpenFilterModal}
        />
        <SpeedDialAction
          icon={<SearchIcon />}
          tooltipTitle='Search Car'
          onClick={handleOpenSearchModal}
        />
      </CustomSpeedDial>
    </Box>
  );
};

export default Users;
