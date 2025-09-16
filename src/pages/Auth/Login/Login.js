import { makeStyles } from '@material-ui/core';
import React from 'react';
import Layout from '../../../components/Layout';
import useGoogleTranslate from '../../../hooks/useGoogleTranslate';
import LoginForm from './LoginForm';

const useStyles = makeStyles(() => ({
  login: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#FAFBFF',
  },
  card: {
    width: 500,
    padding: 30,
  },
}));

const Login = () => {
  const classes = useStyles();
  useGoogleTranslate();

  return (
    <Layout>
      <div className={classes.login}>
        <LoginForm />
        <div id="recaptcha" />
      </div>
    </Layout>
  );
};

export default Login;
