import {
  Box,
  Card,
  CardContent,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';

import { navigate } from '@reach/router';
import unarmedImg from '../../../assets/unarmed.png';
import Btn from '../../../components/Btn';

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

const MfaLogin = ({ onNext, email, password, setIsSubmitting }) => {
  const classes = useStyles();

  const onLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!email.value || !password.value) {
      return;
    }
    onNext();
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent} style={{ padding: 0 }}>
        <img
          src={unarmedImg}
          alt="404"
          className={classes.unarmedImg}
          onClick={() => navigate('/')}
        />

        <Typography variant="h4" className={classes.cardTitle}>
          Login
        </Typography>
        <Typography variant="body2" className={classes.text}>
          Enter your email address and password to get Access to MFA.
        </Typography>
        <Box className={classes.form}>
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

          <Btn
            className={classes.button}
            text="LOGIN"
            type="submit"
            circularColor="#fff"
            onClick={onLogin}
            color="primary"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MfaLogin;
