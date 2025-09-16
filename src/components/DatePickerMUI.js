import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

function DatePickerMUI({ date, setdate, label, disableFuture }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        style={{ width: '100%' }}
        value={date}
        onChange={setdate}
        id="date-picker-dialog"
        label={label}
        disableFuture={disableFuture}
        format="MM/dd/yyyy"
        icon={<CalendarTodayIcon />}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default DatePickerMUI;
