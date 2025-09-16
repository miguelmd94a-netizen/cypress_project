import { Button } from '@material-ui/core';
import { navigate } from '@reach/router';
import React, { useContext } from 'react';
import styled from 'styled-components';
import AsideImg from '../../assets/Oversight_portal_brand_img.png';
import { Context } from '../../Context';

const AsideArea = ({ features }) => {
  const { isAuth, removeAuth } = useContext(Context);
  return (
    <ComponentWrapper>
      <BackDrop />
      {!isAuth ? (
        <FlexItems>
          {features?.portal?.login && (
            <HomeButton
              variant="outlined"
              style={{ color: '#fff', borderColor: '#fff', marginRight: 30 }}
              onClick={() => navigate('login')}
            >
              LOGIN
            </HomeButton>
          )}
          {features?.portal?.createAccount && (
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
        </FlexItems>
      ) : (
        <FlexItems>
          <HomeButton
            variant="outlined"
            style={{
              color: '#fff',
              borderColor: '#fff',
              marginRight: 30,
              background: '#364f74',
            }}
            onClick={() => navigate('/cases')}
          >
            My Cases
          </HomeButton>
          <HomeButton
            variant="outlined"
            style={{
              color: '#fff',
              borderColor: '#fff',
              marginRight: 30,
              background: '#364f74',
            }}
            onClick={removeAuth}
          >
            Log out
          </HomeButton>
        </FlexItems>
      )}

      <AisdeImage src={AsideImg} />
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  display: none;

  @media screen and (min-width: 1200px) {
    width: 500px;
    height: 100vh;
    display: unset;
    position: relative;
  }
  @media screen and (min-width: 1367px) {
    width: 550px;
    display: unset;
  }
  @media screen and (min-width: 1546px) {
    width: 700px;
    display: unset;
  }
`;

const AisdeImage = styled.img`
  height: 100%;
  width: 500px;
  object-fit: contain;
  object-position: bottom;
  @media screen and (min-width: 1367px) {
    width: 546px;
  }
  @media screen and (min-width: 1546px) {
    width: 700px;
  }
`;

const BackDrop = styled.div`
  background: #364f74;
  height: 100vh;
  width: 79.93%;
  right: 0;
  position: absolute;
  z-index: -1;
`;

const FlexItems = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 30px;
  right: 30px;
  justify-content: flex-end;
`;

const HomeButton = styled(Button)`
  font-size: 14px;
  text-align: center;
  padding: 10px !important;
  font-weight: 600;
  & span {
    letter-spacing: 1.25px;
  }
`;

export default AsideArea;
