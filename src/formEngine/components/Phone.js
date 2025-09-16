import { Box } from '@material-ui/core';
import React from 'react';
import InputPhone from '../../components/InputPhone';
import { setterState } from './File';
import { LabelError } from './MultipleChoice';
import PreviewLabel from './PreviewLabel';

export default function Phone({ data, onSaveFormValues, getFormValue }) {
  return (
    <Box marginBottom="20px">
      <PreviewLabel
        required={data?.required}
        description={data?.description}
        question={data?.question}
      />
      <Box width="100%">
        <InputPhone
          label=""
          value={
            typeof data.questionBankIndex === 'number'
              ? getFormValue()?.[data.questionBankIndex] || ''
              : getFormValue() || ''
          }
          onChange={(phone) => {
            setterState(
              data.questionBankIndex,
              onSaveFormValues,
              phone || null
            );
          }}
          hasError={data?.showRequired}
        />
      </Box>
      {data?.showRequired && <LabelError>{data?.requiredMessage}</LabelError>}
    </Box>
  );
}
