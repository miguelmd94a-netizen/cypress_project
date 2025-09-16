import { Box } from '@material-ui/core';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PreviewLabel from './PreviewLabel';

export default function Hour({ data, onSaveFormValues, getFormValue }) {
  return (
    <Box marginBottom="20px">
      <PreviewLabel
        required={data?.required}
        description={data?.description}
        question={data?.question}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          ampm
          style={{ width: '100%' }}
          placeholder="08:00 AM"
          mask="__:__ _M"
          value={
            typeof data.questionBankIndex === 'number'
              ? (getFormValue()?.[data.questionBankIndex] &&
                  moment(
                    `${moment().format('MM-DD-YYYY')} ${getFormValue()}`
                  ).format()) ||
                null
              : (getFormValue() &&
                  moment(
                    `${moment().format('MM-DD-YYYY')} ${getFormValue()}`
                  ).format()) ||
                null
          }
          onChange={(date) => {
            if (data.hasOwnProperty('questionBankIndex')) {
              const value = [];
              if (moment(date).format('hh:mm A') === 'Invalid date') {
                value[data.questionBankIndex] = null;
              } else {
                value[data.questionBankIndex] = moment(date).format('hh:mm A');
              }

              onSaveFormValues(value);
              return;
            }

            if (moment(date).format('hh:mm A') === 'Invalid date') {
              onSaveFormValues(null);
              return;
            }
            onSaveFormValues(moment(date).format('hh:mm A'));
          }}
          keyboardIcon={<AccessTimeIcon />}
          error={data?.showRequired}
          helperText={data?.showRequired ? data?.requiredMessage : ''}
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
}
