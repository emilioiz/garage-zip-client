import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, Button } from '@mui/material';

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
      textAlign='center'
      sx={{ pb: 25 }}
    >
      <Typography variant='h4' component='div'>
        404
      </Typography>
      <Typography variant='h6' component='div' gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant='body2' gutterBottom>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button variant='contained' color='primary' onClick={() => navigate(-1)} sx={{ mt: 4 }}>
        Go Back
      </Button>
    </Box>
  );
};

export default NotFound;
