// src/components/Footer.tsx
import { FC } from 'react';
import { Box, Typography } from '@mui/material';

const Footer: FC = () => {
  return (
    <Box component='footer' sx={{ py: 2, textAlign: 'center', mt: 'auto' }}>
      <Typography variant='body2' color='textSecondary'>
        © {new Date().getFullYear()} Garage Zip, Inc, Miami, FL. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
