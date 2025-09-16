import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import React from 'react';
import useInput from '../../hooks/useInput';
import PreviewLabel from './PreviewLabel';
import { setterState } from './File';

export default function PrimaryLanguage({
  data,
  onSaveFormValues,
  getFormValue,
}) {
  const primaryLanguage = useInput('');
  const languageInput = useInput('');

  return (
    <Box marginBottom="20px">
      <PreviewLabel
        required={data?.required}
        description={data?.description}
        question="Is English your primary language?"
      />
      <RadioGroup
        aria-label="primaryLanguage"
        name="primaryLanguage"
        value={
          // if(getFormValue()?.[data.questionBankIndex] !== 'yes') {
          //     return 'no'
          //   }else if(!getFormValue()?.[data.questionBankIndex]) {
          //     return ''
          //   }else {
          //     return 'yes'
          //   }

          //   return ''
          !getFormValue()?.[data.questionBankIndex]
            ? ''
            : getFormValue()?.[data.questionBankIndex] !== 'yes'
            ? 'no'
            : 'yes'
        }
        onChange={(e) => {
          primaryLanguage.onChange(e);
          setterState(data.questionBankIndex, onSaveFormValues, e.target.value);
        }}
      >
        <Box display="flex" alignItems="center" marginBottom="10px">
          <FormControlLabel
            value="yes"
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
            value="no"
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
        {!getFormValue()?.[data.questionBankIndex] ||
          (getFormValue()?.[data.questionBankIndex] !== 'yes' && (
            <TextField
              id="standard-basic"
              label="If not please enter primary language"
              value={
                !getFormValue()?.[data.questionBankIndex] ||
                (getFormValue()?.[data.questionBankIndex] !== 'yes' &&
                  getFormValue()?.[data.questionBankIndex] !== 'no' &&
                  getFormValue()?.[data.questionBankIndex]) ||
                ''
              }
              style={{ marginTop: 5 }}
              onChange={(e) => {
                languageInput.onChange(e);
                setterState(
                  data.questionBankIndex,
                  onSaveFormValues,
                  e.target.value || null
                );
              }}
              autoComplete="off"
            />
          ))}
      </RadioGroup>
    </Box>
  );
}
