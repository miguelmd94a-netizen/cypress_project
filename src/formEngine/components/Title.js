import { Typography, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  Title: {
    paddingTop: 15,
    paddingBottom: 5,
    fontWeight: 600,
    fontSize: 20
  }
}));

export default function Title({ data }) {
 
  const classes = useStyles()

  return <Typography className={classes.Title}>{data.text}</Typography>;
}
