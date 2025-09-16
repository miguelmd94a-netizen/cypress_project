import { Box, TextField } from '@material-ui/core';
import React from 'react';
import PreviewLabel from './PreviewLabel';

export default function LongText({ data, onSaveFormValues, getFormValue }) {
  return (
    <Box marginBottom="20px">
      <PreviewLabel
        required={data?.required}
        description={data?.description}
        question={data?.question}
      />
      <TextField
        id="standard-basic-longText"
        variant="standard"
        placeholder="A Long text"
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
        multiline
        rows={4}
        error={data?.showRequired}
        helperText={data?.showRequired ? data?.requiredMessage : ''}
      />
    </Box>
  );
}
