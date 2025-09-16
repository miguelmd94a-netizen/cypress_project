import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

import { navigate, useLocation } from '@reach/router';
import useInput from '../../../hooks/useInput';
import Layout from '../../../components/Layout';
import useGoogleTranslate from '../../../hooks/useGoogleTranslate';
import Btn from '../../../components/Btn';
import Logo from '../../../components/Logo';
import { getPasswordReset } from '../../../services/unarmed';
import { getOrg } from '../../../utils';

const useStyles = makeStyles(() => ({
  card: {
    width: 500,
    padding: 30,
  },
  resetContainer: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#FAFBFF',
  },
  unarmedImg: {
    objectFit: 'cover',
    height: 60,
    width: 150,
    alignSelf: 'center',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },
  cardTitle: {
    marginTop: 20,
    fontWeight: '500',
  },
  text: {
    color: '#00000099',
  },
  form: {
    marginTop: 10,
  },
  textField: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    background: ' #364F74',
    color: '#fff',
    width: '100%',
    ':hover': {
      background: '#364F74',
    },
    marginTop: 10,
    marginBottom: 20,
  },

  divider: {
    width: '47%',
    background: '#0000001F',
  },
}));
const emailRgx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ResetPassword = () => {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const email = useInput('', isSubmitting);
  const [status, setStatus] = useState(0);
  const Location = useLocation();
  useGoogleTranslate();

  const onResetPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!email.value) {
      return;
    }
    if (!emailRgx.test(email.value)) {
      email.setError('Please use a valid email!');
      return;
    }
    try {
      setLoading(true);
      await getPasswordReset(email.value, getOrg(Location));
      setStatus(1);
      setLoading(false);
    } catch ({ code }) {
      if (code.includes('auth/user-not-found')) {
        email.setError('This email is not registered');
      } else {
        email.setError('Email exceed the maximun tries');
      }
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={classes.resetContainer}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent} style={{ padding: 0 }}>
            {/* <img src={unarmedImg} alt="404" className={classes.unarmedImg} /> */}
            <Logo />
            {status === 0 && (
              <>
                <Typography variant="h4" className={classes.cardTitle}>
                  Reset Password
                </Typography>
                <Typography variant="body2" className={classes.text}>
                  Enter your email address to reset your password.
                </Typography>
                <form
                  noValidate
                  onSubmit={onResetPassword}
                  autoComplete="off"
                  className={classes.form}
                >
                  <TextField
                    id="standard-basic"
                    label="Email"
                    value={email.value}
                    onChange={email.onChange}
                    className={classes.textField}
                    error={email.error}
                    helperText={email.error}
                  />

                  <Btn
                    className={classes.button}
                    loading={loading}
                    text="RESET PASSWORD"
                    type="submit"
                    color="primary"
                    circularColor="#fff"
                  />
                </form>
              </>
            )}
            {status === 1 && (
              <Box>
                <Typography
                  variant="h4"
                  className={classes.cardTitle}
                  style={{ textAlign: 'center' }}
                >
                  Email Sent
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.text}
                  style={{ textAlign: 'center', marginBottom: 10 }}
                >
                  Please check your email to reset your password
                </Typography>
                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ResetPassword;
