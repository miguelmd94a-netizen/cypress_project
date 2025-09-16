import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import oversignImg from '../assets/oversignBlack.png';

const useStyles = makeStyles(() => ({
  content: {
    height: '100vh',
    width: '100vw',
    background: '#F9FAFD',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoOrganization: {
    width: '100%',
    maxHeight: '100px',
    objectFit: 'contain',
    padding: 10,
    alignSelf: 'center',
  },
}));

const LoadingScreen = () => {
  const classes = useStyles();

  return (
    <Box className={classes.content}>
      <img src={oversignImg} alt="404" className={classes.logoOrganization} />
    </Box>
  );
};
export default LoadingScreen;
