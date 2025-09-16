import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Divider,
  FormHelperText,
  InputAdornment,
  makeStyles,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import React from 'react';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ForumIcon from '@material-ui/icons/Forum';
import styled from 'styled-components';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';
import { navigate } from '@reach/router';
import useInput from '../../hooks/useInput';
import MobileNav from '../../components/MobileNav';
import { logEvent } from '../../services/firebase';
import WrapperCard from '../../components/WrapperrCard';

const getFormColor = (form) => {
  switch (form) {
    case 'COMPLIMENT':
      return '#008858';
    case 'COMPLAINT':
      return '#e52828';
    default:
      return '#364F74';
  }
};

const useStyles = makeStyles(() => ({
  itemContainer: {
    background: '#0924FF03',
    boxShadow: 'none',
    height: '100px !important',
    width: '100px !important',
    border: '1px solid #0924FF19',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
}));

const Info = ({
  logo,
  name,
  title,
  text,
  features,
  showReports,
  formsType,
}) => {
  const trackingNumber = useInput('');
  const matches = useMediaQuery('(min-width:620px)');
  const classes = useStyles();
  const onTracking = () => {
    if (!trackingNumber.value) {
      trackingNumber.setError('Please provide a tracking number');
      return;
    }
    logEvent('track_case', { tracking_number: trackingNumber.value });
    navigate(`/tracking/${trackingNumber.value}`);
  };

  // const complimentForm = formsType?.find(
  //   (res) => res.type === 'COMPLIMENT' && res.published
  // );
  // const complaintForm = formsType?.find(
  //   (res) => res.type === 'COMPLAINT' && res.published
  // );
  return (
    <ComponentWrapper>
      <MobileNav />
      <Box
        display="flex"
        alignItems="flex-start"
        minHeight={80}
        style={{ margin: '25px 10px 0' }}
        // justifyContent="space-between"
        width="100%"
        maxWidth="790px"
        flexWrap={!matches && 'wrap'}
      >
        <LogoImage src={logo} />
        <Box style={{ marginLeft: 20 }}>
          <Typography
            variant="h2"
            style={{
              fontSize: '28px',
              fontWeight: '500',
              color: '#364F74',
            }}
          >
            {title}
          </Typography>
          <Typography variant="subtitle1" style={{ fontSize: 14 }}>
            {text}
          </Typography>
        </Box>
      </Box>

      <AlignContent>
        <Box>
          <Box
            display="flex"
            // gridTemplateColumns="repeat(auto-fill, minmax(348px, 1fr))"
            // gridTemplateRows={
            //   matches
            //     ? `repeat(${formsType.length / 2}, 150px)`
            //     : `repeat(${formsType.length}, 150px)`
            // }
            flexWrap="wrap"
            // gridGap={12}
            width="100%"
            maxWidth={720}
            marginBottom="20px"
            className={classes.cardsContainer}
            style={matches ? { overflowY: 'auto', height: 325 } : {}}
          >
            {formsType?.map((form, index) => (
              <WrapperCard
                key={index}
                colorBg={getFormColor(form.type)}
                typeForm={form.type}
                logEventTrack="make_compliment"
                routeUrl={`/form/${form._id}`}
                name={form.name}
                description={form.description}
                pages={form.pages}
                buttonName={form.buttonText}
              />
            ))}
          </Box>

          {features?.portal?.trackYourCase && (
            <>
              <Divider style={{ maxWidth: 720 }} />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                maxWidth={720}
                flexWrap="wrap"
              >
                <Box width={348} style={{ marginRight: 15 }}>
                  <Typography variant="h6" style={{ fontWeight: 600 }}>
                    Track your case
                  </Typography>
                  <TypographyText style={{ marginBottom: 10 }}>
                    Get a status update on your case.
                  </TypographyText>

                  {/* <FormControl
                    variant="outlined"
                    style={{
                      marginTop: 10,
                      width: matches ? 'fit-content' : '100%',
                    }}
                  > */}
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    color="primary"
                  >
                    <OutLineInput
                      placeholder="Enter your tracking number"
                      id="outlined-adornment-weight"
                      style={{ width: 260 }}
                      value={trackingNumber.value}
                      onChange={trackingNumber.onChange}
                      error={trackingNumber.error}
                      startAdornment={
                        <InputAdornment position="end">
                          <SearchIcon
                            fontSize="medium"
                            style={{ color: ' #0000001f' }}
                          />
                        </InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                      labelWidth={0}
                    />
                    <Button
                      style={{
                        background: '#364f74',
                        letterSpacing: '1.25px',
                        fontSize: 13,
                        fontWeight: 400,
                      }}
                      onClick={onTracking}
                    >
                      TRACK
                    </Button>
                  </ButtonGroup>
                  <FormHelperText error={trackingNumber.error}>
                    {trackingNumber.error}
                  </FormHelperText>
                  {/*
                  <Typography variant="body2">
                    <a
                      href="mailto:hello@sivilco.com?Subject=subject message"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#3d6df1' }}
                    >
                      Contact Us
                    </a>
                  </Typography>
                    */}
                  {/* </FormControl> */}
                </Box>

                <CardGroup style={{ marginBottom: 25, display: 'flex' }}>
                  {showReports && (
                    <CardWrapperr className={classes.itemContainer}>
                      <CardContent style={{ padding: 10 }}>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            navigate('/reports');
                            logEvent('enter_reports');
                          }}
                        >
                          <Filled>
                            <ShowChartIcon
                              htmlColor="#3d6df1"
                              style={{ fontSize: 16 }}
                            />
                          </Filled>
                          <div>
                            <Typography
                              variant="h6"
                              style={{ fontWeight: 600 }}
                            >
                              Data
                            </Typography>
                          </div>
                        </Box>
                      </CardContent>
                    </CardWrapperr>
                  )}
                  {features?.portal?.FAQ && (
                    <CardWrapperr className={classes.itemContainer}>
                      <CardContent display="flex" style={{ padding: 10 }}>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            navigate('/faq');
                            logEvent('enter_faq');
                          }}
                        >
                          <Filled>
                            <ForumIcon
                              htmlColor="#4B7BFF"
                              style={{ fontSize: 16 }}
                            />
                          </Filled>
                          <div>
                            <Typography
                              variant="h6"
                              style={{ fontWeight: 600 }}
                            >
                              FAQ
                            </Typography>
                          </div>
                        </Box>
                      </CardContent>
                    </CardWrapperr>
                  )}
                </CardGroup>
              </Box>
            </>
          )}
        </Box>
      </AlignContent>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  @media screen and (min-width: 1200px) {
    padding: 0 0 0 45px;
    width: 100%;
    position: relative;
  }
`;

const LogoImage = styled.img`
  max-height: 70px;
  object-fit: contain;
  margin: 10px 0 10px 26px;
  object-position: center left;
`;

const AlignContent = styled.div`
  padding: 10px;
  padding-bottom: 80px;
  @media screen and (min-width: 768px) {
    padding: 0;
    display: flex;
    justify-content: center;
  }
  @media screen and (min-width: 1020px) {
    ${'' /* margin-left: 26px; */}
    padding: 0;
    display: unset;
  }
`;

const CardGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and (min-width: 768px) {
    margin-top: 20px;
  }
`;
const CardWrapperr = styled(Card)`
  margin-top: 20px;
  @media screen and (min-width: 320px) {
    width: 100%;
  }
  @media screen and (min-width: 768px) {
    margin-top: 0;
    width: 350px;
    :nth-child(1) {
      margin-right: 20px;
    }
  }
`;

const Filled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #4762fa1a;
  margin-right: 10px;
`;

const TypographyText = styled(Typography)`
  font-size: 14px !important;
  color: #00000099;
`;

const OutLineInput = styled(OutlinedInput)`
  border: 1px solid #bdbdbd;
  border-color: #bdbdbd !important;

  & .MuiOutlinedInput-adornedStart {
    padding-left: 0 !important;
  }
  & input {
    padding: 10.5px 14px !important;
  }

  & fieldset {
    opacity: 0;
  }
`;

export default Info;
