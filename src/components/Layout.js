import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import useOrganization from '../hooks/useOrganization';
import Footer from './Footer';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    flex: 1,
    minHeight: '100vh',
  },
}));

const Layout = ({ withFooter = true, children }) => {
  const classes = useStyles();
  const { organizationData } = useOrganization();
  return (
    <Box display="flex" flexDirection="column">
      <Box className={classes.container}>{children}</Box>
      {withFooter && <Footer features={organizationData?.features} />}
    </Box>
  );
};

export default Layout;
