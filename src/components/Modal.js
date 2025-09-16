import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, Fade, Modal } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: '#fff',
    boxShadow: theme.shadows[5],
    padding: 30,
    maxWidth: 500,
    alignSelf: 'center',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function ModalPopUp({ children, open, setOpen }) {
  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>{children}</div>
      </Fade>
    </Modal>
  );
}

export default ModalPopUp;
