import {
  makeStyles,
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
  Grid,
} from '@material-ui/core';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Alert from '../../components/Alert';
import useInput from '../../hooks/useInput';
import { changeUserpasswordFromProfile } from '../../services/unarmed';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 20,
  },
  title: {
    marginTop: 50,
  },
  button: {
    background: ' #1F63FF',
    textTransform: 'capitalize',
    marginRight: 10,
    color: '#fff',
    height: 36,
    width: 30,
    '&:hover': {
      background: '#1F63FF',
    },
    '& .MuiButton-label': {
      fontSize: 13,
    },
    '&:disabled': {
      background: '#1f63ff61',
      color: '#fff',
    },
  },
  button2: {
    background: ' #1F63FF',
    textTransform: 'capitalize',
    color: '#fff',
    '&:hover': {
      background: '#1F63FF',
    },
    '& .MuiButton-label': {
      fontSize: 14,
    },
  },
  buttonOutlined: {
    letterSpacing: '1px',
    fontSize: 13,
    fontWeight: '500',
    marginRight: 10,
    width: 'fit-content',
    alignSelf: 'flex-end',
    border: 0,
    color: '#4b7bff',
    '&:hover': {
      background: 'transparent',
      border: 0,
    },
    '& .MuiButton-label': {
      fontSize: 13,
    },
    '&:disabled': {
      border: 0,
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#fff',
    boxShadow: theme.shadows[5],
    padding: 30,
    maxWidth: 500,
    minWidth: 400,
    outline: 0,
  },
}));

export default function ChangePassord({ setOpen }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const currentPassword = useInput('');
  const newPassword = useInput('');
  const confirmNewPassword = useInput('');

  const onChangePassword = async () => {
    if (newPassword.value !== confirmNewPassword.value) {
      toast.error("New password and confirm new password don't match");
      return;
    } else if (
      !newPassword.value.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*/()-,=+{}[\]<>?`~|;:'".]).{12,}$/
      )
    ) {
      toast.error(
        'Password should be a minimum of 12 characters and include at least one uppercase letter, one lowercase letter, one number, and a special character.'
      );
      return;
    }
    setLoading(true);
    try {
      await changeUserpasswordFromProfile({
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
      });
      toast.success('Change password success');
      setOpen(false);
    } catch (error) {
      if (error.response.status === 422) {
        toast.error("Current password and new password can't be the same");
      } else {
        toast.error(error.response?.data?.message);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Typography style={{ fontSize: 20, fontWeight: '500' }}>
        Change Password
      </Typography>
      <Alert status="warning">
        <Typography style={{ fontSize: 14, fontWeight: '500' }}>
          Your current password will expire in 20 days.
        </Typography>
      </Alert>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="standard-required1"
            label={<Typography> Current Password</Typography>}
            type="password"
            style={{ width: '100%' }}
            value={currentPassword.value}
            onChange={currentPassword.onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="standard-required1"
            label={<Typography> New Password</Typography>}
            type="password"
            style={{ width: '100%' }}
            value={newPassword.value}
            onChange={newPassword.onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="standard-required1"
            type="password"
            label={<Typography> Confirm New Password</Typography>}
            style={{ width: '100%' }}
            value={confirmNewPassword.value}
            onChange={confirmNewPassword.onChange}
          />
        </Grid>
      </Grid>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        marginTop="20px"
      >
        <Button
          variant="outlined"
          className={classes.buttonOutlined}
          style={{ color: '#ccc' }}
          onClick={() => setOpen(false)}
        >
          CANCEL
        </Button>
        <Button
          variant="outlined"
          className={classes.buttonOutlined}
          onClick={onChangePassword}
          disabled={
            loading ||
            !currentPassword.value ||
            !newPassword.value ||
            !confirmNewPassword.value
          }
        >
          {loading ? (
            <CircularProgress color="#4b7bff" size="25px" />
          ) : (
            'CHANGE'
          )}
        </Button>
      </Box>
    </>
  );
}
