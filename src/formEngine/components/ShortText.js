import { Box, TextField } from '@material-ui/core';
import React from 'react';
import PreviewLabel from './PreviewLabel';

export default function ShortText({ data, onSaveFormValues, getFormValue }) {
  return (
    <Box marginBottom="20px">
      <PreviewLabel
        required={data?.required}
        description={data?.description}
        question={data?.question}
      />
      <TextField
        id="standard-basic-shortText"
        variant="standard"
        placeholder="A short text"
        style={{ width: '100%' }}
        value={
          typeof data.questionBankIndex === 'number'
            ? getFormValue()?.[data.questionBankIndex] || ''
            : getFormValue() || ''
        }
        onChange={(e) => {
          if (data.hasOwnProperty('questionBankIndex')) {
            const value = [];
            value[data.questionBankIndex] = e.target.value || null;

            onSaveFormValues(value);
            return;
          }
          onSaveFormValues(e.target.value || null);
        }}
        inputProps={{ maxLength: data?.maxCharacters }}
        error={data?.showRequired}
        helperText={data?.showRequired ? data?.requiredMessage : ''}
      />
    </Box>
  );
}
