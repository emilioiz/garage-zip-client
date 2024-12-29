// src/pages/Users.tsx
import { FC } from 'react';

import { Box, Typography } from '@mui/material';

const Users: FC = () => {
  return (
    <Box>
      <Typography variant='h4' component='h1' gutterBottom>
        Users
      </Typography>
      <Typography variant='body1'>Welcome to the Users page!</Typography>
    </Box>
  );
};

export default Users;
