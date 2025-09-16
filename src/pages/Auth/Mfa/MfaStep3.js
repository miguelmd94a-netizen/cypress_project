import { Box, Typography } from '@material-ui/core';
import React from 'react';
import circle from '../../../assets/circle.png';

export default function MfaStep3() {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <img
          src={circle}
          style={{
            width: 83,
            height: 83,
            objectFit: 'contain',
            marginBottom: 26,
            marginTop: 40,
          }}
        />
      </Box>

      <Typography
        style={{ marginTop: 10, fontSize: 14, color: '#000000AD' }}
        align="center"
      >
        You have set up two-factor authentication successfully. We will send a
        new code to your phone for each login attempt.
      </Typography>
    </>
  );
}
