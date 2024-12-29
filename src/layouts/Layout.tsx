// src/layouts/Layout.tsx
import React, { ReactNode } from 'react';

import { Container, Box } from '@mui/material';

import Header from '../components/Header';
// import Footer from '../components/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        minWidth: '100vw',
        paddingTop: '56px',
      }}
    >
      <Header />
      <Container component='main' maxWidth='sm' sx={{ flexGrow: 1, p: '0px !important' }}>
        {children}
      </Container>
      {/* <Footer /> */}
    </Box>
  );
};

export default Layout;
