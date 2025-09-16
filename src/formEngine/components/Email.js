import { Box, TextField } from '@material-ui/core';
import React from 'react';
import { setterState } from './File';
import PreviewLabel from './PreviewLabel';

export default function Email({ data, onSaveFormValues, getFormValue }) {
  return (
    <Box marginBottom="20px">
      <PreviewLabel
        required={data?.required}
        description={data?.description}
        question={data?.question}
      />
      <TextField
        id="standard-basic-email"
        variant="standard"
        placeholder="some@example.com"
        style={{ width: '100%' }}
        value={
          typeof data.questionBankIndex === 'number'
            ? getFormValue()?.[data.questionBankIndex] || ''
            : getFormValue() || ''
        }
        onChange={(e) => {
          setterState(
            data.questionBankIndex,
            onSaveFormValues,
            e.target.value || null
          );
        }}
        error={data?.showRequired}
        helperText={data?.showRequired ? data?.requiredMessage : ''}
      />
    </Box>
  );
}
