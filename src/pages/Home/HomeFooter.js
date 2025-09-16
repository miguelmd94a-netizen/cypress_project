import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import styled from 'styled-components';
import oversignImg from '../../assets/oversignBlack.png';

const useStyles = makeStyles(() => ({
  foooterWrapper: {
    height: 60,
    background: '#FAFBFF',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    flexWrap: 'wrap',
    left: 0,
  },
  unarmedImg: {
    objectFit: 'contain',
    height: 50,
    width: 160,
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

const HomeFooter = ({ features }) => {
  const classes = useStyles();

  return (
    <FooterContainer className={classes.foooterWrapper}>
      {features?.portal?.unarmedLogo && (
        <Box display="flex" className={classes.box}>
          <img src={oversignImg} className={classes.unarmedImg} alt="404" />
        </Box>
      )}
      <Box display="flex" alignItems="center">
        <a
          style={{ fontSize: 13, textDecoration: 'underline' }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://sivilco.com/docs/legal/term-of-use/
"
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
          rel="noopener noreferrer"
          href="https://sivilco.com/docs/legal/privacy-policy/
"
        >
          Privacy Policy
        </a>
        <Typography style={{ fontSize: 13, margin: '0 5px' }}>|</Typography>
        <a
          style={{ fontSize: 13, textDecoration: 'underline' }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://sivilco.com/docs/legal/translation-disclamer/
"
        >
          Translation Disclaimer
        </a>
      </Box>

      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <GoogleContainer
          show={features?.portal?.googleTranslate}
          id="google_translate_element"
          style={{ marginRight: 20 }}
        />
      </Box>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  width: 100%;
  padding-left: 20px;
  @media screen and (min-width: 1020px) {
    width: calc(100% - 400px);
    padding-left: 45px;
  }
  @media screen and (min-width: 1367px) {
    width: calc(100% - 440px);
  }
  @media screen and (min-width: 1546px) {
    width: calc(100% - 560px);
  }
`;

const GoogleContainer = styled.div`
  > .skiptranslate {
    ${(props) => (props.show ? '' : 'display: none !important;')}
  }
`;
export default HomeFooter;
