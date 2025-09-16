import { Typography, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  subTitle: {
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: 16
  }
}));

export default function Subtitle({ data }) {
 
  const classes = useStyles()

  return <Typography className={classes.subTitle}>{data.text}</Typography>;
}
