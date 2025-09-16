import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 0,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  borders: {
    padding: '20px 15px',
    borderTop: '1px solid #0000001F',
    borderBottom: '1px solid #0000001F',
  },
}));

export default function CollapseItem({ children, text }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="space-between">
        <ListSubheader
          onClick={handleClick}
          style={{
            fontSize: 16,
            color: '#000000DE',
            width: '100%',
            cursor: 'pointer',
          }}
        >
          {text}
        </ListSubheader>
        <ListItem
          onClick={handleClick}
          style={{ cursor: 'pointer', justifyContent: 'flex-end', width: 60 }}
        >
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box className={classes.borders}>{children}</Box>
      </Collapse>
    </div>
  );
}
