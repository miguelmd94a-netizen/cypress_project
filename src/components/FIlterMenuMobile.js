import { Box } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const FilterMenuMobile = ({ children }) => {
  return (
    <Box position="absolute" width="100%" height="100vh" zIndex="10" top={0}>
      <Box
        style={{ background: 'rgba(0,0,0,.2)' }}
        width="100%"
        height="100vh"
      />
      <FIlterCOntainer>{children}</FIlterCOntainer>
    </Box>
  );
};

const FIlterCOntainer = styled.div`
  width: 310px;
  height: 100vh;
  position: absolute;
  z-index: 11;
  top: 0;
  right: -200px;
  background-color: #fff;
  animation: slide-left 0.5s forwards;

  @keyframes slide-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-200px);
    }
  }
`;

export default FilterMenuMobile;
