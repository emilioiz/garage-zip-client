// src/pages/Accounts.tsx
import { FC } from 'react';

import { Box, Typography } from '@mui/material';

const Accounts: FC = () => {
  return (
    <Box>
      <Typography variant='h4' component='h1' gutterBottom>
        Accounts
      </Typography>
      <Typography variant='body1'>Welcome to the Accounts page!</Typography>
    </Box>
  );
};

export default Accounts;
