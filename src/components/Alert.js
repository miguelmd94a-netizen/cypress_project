import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import CancelIcon from '@material-ui/icons/Cancel';

const alertStatus = {
  info: '#4B7BFF',
  error: '#FC3A3A',
  warning: '#FEC664',
};

const useStyles = makeStyles(() => ({
  alertContainer: {
    height: 52,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px',
    borderRadius: 2,
    marginTop: 35,
    marginBottom: 10,
  },
  text: {},
}));

const Alert = ({ children, onClick, status = 'error' }) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.alertContainer}
      style={{
        borderLeft: `6px solid ${alertStatus[status]}`,
        background: `${alertStatus[status]}10`,
      }}
    >
      <Box display="flex" alignItems="center">
        <InfoIcon htmlColor={alertStatus[status]} style={{ marginRight: 12 }} />
        {children}
      </Box>
      {typeof onClick === 'function' && (
        <CancelIcon
          htmlColor="#6D7385"
          onClick={onClick}
          style={{ cursor: 'pointer' }}
        />
      )}
    </Box>
  );
};

export default Alert;
