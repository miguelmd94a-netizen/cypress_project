import { Box, Button } from '@material-ui/core';
import { navigate } from '@reach/router';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../Context';
import useOrganization from '../hooks/useOrganization';
import Nav from './Nav';

const Header = () => {
  const { isAuth, removeAuth } = useContext(Context);
  const { organizationData } = useOrganization();
  return (
    <Nav>
      <Box display="flex">
        {isAuth && (
          <>
            <HomeButton
              variant="outlined"
              style={{ color: '#fff', borderColor: '#fff', marginRight: 30 }}
              onClick={() => navigate('/cases')}
            >
              My Cases
            </HomeButton>

            <HomeButton
              variant="outlined"
              style={{ color: '#fff', borderColor: '#fff', marginRight: 30 }}
              onClick={() => removeAuth()}
            >
              Logout
            </HomeButton>
          </>
        )}
        {!isAuth && (
          <>
            {organizationData?.features?.portal?.login && (
              <HomeButton
                variant="outlined"
                style={{ color: '#fff', borderColor: '#fff', marginRight: 30 }}
                onClick={() => navigate('/login')}
              >
                LOGIN
              </HomeButton>
            )}
            {organizationData?.features?.portal?.createAccount && (
              <HomeButton
                variant="contained"
                style={{
                  background: '#fff',
                  color: '#364f74',
                  fontWeight: 'bold',
                }}
                onClick={() => navigate('/signup')}
              >
                CREATE ACCOUNT
              </HomeButton>
            )}
          </>
        )}
      </Box>
    </Nav>
  );
};

export default Header;

const HomeButton = styled(Button)`
  font-size: 14px;
  text-align: center;
  padding: 10px !important;
  font-weight: 600;
  & span {
    letter-spacing: 1.25px;
  }
`;
