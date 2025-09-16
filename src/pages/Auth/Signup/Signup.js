import { makeStyles } from '@material-ui/core';
import React from 'react';
import Layout from '../../../components/Layout';
import useGoogleTranslate from '../../../hooks/useGoogleTranslate';
import SignupForm from './SignupForm';

const useStyles = makeStyles(() => ({
  signup: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#FAFBFF',
  },
}));

const Signup = () => {
  const classes = useStyles();
  useGoogleTranslate();

  return (
    <Layout>
      <div className={classes.signup}>
        <SignupForm />
      </div>
    </Layout>
  );
};

export default Signup;
