import { Box, Typography } from '@material-ui/core';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

const InputPhone = ({
  value,
  onChange,
  label = 'Phone Number',
  error,
  showDropdown = false,
  disabled,
  country,
  hasError,
}) => (
  <Box>
    {label && (
      <Typography
        style={{
          fontSize: 12,
          // margin: '25px 0 0px 0',
          color: 'rgba(0, 0, 0, 0.54)',
        }}
      >
        {label}
      </Typography>
    )}
    <PhoneInput
      masks={{
        us: '(...) ... - ....',
      }}
      autoFormat
      onlyCountries={['us']}
      country="us"
      placeholder="(    )        -    "
      specialLabel={false}
      // countryCodeEditable={false}
      disableCountryCode
      disabled={disabled}
      value={value}
      onChange={(phone) => onChange(phone)}
      inputStyle={{
        padding: '4px 14px 8.5px 5px',
        border: 0,
        borderRadius: 0,
        outline: 0,
        borderBottom: hasError
          ? '2px solid #f44336'
          : '1px solid rgba(0, 0, 0, 0.42)',
        width: '100%',
        fontSize: '1rem',
        background: 'transparent',
      }}
      buttonStyle={{ display: showDropdown ? 'block' : 'none' }}
    />
    {error && (
      <Typography style={{ color: 'red', fontSize: 10 }}>
        This field is required
      </Typography>
    )}
  </Box>
);

export default InputPhone;
