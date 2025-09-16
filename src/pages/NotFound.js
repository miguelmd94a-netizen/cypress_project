import { Box, Typography } from '@material-ui/core';
import React from 'react';

const NotFound = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h6">Page Not Found</Typography>
    </Box>
  );
};

export default NotFound;
