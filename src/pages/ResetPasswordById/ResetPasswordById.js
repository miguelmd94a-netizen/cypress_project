import {
  Card,
  CardContent,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { navigate, useLocation } from '@reach/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Btn from '../../components/Btn';
import Layout from '../../components/Layout';
import Logo from '../../components/Logo';
import useGoogleTranslate from '../../hooks/useGoogleTranslate';
import useInput from '../../hooks/useInput';
import { onPasswordReset } from '../../services/unarmed';

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

export default function ResetPasswordById({ id }) {
  const classes = useStyles();
  const [isSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const newPassword = useInput('', isSubmitting);
  const confirmPassword = useInput('', isSubmitting);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get('email');
  const code = params.get('code');

  useGoogleTranslate();

  const onResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.value !== confirmPassword.value) {
      toast.error("New password and confirm new password don't match");
      return;
    }
    if (
      !newPassword.value.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*/()-,=+{}[\]<>?`~|;:'".]).{12,}$/
      )
    ) {
      toast.error(
        'Password should be a minimum of 12 characters and include at least one uppercase letter, one lowercase letter, one number, and a special character.'
      );
      return;
    }
    try {
      setLoading(true);

      await onPasswordReset({ email, code, newPassword: newPassword.value });
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Layout>
        <div className={classes.resetContainer}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent} style={{ padding: 0 }}>
              {/* <img src={unarmedImg} alt="404" className={classes.unarmedImg} /> */}
              <Logo />

              <>
                <Typography variant="h4" className={classes.cardTitle}>
                  Reset Password
                </Typography>
                <Typography variant="body2" className={classes.text}>
                  Please enter your new password.
                </Typography>
                <form
                  noValidate
                  onSubmit={onResetPassword}
                  autoComplete="off"
                  className={classes.form}
                >
                  <TextField
                    id="standard-basic"
                    label="New Password"
                    type="password"
                    value={newPassword.value}
                    onChange={newPassword.onChange}
                    className={classes.textField}
                    error={newPassword.error}
                    helperText={newPassword.error}
                  />
                  <TextField
                    id="standard-basic"
                    label="Confirm New Password"
                    type="password"
                    value={confirmPassword.value}
                    onChange={confirmPassword.onChange}
                    className={classes.textField}
                    error={confirmPassword.error}
                    helperText={confirmPassword.error}
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
            </CardContent>
          </Card>
        </div>
      </Layout>
    </div>
  );
}
