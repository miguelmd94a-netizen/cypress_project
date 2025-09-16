import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import React from 'react';
import { setterState } from './File';
import PreviewLabel from './PreviewLabel';

export default function SingleChoice({ data, onSaveFormValues, getFormValue }) {
  return (
    <Box marginBottom="20px">
      <PreviewLabel
        required={data?.required}
        description={data?.description}
        question={data?.question}
      />
      <FormControl error={data?.showRequired} style={{ width: '100%' }}>
        <RadioGroup
          aria-label="singleChoice"
          name="singleChoice"
          value={
            typeof data.questionBankIndex === 'number'
              ? getFormValue()?.[data.questionBankIndex] || ''
              : getFormValue() || ''
          }
          onChange={(e) => {
            setterState(
              data.questionBankIndex,
              onSaveFormValues,
              e.target.value
            );
          }}
        >
          {data?.options?.map((option, index) => (
            <Box
              display="flex"
              alignItems="center"
              key={index}
              marginBottom="10px"
            >
              <FormControlLabel
                value={option}
                control={
                  <Radio
                    color="default"
                    inputProps={{ 'aria-label': 'D' }}
                    style={{ padding: 0, marginRight: 7 }}
                  />
                }
                label={option}
                style={{ color: '#747474', marginLeft: 0 }}
              />
            </Box>
          ))}
        </RadioGroup>
        {data?.showRequired && (
          <FormHelperText>{data?.requiredMessage}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
