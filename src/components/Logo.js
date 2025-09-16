/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { navigate } from '@reach/router';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import oversignImgBlack from '../assets/oversignBlack.png';
import oversignImgWhite from '../assets/oversignWhite.png';

const useStyles = makeStyles(() => ({
  unarmedImg: {
    objectFit: 'contain',
    alignSelf: 'center',
    cursor: 'pointer',
  },
}));

export default function Logo({ height = 70, width = 200, logo = 'black' }) {
  const classes = useStyles();
  return (
    <img
      src={logo === 'black' ? oversignImgBlack : oversignImgWhite}
      alt="404"
      style={{ height, width }}
      className={classes.unarmedImg}
      onClick={() => navigate('/')}
    />
  );
}

Logo.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  logo: PropTypes.string,
};
