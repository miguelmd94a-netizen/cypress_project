import { Box } from '@material-ui/core';
import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PreviewLabel from './PreviewLabel';

export default function Date({ data, onSaveFormValues, getFormValue }) {
  const getStateValue = () => {
    if (data?.isDemographics) {
      return getFormValue()?.[data?.demographicKey] || null;
    }
    if (typeof data.questionBankIndex === 'number') {
      return getFormValue()?.[data.questionBankIndex] || null;
    }
    return getFormValue() || null;
  };

  return (
    <Box marginBottom="20px">
      <PreviewLabel
        required={data?.required}
        description={data?.description}
        question={data?.question}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          style={{ width: '100%' }}
          placeholder="01/01/1970"
          value={getStateValue()}
          onChange={(date) => {
            if (typeof data.questionBankIndex === 'number') {
              if (data.isDemographics) {
                const obj = { ...(getFormValue() || {}) };
                obj[data.demographicKey] = date;
                onSaveFormValues(obj, data.questionBankIndex);
              } else {
                onSaveFormValues([date] || [null]);
              }
            } else {
              onSaveFormValues(date || null);
            }
            // if (data.hasOwnProperty('questionBankIndex')) {
            //   const value = [];
            //   value[data.questionBankIndex] = date;

            //   onSaveFormValues(value);
            //   return;
            // }
            // onSaveFormValues(date);
          }}
          id="date-picker-dialog"
          format="MM/dd/yyyy"
          icon={<CalendarTodayIcon />}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          error={data?.showRequired}
          helperText={data?.showRequired ? data?.requiredMessage : ''}
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
}
