import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';

const FormStepper = ({ stepsArr = [], color, active }) => {
  return (
    <FormStepperContainer>
      {stepsArr.map((step, i) => (
        <StepItem key={i}>
          <StepPosition active={active === i} bg={color} completed={active > i}>
            {active > i ? (
              <CheckIcon htmlColor="#fff" fontSize="small" />
            ) : (
              i + 1
            )}
          </StepPosition>
          <Typography variant="body1" style={{ color: '#fff', fontSize: 14 }}>
            {step}
          </Typography>
          {i + 1 < stepsArr.length && <DividerPosition />}
        </StepItem>
      ))}
    </FormStepperContainer>
  );
};

export default FormStepper;

const FormStepperContainer = styled.div`
  padding: 20px 4px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 855px;
  overflow-x: auto;
  display: none;
  @media screen and (min-width: 769px) {
    display: flex;
  }
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
`;

const StepPosition = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  font-size: 13px;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  margin-right: 10px;
  justify-content: center;
  color: #fff;
  ${(props) =>
    props.active &&
    `
        background: ${props.bg};
        border: 1px solid ${props.bg};
        color: #fff;
    `}
  ${(props) =>
    props.completed &&
    `
        background: ${props.bg};
        border: 1px solid ${props.bg};
        color: #fff;
    `}
`;

const DividerPosition = styled.div`
  height: 1px;
  min-width: 20px;
  background-color: #fff;
  margin: 0 10px;
`;
