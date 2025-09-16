import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputAdornment,
  makeStyles,
  OutlinedInput,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import { navigate } from '@reach/router';
import moment from 'moment';
import useInput from '../../hooks/useInput';
import TrackFormDetails from './TrackFormDetails';
import { Context } from '../../Context';
import { transformStatus } from '../../utils';

const useStyles = makeStyles(() => ({
  trackPaper: {
    padding: 15,
    width: 390,
    height: 200,
  },
  statusPaper: {
    width: '100%',
    height: '100%',
    marginBottom: 20,
  },
  stepper: {
    background: 'transparent',
    width: '200px',
    padding: '24px 0',
  },
  stepLabel: {
    textTransform: 'capitalize',
  },
}));

export const formTypeColor = {
  compliment: '#008858',
  complaint: '#FF4242',
  inquiry: '#2E66FE',
  referral: '#2E66FE',
  other: '#2E66FE',
};

export const getFormTypeColor = (type) => {
  switch (type) {
    case 'compliment':
      return '#008858';
    case 'complaint':
      return '#FF4242';
    default:
      return '#364f74';
  }
};

const Connector = () => <Box height="20px" />;

const TrackFormInfo = ({ trackingNumber, form, loading }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const { isAuth } = useContext(Context);
  const trackNumber = useInput('');
  const matches = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    if (form) {
      const index = form.availableStatuses.findIndex((t) => t.status === form.status);
      setActiveStep(index + 1);
    }
  }, [form]);

  const onTracking = () => {
    if (!trackNumber.value) {
      trackNumber.setError('Please provide a tracking number');
      return;
    }

    navigate(`/tracking/${trackNumber.value}`);
  };

  const getStatusTitle = () => {
    const currentStatus = form?.availableStatuses?.filter((status) => status.status === form?.status);
    return transformStatus(currentStatus[0]?.status);
  };

  const getDescriptionStatus = () => {
    const currentStatus = form?.availableStatuses?.filter((status) => status.status === form?.status);
    return currentStatus[0]?.description;
  };

  return (
    <TrackFormContainer>
      <div style={{ width: '100%', marginRight: 20 }}>
        {loading ? (
          <Box display="flex" alignItems="center" justifyContent="center" style={{ width: '100%' }}>
            <CircularProgress color="#364F74" size="50px" />
          </Box>
        ) : (
          <>
            {(!form && (
              <Box display="flex" alignItems="center" justifyContent="center" style={{ width: '100%' }}>
                <Typography variant="h5">
                  {' '}
                  Your search ({trackingNumber}) did not match any cases. Please try again.
                </Typography>
              </Box>
            )) || (
              <Paper className={classes.statusPaper}>
                <div
                  style={{
                    padding: '20px 23px',
                  }}
                >
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="subtitle1" style={{ fontWeight: '600' }}>
                        Tracking number:
                      </Typography>
                      <Typography variant="subtitle1" style={{ color: '#00000099' }}>
                        {trackingNumber}
                      </Typography>
                    </Box>
                    {form?.referral?.next && (
                      <Box>
                        <Box display="flex">
                          <Typography
                            variant="subtitle1"
                            style={{
                              color: '#00000099',
                              fontSize: 14,
                              marginRight: 4,
                            }}
                          >
                            Case transferred to:
                          </Typography>{' '}
                          <Typography
                            variant="subtitle1"
                            style={{
                              color: '#000',
                              fontSize: 14,
                              fontWeight: '500',
                            }}
                          >
                            {form?.referral?.next?.organization?.name}
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <Typography
                            variant="subtitle1"
                            style={{
                              color: '#00000099',
                              fontSize: 14,
                              marginRight: 4,
                            }}
                          >
                            New tracking number:
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            style={{
                              color: '#000',
                              fontSize: 14,
                              fontWeight: '500',
                            }}
                          >
                            {form?.referral?.next?.code}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>

                  <Box
                    display="flex"
                    flexDirection={matches ? 'row' : 'column'}
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ marginTop: 30 }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="cetner"
                      alignItems="center"
                      width="100%"
                      marginRight="20px"
                    >
                      <Typography
                        variant="h6"
                        style={{
                          fontWeight: '600',
                          textTransform: 'capitalize',
                        }}
                      >
                        {`${form?.type?.toLowerCase()}  Case Status`}
                      </Typography>
                      <Typography
                        variant="h3"
                        style={{
                          marginTop: 10,
                          color: getFormTypeColor(form?.type?.toLowerCase()),
                          fontWeight: '500',
                          textAlign: 'center',
                          textTransform: 'capitalize',
                        }}
                      >
                        {getStatusTitle()}
                      </Typography>

                      <Typography variant="subtitle1" style={{ fontWeight: '500', color: '#000000DE' }}>
                        {moment(form?.updatedAt).format('dddd, MMMM DD, YYYY')}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        style={{
                          color: '#000000DE',
                          fontSize: 14,
                          marginTop: 20,
                          textAlign: 'center',
                          width: 300,
                        }}
                      >
                        {getDescriptionStatus() || 'Test description by Status'}
                      </Typography>
                    </Box>

                    <Steps
                      activeStep={activeStep}
                      className={classes.stepper}
                      alternativeLabel={false}
                      orientation="vertical"
                      width="250px"
                      typeFormColor={getFormTypeColor(form?.type?.toLowerCase())}
                      connector={<Connector />}
                    >
                      {form?.availableStatuses?.map((status) => (
                        <Step key={status}>
                          <StepLabel className={classes.stepLabel}>{transformStatus(status.status)}</StepLabel>
                        </Step>
                      ))}
                    </Steps>
                  </Box>
                </div>
                {isAuth && form?.formType?.pages?.length > 0 && (
                  <>
                    <TrackFormDetails form={form} />
                  </>
                )}
              </Paper>
            )}
          </>
        )}
        <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: 30 }} marginBottom="20px">
          <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Box>
      </div>

      <TrackAnotherContainer>
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          Track another case
        </Typography>
        <Typography variant="body2" style={{ marginTop: 15 }}>
          Enter the tracking number in the field below to know the status of your case.
        </Typography>
        <FormControl variant="outlined" style={{ marginTop: 30 }}>
          <ButtonGroup disableElevation variant="contained" color="primary">
            <OutLineInput
              placeholder="Enter your tracking number"
              id="outlined-adornment-weight"
              value={trackNumber.value}
              onChange={trackNumber.onChange}
              error={trackNumber.error}
              startAdornment={
                <InputAdornment position="end">
                  <SearchIcon fontSize="medium" style={{ color: ' #767676' }} />
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              labelWidth={0}
            />
            <Button style={{ background: '#364f74', letterSpacing: '1.25px' }} onClick={onTracking}>
              TRACK
            </Button>
          </ButtonGroup>
          <FormHelperText error={trackNumber.error}>{trackNumber.error}</FormHelperText>
        </FormControl>
      </TrackAnotherContainer>
    </TrackFormContainer>
  );
};

const OutLineInput = styled(OutlinedInput)`
  & .MuiOutlinedInput-adornedStart {
    padding-left: 0 !important;
  }
  border: 1px solid #bdbdbd;
  border-color: #bdbdbd !important;
  & fieldset {
    opacity: 0;
  }
  & input {
    width: 230px;
    padding: 10.5px 0;

    ::placeholder {
      color: #767676;
      opacity: 1;
    }
  }
`;

const TrackFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  padding: 0 10px 10px;
  @media screen and (min-width: 800px) {
    padding: 0 50px 50px;
  }

  @media screen and (min-width: 1024px) {
    padding: 0 120px 100px;
    flex-direction: row;
  }
`;

const TrackAnotherContainer = styled(Paper)`
  padding: 15px;
  width: 100%;
  height: 200px;
  & .MuiFormControl-root {
    width: 100%;
    & .MuiInputBase-root {
      width: 100%;
    }
  }
  @media screen and (min-width: 1024px) {
    width: 390px;
  }
`;

const Steps = styled(Stepper)`
  .MuiStepIcon-root {
    border: 1px solid #ccc;
    border-radius: 50%;
    color: transparent;
    .MuiStepIcon-text {
      fill: #767676;
    }
  }
  .MuiStepIcon-root.MuiStepIcon-active {
    border: 1px solid #ccc;
    color: #fff !important;
    border-radius: 50%;
    .MuiStepIcon-text {
      fill: #767676;
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
        color: ${props.typeFormColor} !important;
      }
    }
    .MuiStepLabel-label.MuiStepLabel-completed {
      color: ${props.typeFormColor} !important;
      font-weight: 500;
    }
  `}

  .MuiStepLabel-label {
    color: #00000099 !important;
  }

  width: unset;
  margin: auto;
  @media screen and (min-width: 600px) {
    width: ${(props) => (!props.width ? '100%' : props.width)};
  }
`;

export default TrackFormInfo;
