import { Box, Button } from '@material-ui/core';
import { navigate } from '@reach/router';
import React, { useContext } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import Nav from '../../components/Nav';
import { Context } from '../../Context';
import useGoogleTranslate from '../../hooks/useGoogleTranslate';
import useTrackForm from '../../hooks/useTrackForm';
import TrackFormInfo from './TrackFormInfo';

const TrackForm = ({ id }) => {
  const { loading, form } = useTrackForm(id);
  const { isAuth, removeAuth } = useContext(Context);
  useGoogleTranslate();

  return (
    <Layout>
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
              <HomeButton
                variant="outlined"
                style={{ color: '#fff', borderColor: '#fff', marginRight: 30 }}
                onClick={() => navigate('/login')}
              >
                LOGIN
              </HomeButton>
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
            </>
          )}
        </Box>
      </Nav>

      <TrackFormInfo trackingNumber={id} form={form} loading={loading} />
    </Layout>
  );
};

const HomeButton = styled(Button)`
  font-size: 14px;
  text-align: center;
  padding: 10px !important;
  font-weight: 600;
  & span {
    letter-spacing: 1.25px;
  }
`;

export default TrackForm;
