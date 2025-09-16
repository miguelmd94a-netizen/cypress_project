import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import GetAppIcon from '@material-ui/icons/GetApp';
import formatTxt from '../utils/formatTxt';

const useStyles = makeStyles(() => ({
  container: {
    border: '2px solid #2962FF1F',
    borderRadius: 5,
    padding: 7,
    width: '100%',
  },
  extenstion: {
    width: 50,
    height: 45,
    padding: 10,
    borderRadius: 5,
  },
}));

const ImageDownload = ({ index, name, urlImg, extenstion }) => {
  const classes = useStyles();
  const renderBg = () => {
    if (index === 0) {
      return '#FEB5351A';
    }
    if (index === 1) {
      return '#FF42421A';
    }
    if (index === 2) {
      return '#00C9B21A';
    }
    return '#2962FF1F';
  };
  const renderColor = () => {
    if (index === 0) {
      return '#FEB535';
    }
    if (index === 1) {
      return '#FF4242';
    }
    if (index === 2) {
      return '#00C9B2';
    }
    return '#4B7BFF';
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" className={classes.container}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ background: renderBg() }}
        className={classes.extenstion}
      >
        <strong style={{ color: renderColor(), textTransform: 'uppercase' }}>.{extenstion}</strong>
      </Box>
      <Typography variant="body2">{formatTxt(name, 15)}</Typography>
      <a href={urlImg} download>
        <GetAppIcon fontSize="medium" htmlColor="#4B7BFF" />
      </a>
    </Box>
  );
};

export default ImageDownload;
