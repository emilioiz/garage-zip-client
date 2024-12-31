// src/components/SpeedDial.tsx

import { SpeedDial, SpeedDialIcon } from '@mui/material';

const CustomSpeedDial = ({ children }: { children: React.ReactNode }) => {
  return (
    <SpeedDial
      ariaLabel='SpeedDial for actions'
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {children}
    </SpeedDial>
  );
};

export default CustomSpeedDial;
