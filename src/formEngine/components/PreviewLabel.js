import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  label: {
    fontSize: 16,
    color: '#000000DE',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#000000DE',
    marginBottom: 15,
  },
}));

export default function PreviewLabel({ question, required, description }) {
  const classes = useStyles();
  return (
    <>
      <Box display="flex" alignItems="center" marginBottom="15px">
        <Typography className={classes.label}>{question}</Typography>
        {required && <span style={{ color: 'red', fontSize: 12 }}>*</span>}
      </Box>
      {description && (
        <Typography className={classes.description}>{description}</Typography>
      )}
    </>
  );
}
