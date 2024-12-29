// src/pages/Dashboard.tsx
import { FC } from 'react';

import { Box, Typography } from '@mui/material';

const Dashboard: FC = () => {
  return (
    <Box>
      <Typography variant='h4' component='h1' gutterBottom>
        Dashboard
      </Typography>
      <Typography variant='body1'>Welcome to the Dashboard page!</Typography>
    </Box>
  );
};

export default Dashboard;
