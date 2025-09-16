import { Typography } from '@material-ui/core';
import React from 'react';
import ReactCodeInput from 'react-code-input';

const inputStyle = {
  border: 0,
  borderBottom: '1px solid #000000',
  height: 44,
  width: 44,
  fontFamily: 'Roboto',
  fontSize: 20,
  color: '#273240',
  outline: 'none',

  textAlign: 'center',
};

export default function MfaStep2({ phoneNumber, code, setCode, resendCode }) {
  return (
    <>
      <Typography style={{ marginTop: 10, fontSize: 14, color: '#000000AD' }}>
        We sent a message to <strong>{phoneNumber}</strong> with a verification
        code. please enter the code in the field below to continue.
      </Typography>
      <ReactCodeInput
        type="number"
        fields={6}
        inputMode="numeric"
        inputStyle={inputStyle}
        value={code}
        onChange={(cd) => {
          setCode(cd);
        }}
      />
      <Typography
        style={{ marginTop: 20, fontSize: 14, color: '#000000AD' }}
        align="center"
      >
        Didn’t get?{' '}
        <strong
          onClick={resendCode}
          style={{ color: '#2E66FE', cursor: 'pointer' }}
        >
          Resend
        </strong>
      </Typography>
    </>
  );
}
