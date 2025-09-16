import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import {
  getCitiesOfState,
  getStatesOfCountry,
} from '../../services/countryStateService';
import { checkValues } from '../../utils/validateForm';

import PreviewLabel from './PreviewLabel';

const values = {
  street: null,
  aptUnit: null,
  state: null,
  city: null,
  zipCode: null,
};

export default function AddressInfo({ data, onSaveFormValues, getFormValue }) {
  const city = useInput('');
  const state = useInput(
    typeof data.questionBankIndex === 'number'
      ? getFormValue()?.[data.questionBankIndex] || ''
      : getFormValue()?.state || ''
  );
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getStatesOfCountry().then((res) => setStates(res));
  }, []);

  useEffect(() => {
    if (state.value) {
      const isoCodeState = states.find((st) => st.name === state.value);

      getCitiesOfState(isoCodeState?.isoCode).then((res) => setCities(res));
    }
  }, [state.value, states]);

  return (
    <Box marginBottom="20px">
      <PreviewLabel description={data?.description} question={data?.question} />
      <Grid container spacing={2}>
        {data?.street?.visible && (
          <Grid item xs={6}>
            <TextField
              label={
                <>
                  {data?.street?.text}
                  {data?.street?.required && (
                    <span style={{ color: 'red', fontSize: 12 }}>*</span>
                  )}{' '}
                </>
              }
              variant="standard"
              style={{ width: '100%' }}
              value={
                typeof data.questionBankIndex === 'number'
                  ? getFormValue()?.[data.questionBankIndex] || ''
                  : getFormValue()?.street || ''
              }
              onChange={(e) => {
                onSaveFormValues({
                  ...checkValues(getFormValue(), values),
                  street: e.target.value || null,
                });
              }}
              error={data?.street?.showRequired}
              helperText={
                data?.street?.showRequired && 'This field is required'
              }
            />
          </Grid>
        )}
        {data?.aptUnit?.visible && (
          <Grid item xs={6}>
            <TextField
              label={
                <>
                  {data?.aptUnit?.text}
                  {data?.aptUnit?.required && (
                    <span style={{ color: 'red', fontSize: 12 }}>*</span>
                  )}{' '}
                </>
              }
              variant="standard"
              style={{ width: '100%' }}
              value={
                typeof data.questionBankIndex === 'number'
                  ? getFormValue()?.[data.questionBankIndex] || ''
                  : getFormValue()?.aptUnit || ''
              }
              onChange={(e) => {
                onSaveFormValues({
                  ...checkValues(getFormValue(), values),
                  aptUnit: e.target.value || null,
                });
              }}
              error={data?.aptUnit?.showRequired}
              helperText={
                data?.aptUnit?.showRequired && 'This field is required'
              }
            />
          </Grid>
        )}
        {data?.state?.visible && (
          <Grid item xs={6}>
            <FormControl
              style={{ width: '100%' }}
              error={data?.state?.showRequired}
            >
              <InputLabel id="demo-simple-select-label">
                {' '}
                {data?.state?.text}
                {data?.state?.required && (
                  <span style={{ color: 'red', fontSize: 12 }}>*</span>
                )}{' '}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={
                  typeof data.questionBankIndex === 'number'
                    ? getFormValue()?.[data.questionBankIndex] || ''
                    : getFormValue()?.state || ''
                }
                onChange={(e) => {
                  state.onChange(e);

                  onSaveFormValues({
                    ...checkValues(getFormValue(), values),
                    state: e.target.value || null,
                  });
                }}
              >
                {states.map((st, i) => (
                  <MenuItem key={i} value={st.name}>
                    {st.name}
                  </MenuItem>
                ))}
              </Select>
              {data?.state?.showRequired && (
                <FormHelperText>This field is required</FormHelperText>
              )}
            </FormControl>
          </Grid>
        )}
        {data?.city?.visible && (
          <Grid item xs={6}>
            <FormControl
              style={{ width: '100%' }}
              error={data?.city?.showRequired}
            >
              <InputLabel id="demo-simple-select-label1">
                {' '}
                {data?.city?.text}
                {data?.city?.required && (
                  <span style={{ color: 'red', fontSize: 12 }}>*</span>
                )}{' '}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select1"
                value={
                  typeof data.questionBankIndex === 'number'
                    ? getFormValue()?.[data.questionBankIndex] || ''
                    : getFormValue()?.city || ''
                }
                onChange={(e) => {
                  city.onChange(e);

                  onSaveFormValues({
                    ...checkValues(getFormValue(), values),
                    city: e.target.value || null,
                  });
                }}
              >
                {cities.map((cy, i) => (
                  <MenuItem key={i} value={cy.name}>
                    {cy.name}
                  </MenuItem>
                ))}
              </Select>
              {data?.city?.showRequired && (
                <FormHelperText>This field is required</FormHelperText>
              )}
            </FormControl>
          </Grid>
        )}
        {data?.zipCode?.visible && (
          <Grid item xs={6}>
            <TextField
              label={
                <>
                  {data?.zipCode?.text}
                  {data?.zipCode?.required && (
                    <span style={{ color: 'red', fontSize: 12 }}>*</span>
                  )}{' '}
                </>
              }
              inputProps={{ maxLength: 5 }}
              variant="standard"
              style={{ width: '100%' }}
              value={
                typeof data.questionBankIndex === 'number'
                  ? getFormValue()?.[data.questionBankIndex] || ''
                  : getFormValue()?.zipCode || ''
              }
              onChange={(e) => {
                if (e.target.value && !/^[0-9\b]+$/.test(e.target.value)) {
                  return;
                }
                onSaveFormValues({
                  ...checkValues(getFormValue(), values),
                  zipCode: e.target.value || null,
                });
              }}
              error={data?.zipCode?.showRequired}
              helperText={
                data?.zipCode?.showRequired && 'This field is required'
              }
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
