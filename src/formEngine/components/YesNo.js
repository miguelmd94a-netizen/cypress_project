import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import React from 'react';
import { setterState } from './File';
import PreviewLabel from './PreviewLabel';

export default function YesNo({ data, onSaveFormValues, getFormValue }) {
  const setValue = () => {
    if (typeof getFormValue() === 'boolean') {
      if (getFormValue() === true) {
        return 'yes';
      }
      return 'no';
    }
    return '';
  };
  return (
    <Box marginBottom="20px">
      <PreviewLabel
        required={data?.required}
        description={data?.description}
        question={data?.question}
      />
      <FormControl error={data?.showRequired} style={{ width: '100%' }}>
        <RadioGroup
          aria-label="yesNo"
          name="yesNo"
          value={setValue()}
          onChange={(e) => {
            setterState(
              data.questionBankIndex,
              onSaveFormValues,
              e.target.value === 'yes' ? true : false
            );
          }}
        >
          {data?.checkbox ? (
            <Box display="flex" alignItems="center" marginBottom="10px">
              <FormControlLabel
                value={'yes'}
                control={
                  <Checkbox
                    color="default"
                    checked={setValue() === 'yes'}
                    onChange={(e) => {
                      setterState(
                        data.questionBankIndex,
                        onSaveFormValues,
                        e.target.checked
                      );
                    }}
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    style={{ padding: 0, marginRight: 5 }}
                  />
                }
                label="Yes"
                style={{ color: '#747474', marginLeft: 0 }}
              />
            </Box>
          ) : (
            <>
              <Box display="flex" alignItems="center" marginBottom="10px">
                <FormControlLabel
                  value={'yes'}
                  control={
                    <Radio
                      color="default"
                      inputProps={{ 'aria-label': 'D' }}
                      style={{ padding: 0, marginRight: 7 }}
                    />
                  }
                  label="Yes"
                  style={{ color: '#747474', marginLeft: 0 }}
                />
              </Box>
              <Box display="flex" alignItems="center" marginBottom="10px">
                <FormControlLabel
                  value={'no'}
                  control={
                    <Radio
                      color="default"
                      inputProps={{ 'aria-label': 'D' }}
                      style={{ padding: 0, marginRight: 7 }}
                    />
                  }
                  label="No"
                  style={{ color: '#747474', marginLeft: 0 }}
                />
              </Box>
            </>
          )}
        </RadioGroup>
        {data?.showRequired && (
          <FormHelperText>{data?.requiredMessage}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
