import { Box, Divider, makeStyles, Paper, Typography, Button } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '10px 20px',
    width: 280,
    height: 150,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    backgroundSize: 'cover',
  },
}));

const DashboardCard = ({
  buttonText,
  onClick,
  icon,
  color,
  cardText,
  value,
  style = { marginLeft: 10 },
  disabledBtn,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} style={style}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle2" style={{ color: '#8B8FAF' }}>
          {cardText}
        </Typography>
        <div className={classes.iconContainer} style={{ background: color }}>
          <div
            className={classes.icon}
            style={{ background: `url(${icon})` }}
          />
        </div>
      </Box>
      <Typography variant="h4">{value}</Typography>
      <Divider style={{ margin: '5px 0' }} />
      <Button disabled={disabledBtn} onClick={onClick}>
        <Typography variant="subtitle2" style={{ color: disabledBtn ? 'gray' : '#4B7BFF' }}>
          {buttonText}
        </Typography>
      </Button>
    </Paper>
  );
};

export default DashboardCard;
