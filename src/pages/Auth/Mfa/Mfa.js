import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import firebase from 'firebase/app';
import { toast } from 'react-toastify';
import { navigate } from '@reach/router';
import Layout from '../../../components/Layout';
import useInput from '../../../hooks/useInput';
import MfaStep1 from './MfaStep1';
import MfaStep2 from './MfaStep2';
import MfaStep3 from './MfaStep3';
import MfaLogin from './MfaLogin';
import MfaVerifyEmail from './MfaVerifyEmail';
import { Context } from '../../../Context';

const window = {
  recaptchaVerifier: undefined,
};

function recaptchaVerifierInvisible() {
  // [START auth_phone_recaptcha_verifier_invisible]
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
    size: 'invisible',
  });
  // [END auth_phone_recaptcha_verifier_invisible]
}

function recaptchaRender() {
  /** @type {firebase.auth.RecaptchaVerifier} */
  const { recaptchaVerifier } = window;

  // [START auth_phone_recaptcha_render]
  recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
  });
  // [END auth_phone_recaptcha_render]
}

const useStyles = makeStyles(() => ({
  stepper: {
    background: 'transparent',
    width: '100%',
    padding: '24px 0',
  },
}));

const steps = ['Verify Email Address', 'Phone number', 'Verify', 'Summary'];

const Mfa = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const phone = useInput();
  const [verificationID, setVerificationID] = useState(null);
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(false);
  const user = firebase.auth().currentUser;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const email = useInput('', isSubmitting);
  const password = useInput('', isSubmitting);
  const { removeAuthToLogin, removeAuth } = useContext(Context);

  useEffect(() => {
    recaptchaVerifierInvisible();
    recaptchaRender();
  }, []);

  useEffect(() => {
    if (user && user.emailVerified) {
      setActiveStep(1);
    }
    if (user && user.multiFactor.enrolledFactors.length > 0) {
      setActiveStep(3);
    }
  }, [user]);

  const onNextStep = () => {
    // console.log(phone.value.replace(/[^A-Z0-9]+/gi, ''));
    if (phone.value.replace(/[^A-Z0-9]+/gi, '').length === 0) {
      toast.error('Please enter your phone number ');
      return;
    }

    if (phone.value.replace(/[^A-Z0-9]+/gi, '').length !== 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    if (activeStep === 1) {
      setLoading(true);
      user.multiFactor
        .getSession()
        .then((multiFactorSession) => {
          const phoneInfoOptions = {
            phoneNumber: `+1${phone.value.replace(/[^A-Z0-9]+/gi, '')}`,
            session: multiFactorSession,
          };

          const phoneAuthProvider = new firebase.auth.PhoneAuthProvider();
          return phoneAuthProvider
            .verifyPhoneNumber(phoneInfoOptions, window.recaptchaVerifier)
            .then(function (verificationId) {
              // verificationId will be needed for enrollment completion.
              setLoading(false);

              setVerificationID(verificationId);
              setActiveStep(2);
            })
            .catch((error) => {
              toast.error(error.message);
              if (error.code === 'auth/requires-recent-login') {
                removeAuthToLogin();
                navigate('/login');
              }
              setLoading(false);
            });
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.code);
          toast.error(error.message);
        });
    }
  };

  const onResendCode = async () => {
    // const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    //   'recaptcha-resend',
    //   {
    //     size: 'invisible',
    //   }
    // );

    try {
      user.multiFactor.getSession().then((multiFactorSession) => {
        const phoneInfoOptions = {
          phoneNumber: `+1${phone.value.replace(/[^A-Z0-9]+/gi, '')}`,
          session: multiFactorSession,
        };

        const phoneAuthProvider = new firebase.auth.PhoneAuthProvider();
        return phoneAuthProvider
          .verifyPhoneNumber(phoneInfoOptions, window.recaptchaVerifier)
          .then(function (verificationId) {
            // verificationId will be needed for enrollment completion.

            setVerificationID(verificationId);
          });
      });
      toast.success('SMS re-sent succefully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onVerifyCode = async () => {
    if (!code) {
      toast.error('Please fill the code sent to your phone number.');
      return;
    }

    try {
      setLoading(true);
      const cred = await firebase.auth.PhoneAuthProvider.credential(
        verificationID,
        code
      );

      const multiFactorAssertion = firebase.auth.PhoneMultiFactorGenerator.assertion(
        cred
      );
      user.multiFactor
        .enroll(multiFactorAssertion, 'My personal phone number')
        .then(() => {
          setTimeout(() => {
            setLoading(false);
            setActiveStep(activeStep + 1);
          }, 2000);
        })
        .catch((error) => {
          if (error.code === 'auth/invalid-verification-code') {
            toast.error('Upps! Wrong code');
          }
          setLoading(false);
        });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  function onHandler() {
    if (activeStep === 1) {
      onNextStep();
    } else if (activeStep === 2) {
      onVerifyCode();
    } else {
      navigate('/cases');
    }
  }

  return (
    <Layout>
      <Box
        height="100vh"
        width="100%"
        display="flex"
        style={{ background: '#FAFBFF' }}
        justifyContent="center"
        alignItems="center"
      >
        {activeStep === -1 ? (
          <MfaLogin
            onNext={() => setActiveStep(0)}
            email={email}
            password={password}
            setIsSubmitting={setIsSubmitting}
          />
        ) : (
          <Box
            width="100%"
            maxWidth="650px"
            height="374px"
            style={{ background: '#fff' }}
            padding="32px"
            borderRadius="4px"
            boxShadow="0 3px 6px  #0000000D"
          >
            <Box display="flex" flexDirection="column" height="100%">
              <Box flexGrow="1">
                <Typography style={{ color: '#000000DE', fontSize: 22 }}>
                  Setup Two Factor Authentication
                </Typography>
                {activeStep < 3 && (
                  <Steps
                    activeStep={activeStep}
                    className={classes.stepper}
                    typeFormColor="#2E66FE"
                  >
                    {steps?.map((status) => (
                      <Step key={status}>
                        <StepLabel className={classes.stepLabel}>
                          {status}
                        </StepLabel>
                      </Step>
                    ))}
                  </Steps>
                )}
                {activeStep === 0 && <MfaVerifyEmail />}
                {activeStep === 1 && <MfaStep1 phone={phone} />}
                {activeStep === 2 && (
                  <MfaStep2
                    phoneNumber={phone.value}
                    code={code}
                    setCode={setCode}
                    resendCode={onResendCode}
                  />
                )}
                {activeStep === 3 && <MfaStep3 />}
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                {activeStep > 0 && activeStep < 3 ? (
                  <Button
                    style={{
                      color: '#2E66FE',
                      fontSize: 14,
                      fontWeight: '500',
                      textTransform: 'capitalize',
                    }}
                    onClick={() => navigate('/cases')}
                  >
                    Skip{' '}
                    <ArrowRightAltIcon
                      style={{ fontSize: 10 }}
                      htmlColor="#2E66FE"
                    />
                  </Button>
                ) : (
                  <Box />
                )}
                <Box display="flex" alignItems="center">
                  {activeStep === 2 && (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setActiveStep(activeStep - 1);
                      }}
                      style={{
                        borderColor: '#2F4F77',
                        color: '#2F4F77',
                        marginRight: 10,
                      }}
                    >
                      Back
                    </Button>
                  )}

                  {activeStep > 0 && (
                    <Button
                      variant="contained"
                      onClick={onHandler}
                      style={{ background: '#2F4F77', color: '#fff' }}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress
                          size="20px"
                          style={{ color: '#fff' }}
                        />
                      ) : (
                        'Next'
                      )}
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Box position="absolute" style={{ bottom: 100, right: 20 }}>
        <Button
          variant="contained"
          onClick={removeAuth}
          style={{ background: '#2F4F77', color: '#fff' }}
          disabled={loading}
        >
          Log out
        </Button>
      </Box>
      <div id="recaptcha" />
      <div id="recaptcha-resend" />
    </Layout>
  );
};

const Steps = styled(Stepper)`
  .MuiStepIcon-root {
    border: 1px solid #ccc;
    border-radius: 50%;
    color: transparent;
    .MuiStepIcon-text {
      fill: #000000ad;
    }
  }
  .MuiStepIcon-root.MuiStepIcon-active {
    border: 1px solid #4b7bff;
    border-radius: 50%;
    background-color: #4b7bff !important;
    color: #4b7bff !important;
    .MuiStepIcon-text {
      fill: #fff;
    }
  }

  /* .MuiStepIcon-root.MuiStepIcon-active {
    color: #fff !important;
    .MuiStepIcon-text {
      fill: #000;
    }
  }
  .MuiStepIcon-root.MuiStepIcon-completed {
    color: #4b7bff !important;
  }
  .MuiStepLabel-label {
    color: #fff !important;
  } */

  ${(props) =>
    props.typeFormColor &&
    `
    .MuiStepIcon-root.MuiStepIcon-completed {
      color: ${props.typeFormColor} !important;
      border: 0;
      .MuiStepLabel-labelContainer.MuiStepLabel-label {
        color: #000000AD;
      }
    }
    .MuiStepLabel-label.MuiStepLabel-completed {
      color: #000000AD;
      font-weight: 500;
    }
  `}

  .MuiStepLabel-label {
    color: #00000099 !important;
  }

  width: unset;
  margin: auto;
  @media screen and (min-width: 600px) {
    width: 100%;
  }
`;

export default Mfa;
