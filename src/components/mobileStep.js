import { Box, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const MobileStep = ({ color, text, step }) => {
  return (
    <MobileStepContainer alignItems="center">
      <StepNumber bg={color}>{step + 1}</StepNumber>
      <Typography variant="subtitle2" style={{ color: '#fff' }}>
        {text}
      </Typography>
    </MobileStepContainer>
  );
};

const MobileStepContainer = styled(Box)`
  display: flex;
  @media screen and (min-width: 769px) {
    display: none !important;
  }
`;

const StepNumber = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${(props) => props.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  margin-right: 7px;
`;

export default MobileStep;
