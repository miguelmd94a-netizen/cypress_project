import {
  Container,
  Fade,
  makeStyles,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@material-ui/core';
import { navigate } from '@reach/router';
import React, { useEffect, useState, useContext } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';

import { Context } from '../Context';
import Logo from './Logo';

const useStyles = makeStyles(() => ({
  nav: {
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    background: '#364F74',
  },
  unarmedlogo: {
    width: 140,
    height: 50,
    objectFit: 'contain',
    cursor: 'pointer',
  },
}));

const Nav = ({ children }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const [open, setOpen] = useState(false);
  const { isAuth, removeAuth } = useContext(Context);
  const classes = useStyles();
  const handleClose = () => setOpen(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const onNavigate = (route) => {
    navigate(route);
    handleClose();
  };

  return (
    <div className={classes.nav}>
      <Container>
        <div className={classes.nav}>
          {!matches && (
            <MenuIcon
              htmlColor="#fff"
              fontSize="large"
              style={{ cursor: 'pointer' }}
              onClick={() => setOpen(true)}
            />
          )}
          <MenuNav
            id="fade-menu"
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {isAuth && (
              <div>
                <MenuItem onClick={() => onNavigate('/cases')}>
                  My Cases
                </MenuItem>
                <MenuItem onClick={() => removeAuth()}>Logout</MenuItem>
              </div>
            )}
            {!isAuth && (
              <div>
                <MenuItem onClick={() => onNavigate('/login')}>Login</MenuItem>
                <MenuItem onClick={() => onNavigate('/signup')}>
                  Create Account
                </MenuItem>
              </div>
            )}
          </MenuNav>
          {/* <img
            src={imag}
            alt="404"
            className={classes.unarmedlogo}
            onClick={() => navigate('/')}
          /> */}
          <Logo logo="white" />
          {matches && children}
        </div>
      </Container>
    </div>
  );
};

const MenuNav = styled(Menu)`
  .MuiMenu-paper {
    top: 100px !important;
    width: 100%;
    left: 0px !important;
    max-width: 100%;
    height: 70vh;
  }
`;

export default Nav;
