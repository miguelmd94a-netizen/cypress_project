import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';

const Btn = ({ loading, onClick, text, className, color, circularColor = '#364F74', type = 'button' }) => (
  <Button variant="contained" onClick={onClick} className={className} color={color} type={type}>
    {text} {loading && <CircularProgress color={circularColor} size="20px" style={{ marginLeft: 10 }} />}
  </Button>
);
export default Btn;
