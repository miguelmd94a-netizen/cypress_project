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
import { navigate } from '@reach/router';
import { toast } from 'react-toastify';
import oversignImg from '../../../assets/oversignBlack.png';
import useInput from '../../../hooks/useInput';
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
} from '../../../services/firebase';
import googleIcon from '../../../assets/google.png';
import Btn from '../../../components/Btn';
import LoadingScreen from '../../../components/LoadingScreen';
import { onSignupWithSocial } from '../../../services/unarmed';

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

const LoginForm = () => {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const email = useInput('', isSubmitting);
  const password = useInput('', isSubmitting);
  const [showTwoFactor, setShowTwoFactorCode] = useState(false);
  const verificationCode = useInput('');
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verificationID, setVerificationID] = useState(null);
  const [res, setRes] = useState(null);

  const onLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!email.value || !password.value) {
      return;
    }
    try {
      setLoading(true);
      const { user } = await signInWithEmailAndPassword(
        email.value,
        password.value
      );
      // setTimeout(() => {
      //   if (user.multiFactor.enrolledFactors.length === 0) {
      //     navigate('/mfa');
      //   } else {
      //     navigate('/cases');
      //   }
      //   setLoading(false);
      // }, 1500);
      navigate('/cases');
      setLoading(false);
    } catch (error) {
      if (error.code === 'auth/multi-factor-auth-required') {
        const { resolver } = error;
        setShowTwoFactorCode(true);
        setRes(resolver);
        const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
          size: 'invisible',
        });

        const phoneInfoOptions = {
          multiFactorHint: resolver.hints[0],
          session: resolver.session,
        };
        const phoneAuthProvider = new firebase.auth.PhoneAuthProvider();
        // Send SMS verification code.
        return phoneAuthProvider
          .verifyPhoneNumber(phoneInfoOptions, appVerifier)
          .then(function (verificationId) {
            // verificationId will be needed for sign-in completion.
            setLoading(false);

            setVerificationID(verificationId);
          });
      }

      if (error.code === 'auth/too-many-requests') {
        toast.error('Maximun attempts exceed');
      }
      if (error.code.includes('auth/user-not-found')) {
        email.setError('This email is not registered');
      }
      if (error.code.includes('auth/wrong-password')) {
        password.setError('Please, check your credentials');
      }
      setLoading(false);
    }
  };

  const onVerifyCode = async () => {
    if (!verificationCode.value) {
      verificationCode.setError('Please fill in the input');
      return;
    }
    verificationCode.setError('');

    try {
      setVerifyLoading(true);
      const cred = firebase.auth.PhoneAuthProvider.credential(
        verificationID,
        verificationCode.value
      );
      const multiFactorAssertion = firebase.auth.PhoneMultiFactorGenerator.assertion(
        cred
      );

      // Complete sign-in.

      await res.resolveSignIn(multiFactorAssertion);
      setVerifyLoading(false);
      setLoadingUser(true);
      navigate('/cases');
    } catch (error) {
      if (error.code === 'auth/invalid-verification-code') {
        verificationCode.setError('Upps! Wrong code');
      }
      setVerifyLoading(false);
      setLoadingUser(false);
    }
  };

  if (loadingUser) {
    return <LoadingScreen />;
  }

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent} style={{ padding: 0 }}>
        <img
          src={oversignImg}
          alt="404"
          className={classes.unarmedImg}
          onClick={() => navigate('/')}
        />
        {showTwoFactor ? (
          <>
            <Typography variant="h4" className={classes.cardTitle}>
              Verification Code
            </Typography>
            <Typography
              variant="body2"
              className={classes.text}
              style={{ marginBottom: 15 }}
            >
              We sent the code to {res?.f?.mfaInfo[0]?.phoneInfo}
            </Typography>
            <TextField
              id="standard-basic"
              label="Verification code"
              value={verificationCode.value}
              onChange={verificationCode.onChange}
              className={classes.textField}
              error={verificationCode.error}
              helperText={verificationCode.error}
              inputProps={{ maxLength: 6 }}
            />

            <Btn
              className={classes.button}
              onClick={onVerifyCode}
              loading={verifyLoading}
              text="Verify code"
              color="primary"
              circularColor="#fff"
            />
          </>
        ) : (
          <>
            <Typography variant="h4" className={classes.cardTitle}>
              Login
            </Typography>
            <Typography variant="body2" className={classes.text}>
              Enter your email address and password to access admin panel.
            </Typography>
            <form
              noValidate
              onSubmit={onLogin}
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
              <Box display="flex" justifyContent="flex-end">
                <Typography
                  variant="body2"
                  className={classes.link}
                  style={{ margin: 0 }}
                  onClick={() => navigate('/reset-password')}
                >
                  Reset password <ArrowForwardIcon style={{ fontSize: 13 }} />
                </Typography>
              </Box>

              <Btn
                className={classes.button}
                loading={loading}
                text="LOGIN"
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
              onClick={async () => {
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

                if (usser.code === 'auth/multi-factor-auth-required') {
                  const { resolver } = usser;
                  setShowTwoFactorCode(true);
                  setRes(resolver);
                  const appVerifier = new firebase.auth.RecaptchaVerifier(
                    'recaptcha',
                    { size: 'invisible' }
                  );

                  const phoneInfoOptions = {
                    multiFactorHint: resolver.hints[0],
                    session: resolver.session,
                  };
                  const phoneAuthProvider = new firebase.auth.PhoneAuthProvider();
                  // Send SMS verification code.
                  return phoneAuthProvider
                    .verifyPhoneNumber(phoneInfoOptions, appVerifier)
                    .then(function (verificationId) {
                      // verificationId will be needed for sign-in completion.
                      setLoading(false);

                      setVerificationID(verificationId);
                    });
                }
                await onSignupWithSocial();
                navigate('/mfa');
              }}
            >
              <img src={googleIcon} alt="404" className={classes.googleIcon} />{' '}
              LOGIN WITH GOOGLE
            </Button>

            <Typography
              variant="body2"
              className={classes.link}
              onClick={() => navigate('/signup')}
            >
              Create new account <ArrowForwardIcon style={{ fontSize: 13 }} />
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LoginForm;
