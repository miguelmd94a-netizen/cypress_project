import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { Link } from '@reach/router';

const useStyles = makeStyles(() => ({
  foooterWrapper: {
    height: 60,
    background: '#FAFBFF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    flexWrap: 'wrap',
  },
  unarmedImg: {
    objectFit: 'contain',
    height: 50,
    width: 130,
  },
  box: {
    alignItems: 'center',
  },
  textMargin: {
    marginLeft: 20,
    marginRight: 20,
  },
  link: {
    color: '#4B7BFF',
    marginLeft: 20,
    cursor: 'pointer',
  },
}));

const Footer = ({ withFaq = true }) => {
  const classes = useStyles();

  return (
    <FooterContainer className={classes.foooterWrapper}>
      <Box display="flex" className={classes.box}>
        {/*
        <a
          href="mailto:hello@sivilco.com?Subject=subject message"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#747474' }}
        >
          Contact Us
        </a>
        <span style={{ color: '#747474', margin: '0 10px' }}>|</span>
        */}
        {withFaq && (
          <Link to="/faq" style={{ color: '#747474' }}>
            FAQ
          </Link>
        )}

        {/* <img src={unarmed} className={classes.unarmedImg} alt="404" />

        <Typography variant="body2" className={classes.link}>
          Enter as administrator
        </Typography> */}
      </Box>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        <a
          style={{ fontSize: 13, textDecoration: 'underline' }}
          target="_blank"
          href="https://sivilco.com/docs/legal/term-of-use/"
          rel="noopener noreferrer"
        >
          Terms of Use
        </a>{' '}
        <Typography style={{ fontSize: 13, margin: '0 5px' }}>|</Typography>
        <a
          style={{
            fontSize: 13,
            textDecoration: 'underline',
          }}
          target="_blank"
          href="https://sivilco.com/docs/legal/privacy-policy/"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        <Typography style={{ fontSize: 13, margin: '0 5px' }}>|</Typography>
        <a
          style={{ fontSize: 13, textDecoration: 'underline' }}
          target="_blank"
          href="https://sivilco.com/docs/legal/translation-disclamer/"
          rel="noopener noreferrer"
        >
          Translation Disclaimer
        </a>
      </Box>
      {/* {features?.portal?.googleTranslate && ( */}
      <div id="google_translate_element" />
      {/* )} */}
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  width: 100%;
  padding: 0 10px;
  font-size: 12px;
  @media screen and (min-width: 414px) {
    padding: 0 16px;
    font-size: 14px;
  }
  @media screen and (min-width: 600px) {
    padding: 0 24px;
    font-size: 16px;
  }
  @media screen and (min-width: 1300px) {
    padding: 0 75px;
  }
`;
export default Footer;
