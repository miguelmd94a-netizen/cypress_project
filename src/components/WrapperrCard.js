import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import { logEvent } from '../services/firebase';

const CardWrapperr = styled(Card)`
  margin-top: 20px;
  @media screen and (min-width: 320px) {
    width: 100%;
  }
  @media screen and (min-width: 768px) {
    margin-top: 0;
    width: 350px;
  }
`;

const TypographyText = styled(Typography)`
  font-size: 14px !important;
  color: #00000099;
  height: 42px;
`;

const WrapperCard = ({
  name,
  description,
  routeUrl,
  logEventTrack,
  colorBg,
  typeForm,
  buttonName,
  pages,
}) => (
  <CardWrapperr
    style={{
      background: '#0924FF03',
      boxShadow: 'none',
      border: '1px solid #0924FF19',
      marginRight: 10,
      marginBottom: 10,
      height: 152.5,
    }}
  >
    <CardContent style={{ padding: 10 }}>
      <Typography variant="h6" style={{ fontWeight: 600 }}>
        {name}
      </Typography>
      <TypographyText>{description}</TypographyText>
    </CardContent>
    <CardActions style={{ padding: 10 }}>
      <Button
        variant="contained"
        style={{
          background: colorBg,
          color: '#fff',
          fontSize: 13,
          fontWeight: 400,
          textTransform: 'uppercase',
        }}
        onClick={() => {
          navigate(routeUrl, { state: { pages } });
          logEvent(logEventTrack);
        }}
      >
        {buttonName || `MAKE A ${typeForm}`}
      </Button>
    </CardActions>
  </CardWrapperr>
);

export default WrapperCard;
