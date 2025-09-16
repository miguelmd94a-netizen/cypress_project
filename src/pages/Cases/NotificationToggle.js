import { Box, CircularProgress, Switch, Typography } from '@material-ui/core';
import React from 'react';

export default function NotificationToggle({
  showNotification,
  onChangeNotifications,
  loading,
}) {
  console.log(loading);
  return (
    <Box display="flex" alignItems="center" marginTop="20px">
      <Typography variant="body2" style={{ color: '#000', marginRight: 15 }}>
        Disable all emails notifications
      </Typography>
      <Switch
        checked={showNotification}
        onChange={onChangeNotifications}
        disabled={loading}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      {loading && (
        <CircularProgress
          color="#364F74"
          size="15px"
          style={{ marginLeft: 10 }}
        />
      )}
    </Box>
  );
}
