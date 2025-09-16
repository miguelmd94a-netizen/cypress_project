import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  htmlContent: {
    //Some properties need to be reverted because they get in conflict with the page styles
    //Revert margin and padding styles for all elements and some properties for other specific elements
    ['& *']: {
      margin: 'revert',
      padding: 'revert',
    },
    ['& ul']: {
      textIndent: 'revert',
      listStyleType: 'revert',
    },
    ['& ol']: {
      textIndent: 'revert',
      listStyleType: 'revert',
    },
    ['& a']: {
      color: 'revert',
      textDecoration: 'revert',
    },
    ['& p']: {
      lineHeight: 'revert',
    },
  },
}));

const HTMLContent = ({ content }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.htmlContent}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HTMLContent;
