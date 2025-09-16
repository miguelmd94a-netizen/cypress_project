import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

function TImePickerMUI({ time, setTIme, label }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        style={{ width: '100%' }}
        id="time-picker"
        label={label}
        mask="__:__ _M"
        value={time}
        onChange={setTIme}
        keyboardIcon={<AccessTimeIcon />}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default TImePickerMUI;
