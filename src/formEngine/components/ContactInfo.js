import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import InputPhone from '../../components/InputPhone';
import { checkValues } from '../../utils/validateForm';

import { LabelError } from './MultipleChoice';
import PreviewLabel from './PreviewLabel';

const values = {
  email: null,
  firstName: null,
  lastName: null,
  phone: null,
  fileAnonymously: null,
  workTelephone: null,
};

export default function ContactInfo({ data, getFormValue, onSaveFormValues }) {
  const getValue = () => {
    if (typeof data.questionBankIndex === 'number') {
    }
    if (
      getFormValue()?.fileAnonymously ||
      getFormValue()?.[0]?.fileAnonymously
    ) {
      return 'yes';
    }
    if (
      getFormValue()?.fileAnonymously === false ||
      getFormValue()?.[0]?.fileAnonymously === false
    ) {
      return 'no';
    }

    return null;
  };

  return (
    <Box marginBottom="20px">
      <PreviewLabel description={data?.description} question={data?.question} />
      <Grid container spacing={2}>
        {data?.showFileAnonymously && (
          <Grid item xs={7}>
            <Typography style={{ fontSize: 14, marginBottom: 15 }}>
              Do you want to file anonymously?{' '}
              <span style={{ color: 'red', fontSize: 12 }}>*</span>
            </Typography>
            <RadioGroup
              aria-label="anonymous"
              name="anonymous"
              value={getValue()}
              onChange={(e) => {
                onSaveFormValues(
                  typeof data?.questionBankIndex === 'number'
                    ? [
                        {
                          ...checkValues(getFormValue()[0], values),
                          fileAnonymously: e.target.value === 'yes',
                        },
                      ]
                    : {
                        ...checkValues(getFormValue(), values),
                        fileAnonymously: e.target.value === 'yes',
                      }
                );
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
            </RadioGroup>
            {data?.showFileanonymouslyError && (
              <LabelError>This field is required</LabelError>
            )}
          </Grid>
        )}
        {data?.firstName?.visible && (
          <Grid item xs={6}>
            <TextField
              label={
                <>
                  {data?.firstName?.text}
                  {data?.firstName?.required && (
                    <span style={{ color: 'red', fontSize: 12 }}>*</span>
                  )}{' '}
                </>
              }
              variant="standard"
              style={{ width: '100%' }}
              placeholder={data?.firstName?.text}
              value={
                typeof data?.questionBankIndex === 'number'
                  ? getFormValue()?.[0]?.firstName || ''
                  : getFormValue()?.firstName || ''
              }
              onChange={(e) => {
                onSaveFormValues(
                  typeof data?.questionBankIndex === 'number'
                    ? [
                        {
                          ...checkValues(getFormValue()[0], values),
                          firstName: e.target.value || null,
                        },
                      ]
                    : {
                        ...checkValues(getFormValue(), values),
                        firstName: e.target.value || null,
                      }
                );
              }}
              error={data?.firstName?.showRequired}
              helperText={
                data?.firstName?.showRequired && 'This field is required'
              }
            />
          </Grid>
        )}
        {data?.lastName?.visible && (
          <Grid item xs={6}>
            <TextField
              label={
                <>
                  {data?.lastName?.text}
                  {data?.lastName?.required && (
                    <span style={{ color: 'red', fontSize: 12 }}>*</span>
                  )}{' '}
                </>
              }
              variant="standard"
              style={{ width: '100%' }}
              placeholder={data?.lastName?.text}
              value={
                typeof data?.questionBankIndex === 'number'
                  ? getFormValue()?.[0]?.lastName || ''
                  : getFormValue()?.lastName || ''
              }
              onChange={(e) => {
                onSaveFormValues(
                  typeof data?.questionBankIndex === 'number'
                    ? [
                        {
                          ...checkValues(getFormValue()[0], values),
                          lastName: e.target.value || null,
                        },
                      ]
                    : {
                        ...checkValues(getFormValue(), values),
                        lastName: e.target.value || null,
                      }
                );
              }}
              error={data?.lastName?.showRequired}
              helperText={
                data?.lastName?.showRequired && 'This field is required'
              }
            />
          </Grid>
        )}
        {data?.email?.visible && (
          <Grid item xs={6} style={{ marginTop: 2 }}>
            <TextField
              label={
                <>
                  {data?.email?.text}
                  {data?.email?.required && (
                    <span style={{ color: 'red', fontSize: 12 }}>*</span>
                  )}
                  {!data?.email?.required && getValue() === 'no' && (
                    <span style={{ color: 'red', fontSize: 12 }}>*</span>
                  )}{' '}
                </>
              }
              variant="standard"
              style={{ width: '100%' }}
              placeholder={data?.email?.text}
              value={
                typeof data?.questionBankIndex === 'number'
                  ? getFormValue()?.[0]?.email || ''
                  : getFormValue()?.email || ''
              }
              onChange={(e) => {
                onSaveFormValues(
                  typeof data?.questionBankIndex === 'number'
                    ? [
                        {
                          ...checkValues(getFormValue()[0], values),
                          email: e.target.value || null,
                        },
                      ]
                    : {
                        ...checkValues(getFormValue(), values),
                        email: e.target.value || null,
                      }
                );
              }}
              error={data?.email?.showRequired}
              helperText={data?.email?.showRequired && 'This field is required'}
            />
          </Grid>
        )}
        {data?.phone?.visible && (
          <Grid item xs={6}>
            <InputPhone
              label={
                <>
                  {data?.phone?.text}
                  {data?.phone?.required && (
                    <span style={{ color: 'red', fontSize: 12 }}>*</span>
                  )}{' '}
                </>
              }
              value={
                typeof data?.questionBankIndex === 'number'
                  ? getFormValue()?.[0]?.phone || ''
                  : getFormValue()?.phone || ''
              }
              onChange={(phone) => {
                onSaveFormValues(
                  typeof data?.questionBankIndex === 'number'
                    ? [
                        {
                          ...checkValues(getFormValue()[0], values),
                          phone: phone || null,
                        },
                      ]
                    : {
                        ...checkValues(getFormValue(), values),
                        phone: phone || null,
                      }
                );
              }}
              hasError={data?.phone?.showRequired}
            />
            {data?.phone?.showRequired && (
              <LabelError>This field is required</LabelError>
            )}
          </Grid>
        )}
        {data?.workTelephone?.visible && (
          <Grid item xs={6}>
            <InputPhone
              label={
                <>
                  {data?.workTelephone?.text}
                  {data?.workTelephone?.required && (
                    <span style={{ color: 'red', fontSize: 12 }}>*</span>
                  )}{' '}
                </>
              }
              value={
                typeof data?.questionBankIndex === 'number'
                  ? getFormValue()?.[0]?.workTelephone || ''
                  : getFormValue()?.workTelephone || ''
              }
              onChange={(workTelephone) => {
                onSaveFormValues(
                  typeof data?.questionBankIndex === 'number'
                    ? [
                        {
                          ...checkValues(getFormValue()[0], values),
                          workTelephone: workTelephone || null,
                        },
                      ]
                    : {
                        ...checkValues(getFormValue(), values),
                        workTelephone: workTelephone || null,
                      }
                );
              }}
              hasError={data?.workTelephone?.showRequired}
            />
            {data?.workTelephone?.showRequired && (
              <LabelError>This field is required</LabelError>
            )}
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
