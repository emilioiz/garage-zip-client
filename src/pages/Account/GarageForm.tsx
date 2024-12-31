// src/pages/Accounts/GarageForm.tsx
import { FC, ChangeEvent, useState } from 'react';

import {
  TextField,
  Button,
  InputAdornment,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Divider,
  Tooltip,
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import SearchIcon from '@mui/icons-material/Search';

import { useDialogContext } from '../../context/DialogContext';
import FullScreenDialog from '../../components/FullScreenDialog';

interface GarageFormProps {
  isEditGarageDialogOpen: boolean;
  setIsEditGarageDialogOpen: (open: boolean) => void;
  accountId: string;
}

const initialCars = [
  {
    id: '1',
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

const GarageForm: FC<GarageFormProps> = ({
  isEditGarageDialogOpen,
  setIsEditGarageDialogOpen,
  accountId,
}) => {
  const { openDialog } = useDialogContext();
  const [cars, setCars] = useState(initialCars);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAddCar = (carId: string) => {
    console.log('Account Id: ', accountId);
    openDialog(
      'Are you sure you want to add this car to the account?',
      () => {
        setCars((prevCars) =>
          prevCars.map((car) => (car.id === carId ? { ...car, isAssigned: true } : car))
        );
      },
      'Add',
      'Cancel'
    );
  };

  const handleRemoveCar = (carId: string) => {
    console.log('Account Id: ', accountId);
    openDialog(
      'Are you sure you want to remove this car from the account?',
      () => {
        setCars((prevCars) =>
          prevCars.map((car) => (car.id === carId ? { ...car, isAssigned: false } : car))
        );
      },
      'Remove',
      'Cancel'
    );
  };

  const filteredCars = searchQuery
    ? cars.filter(
        (car) =>
          car.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cars.filter((car) => car.isAssigned);

  return (
    <FullScreenDialog
      isOpen={isEditGarageDialogOpen}
      onClose={() => setIsEditGarageDialogOpen(false)}
      title='Manage Garage'
      actions={
        <Button onClick={() => setIsEditGarageDialogOpen(false)} color='primary'>
          Close
        </Button>
      }
    >
      <TextField
        label='Search Cars'
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
      {filteredCars.length === 0 ? (
        <Box sx={{ mt: 10, mb: 10, textAlign: 'center' }}>
          <Typography variant='h6'>No Users Found</Typography>
        </Box>
      ) : (
        <Box sx={{ width: '100%' }}>
          <List>
            {filteredCars.map((car) => {
              return (
                <ListItem key={car.id} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      car.isAssigned ? handleRemoveCar(car.id) : handleAddCar(car.id);
                    }}
                  >
                    <ListItemIcon>
                      {car.isAssigned ? (
                        <Tooltip title='Remove from Account' arrow>
                          <span>
                            <RemoveCircleIcon />
                          </span>
                        </Tooltip>
                      ) : (
                        <Tooltip title='Add to Account' arrow>
                          <span>
                            <AddCircleIcon />
                          </span>
                        </Tooltip>
                      )}
                    </ListItemIcon>
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
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}
    </FullScreenDialog>
  );
};

export default GarageForm;
