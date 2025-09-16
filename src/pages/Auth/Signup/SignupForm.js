import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import firebase from 'firebase/app';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { navigate, useLocation } from '@reach/router';
import { toast } from 'react-toastify';
import useInput from '../../../hooks/useInput';
import googleIcon from '../../../assets/google.png';
import {
  attachFormToSocialSignup,
  onSignupWithSocial,
  signupUser,
} from '../../../services/unarmed';
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOut,
} from '../../../services/firebase';
import Btn from '../../../components/Btn';
import Logo from '../../../components/Logo';
import { Context } from '../../../Context';

const useStyles = makeStyles(() => ({
  card: {
    width: 500,
    padding: 30,
  },
  unarmedImg: {
    objectFit: 'contain',
    height: 60,
    width: 150,
    alignSelf: 'center',
    cursor: 'pointer',
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
  googleButton: {
    width: '100%',
    margin: '20px 0',
    border: '1px solid #0000001F',
  },
  link: {
    color: '#4B7BFF',
    cursor: 'pointer',
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    objectFit: 'cover',
    marginRight: 10,
  },
}));

const emailRgx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignupForm = () => {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const name = useInput('', isSubmitting);
  const lastName = useInput('', isSubmitting);
  const confirmPassword = useInput('', isSubmitting, true);
  const email = useInput('', isSubmitting, true);
  const password = useInput('', isSubmitting, true);
  const location = useLocation();
  const { loadingScreen, setLoadingScreen } = React.useContext(Context);

  const onSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (
      !email.value ||
      !password.value ||
      !name.value ||
      !lastName.value ||
      !confirmPassword.value
    ) {
      return;
    }

    if (!emailRgx.test(email.value)) {
      email.setError('Please use a valid email!');
      return;
    }
    if (password.value !== confirmPassword.value) {
      confirmPassword.setError('Both Passwords must match');
      return;
    }
    if (password.value.length < 12) {
      password.setError('Password must be at least 12 characters long');

      return;
    }
    if (
      !password.value.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*/()-,=+{}[\]<>?`~|;:'".]).{12,}$/
      )
    ) {
      password.setError(
        'Password should be a minimum of 12 characters and include at least one uppercase letter, one lowercase letter, one number, and a special character.'
      );
      return;
    }
    password.setError('');
    confirmPassword.setError('');
    email.setError('');

    try {
      setLoading(true);

      const userData = {
        firstName: name.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      };
      if (location?.state?.formId) {
        userData.formId = location?.state?.formId;
      }

      await signupUser(userData);
      // await logSessionWithToken(data.customToken);
      signInWithEmailAndPassword(email.value, password.value);
      navigate('/cases');
      setLoading(false);
    } catch (error) {
      if (error.response?.data?.message.includes('already exists')) {
        email.setError('This email is already registered');
      }
      toast.error(error);
      setLoading(false);
    }
  };

  const onSignupSocial = async () => {
    try {
      const usser = await signInWithGoogle();

      if (!usser) {
        return;
      }

      if (
        usser.code === 'auth/popup-closed-by-user' ||
        usser.code === 'auth/network-request-failed'
      ) {
        return;
      }

      const formId = location?.state?.formId;
      setLoadingScreen(true);
      await onSignupWithSocial(formId);
      if (formId) {
        const token = await firebase.auth().currentUser.getIdToken();
        await attachFormToSocialSignup(token, formId);
      }
      setLoadingScreen(false);
      await navigate('/mfa');
    } catch (error) {
      console.log(error);
      signOut();
      toast.error(
        'This is user is already register and has a MFA active, Please Login'
      );
      setLoadingScreen(false);
    }
  };

  if (loadingScreen) {
    return <loadingScreen />;
  }
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent} style={{ padding: 0 }}>
        <Logo />

        <Typography variant="h4" className={classes.cardTitle}>
          Create Account
        </Typography>
        <Typography variant="body2" className={classes.text}>
          Don’t have an account? Create your account, it takes less than a
          minute.
        </Typography>
        <form
          noValidate
          onSubmit={onSignup}
          autoComplete="off"
          className={classes.form}
        >
          <TextField
            id="standard-basic"
            label="First name"
            value={name.value}
            onChange={name.onChange}
            className={classes.textField}
            error={name.error}
            helperText={name.error}
          />
          <TextField
            id="standard-basic"
            label="Last name"
            value={lastName.value}
            onChange={lastName.onChange}
            className={classes.textField}
            error={lastName.error}
            helperText={lastName.error}
          />

          <TextField
            id="standard-basic"
            label="Email"
            value={email.value}
            onChange={email.onChange}
            className={classes.textField}
            error={email.error}
            helperText={email.error}
          />
          <TextField
            id="standard-basic"
            label="Password"
            type="password"
            value={password.value}
            onChange={password.onChange}
            className={classes.textField}
            error={password.error}
            helperText={password.error}
          />
          <TextField
            id="standard-basic"
            label="Confirm password"
            type="password"
            value={confirmPassword.value}
            onChange={(e) => {
              confirmPassword.onChange(e);
              if (e.target.value !== password.value) {
                confirmPassword.setError('Both Passwords must match');
              } else {
                confirmPassword.setError('');
              }
            }}
            className={classes.textField}
            error={confirmPassword.error}
            helperText={confirmPassword.error}
          />

          <Btn
            className={classes.button}
            loading={loading}
            text="CREATE ACCOUNT"
            type="submit"
            circularColor="#fff"
            color="primary"
          />
        </form>
        <Box
          display="flex"
          style={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Divider className={classes.divider} />
          Or
          <Divider className={classes.divider} />
        </Box>
        <Button
          variant="outlined"
          className={classes.googleButton}
          onClick={onSignupSocial}
        >
          <img src={googleIcon} alt="404" className={classes.googleIcon} />{' '}
          REGISTER WITH GOOGLE
        </Button>

        <Typography
          variant="body2"
          className={classes.link}
          onClick={() => navigate('/login')}
        >
          Already have an account? Login{' '}
          <ArrowForwardIcon style={{ fontSize: 13 }} />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
