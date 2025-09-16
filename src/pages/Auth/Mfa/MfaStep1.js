import { Box, Input, InputLabel, Typography } from '@material-ui/core';
import React from 'react';
import MaskedInput from 'react-text-mask';

export const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      style={{ width: '100%' }}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

const MfaStep1 = ({ phone }) => (
  <>
    <Typography style={{ marginTop: 10, fontSize: 14, color: '#000000AD' }}>
      Protect your account by adding an extra layer of security. We need you to
      enter your phone number in the field below to send you a verification
      code.
    </Typography>
    <Box display="flex" alignItems="flex-end">
      <Typography style={{ position: 'relative', top: -4, left: -2 }}>
        +1
      </Typography>
      <Box marginTop="25px">
        <InputLabel
          htmlFor="formatted-text-mask-input"
          style={{ marginBottom: 3, fontSize: 12 }}
        >
          Phone Number
        </InputLabel>
        <Input
          value={phone.value}
          onChange={phone.onChange}
          name="textmask"
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
        />
      </Box>
    </Box>
  </>
);

export default MfaStep1;
