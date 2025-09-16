import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import { Context } from '../Context';

const useStyles = makeStyles(() => ({
  alert: {
    height: 170,
    width: 270,
    borderLeft: '4px solid rgb(61, 109, 241)',
    position: 'fixed',
    bottom: 60,
    left: 0,
    zIndex: 99,
    background: '#fff',
    borderTopRightRadius: '3px',
    borderBottomRightRadius: '3px',
    boxShadow: '0 4px 8px #ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#585858',
    marginTop: 10,
  },

  button: {
    marginTop: 20,
    borderColor: 'rgb(61, 109, 241)',
    color: 'rgb(61, 109, 241)',
  },
}));

const UpdateAlert = () => {
  const classes = useStyles();
  const { setRequireRefresh } = useContext(Context);
  return ReactDOM.createPortal(
    <Box className={classes.alert}>
      <Box padding="13px" position="relative">
        <CloseIcon
          htmlColor="#585858"
          style={{
            position: 'absolute',
            right: 13,
            fontSize: 18,
            cursor: 'pointer',
          }}
          onClick={() => setRequireRefresh(false)}
        />
        <Typography className={classes.title}>UPDATE</Typography>
        <Typography className={classes.text}>
          A new version is available. Click{' '}
          <span style={{ fontStyle: 'italic' }}>refresh</span> to view.
        </Typography>
        <Button
          className={classes.button}
          variant="outlined"
          onClick={() => window.location.reload(true)}
        >
          REFRESH
        </Button>
      </Box>
    </Box>,
    document.getElementById('alert')
  );
};

export default UpdateAlert;
