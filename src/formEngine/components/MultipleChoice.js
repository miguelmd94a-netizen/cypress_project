import { Box, Checkbox, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { setterState, wiredValue } from './File';
import PreviewLabel from './PreviewLabel';

export default function MultipleChoice({
  data,
  getFormValue,
  onSaveFormValues,
}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    wiredValue(data.questionBankIndex, getFormValue, setOptions);
  }, [data]);

  return (
    <Box marginBottom="20px">
      <PreviewLabel
        required={data?.required}
        description={data?.description}
        question={data?.question}
      />

      {data?.options?.map((option, index) => (
        <Box display="flex" alignItems="center" key={index} marginBottom="10px">
          <Checkbox
            color="default"
            checked={options.includes(option)}
            onChange={() => {
              const optionsCopy = Array.from(options);
              if (options.includes(option)) {
                const idx = options.indexOf(option);
                optionsCopy.splice(idx, 1);
              } else {
                optionsCopy.push(option);
              }
              setterState(
                data.questionBankIndex,
                onSaveFormValues,
                optionsCopy
              );
              setOptions(optionsCopy);
            }}
            inputProps={{ 'aria-label': 'checkbox with default color' }}
            style={{ padding: 0, marginRight: 5 }}
          />
          <Typography style={{ color: '#00000061' }}>{option}</Typography>
        </Box>
      ))}

      {data?.showRequired && <LabelError>{data?.requiredMessage}</LabelError>}
    </Box>
  );
}

export const LabelError = styled.p`
  color: #f44336;
  margin: 0;
  font-size: 0.75rem;
  margin-top: 3 px;
  text-align: left;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.66;
  letter-spacing: 0.03333em;
`;
