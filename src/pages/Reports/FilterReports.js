import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';
import { getOptions } from '../../services/unarmed';

const useStyles = makeStyles(() => ({
  container: {
    minWidth: 310,
    background: '#fff',
    borderRadius: '5px`',
    marginBottom: 20,
    height: '100%',
  },
  sectionText1: {
    color: '#000000DE',
    fontSize: 16,
    fontWeight: 500,
  },
  sectionText: {
    color: '#000000DE',
    fontSize: 16,
    fontWeight: 500,
    padding: '7px 0',
  },
  radioLabel: {
    color: '#00000099',
    fontSize: 14,
  },
  formControl: {
    margin: '10px 0',
    width: '100%',
  },
}));

export const unwindByOptions = [
  '',
  '',
  'raceEthnicity',
  'allegations',
  'dispositions',
  'discipline',
  'source',
  'reporter',
  'race',
  'ethnicity',
];

const renderText = (value) => {
  switch (value) {
    case 2:
      return 'Race/Ethnicity';
    case 3:
      return 'Allegation';
    case 4:
      return 'Disposition';
    case 5:
      return 'Discipline';
    case 6:
      return 'Source';
    case 7:
      return 'Reporter';
    case 8:
      return 'Race';
    case 9:
      return 'Ethnicity';

    default:
      return 'Option';
  }
};

const START_YEAR = 1900;

const FilterReports = ({
  value,
  setValue,
  dateRange,
  optionValue,
  startYear,
  startMonth,
  endYear,
  endMonth,
  endMonthIndex,
  onClose,
  organizationId,
  selectOptions,
  dateFromType,
  loading,
}) => {
  const classes = useStyles();
  const desktop = useMediaQuery('(min-width:1150px)');
  const [optionsSelect, setOptionsSelect] = useState([]);

  const years = useMemo(() => {
    const yearsOptions = [];

    const yearRange = parseInt(moment().format('YYYY')) - START_YEAR;

    for (let i = 0; i < yearRange; i++) {
      yearsOptions.push(START_YEAR + i);
    }

    const formattedOptions = yearsOptions
      .map((year, index) => parseInt(moment().format('YYYY')) - index)
      .filter((year) => (dateFromType && dateFromType.year > 0 ? year >= dateFromType.year : true));

    return formattedOptions;
  }, [startYear, dateFromType]);

  const getStartYears = useCallback(() => {
    return years.map((yearFormatted) => {
      let disabled = false;

      if (yearFormatted > endYear.value) {
        disabled = true;
      }

      return (
        <MenuItem disabled={disabled} value={yearFormatted} key={yearFormatted}>
          {yearFormatted}
        </MenuItem>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [years]);

  const getEndYears = useCallback(() => {
    return years.map((yearFormatted) => {
      let disabled = false;

      if (yearFormatted < startYear.value) {
        disabled = true;
      }

      return (
        <MenuItem disabled={disabled} value={yearFormatted} key={yearFormatted}>
          {yearFormatted}
        </MenuItem>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [years, startYear]);

  const months = moment.monthsShort();

  useEffect(() => {
    const onGetOptions = async () => {
      try {
        const { data } = await getOptions(
          organizationId,
          value > 0 ? 'COMPLAINT' : 'COMPLIMENT',
          unwindByOptions[value]
        );

        setOptionsSelect(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (organizationId && value !== '' && unwindByOptions[value]) {
      onGetOptions();
    }
  }, [value, organizationId]);

  const onChangeEndYear = (e) => {
    const newValue = parseInt(e.target.value);

    if (newValue < startYear.value) {
      endYear.setValue(startYear.value);
      return;
    }

    if (newValue === startYear.value && endMonth.value < startMonth.value) {
      if (startMonth.value < 11) {
        endMonth.setValue(startMonth.value + 1);
      } else {
        const maxYear = Math.max(...years);

        if (startYear.value + 1 < maxYear) {
          endMonth.setValue(0);
          endYear.setValue(startYear.value + 1);
        } else {
          startMonth.setValue(startMonth.value - 1);
          endMonth.setValue(11);
        }

        return;
      }
    }

    endYear.onChange(e);
  };

  const onChangeStartYear = (e) => {
    const newValue = parseInt(e.target.value);

    if (newValue > endYear.value) {
      startYear.setValue(startYear.value);
      return;
    }

    if (newValue === endYear.value && startMonth.value > endMonth.value) {
      if (startMonth.value < 11) {
        endMonth.setValue(startMonth.value + 1);
      } else {
        const maxYear = Math.max(...years);

        if (newValue + 1 < maxYear) {
          endMonth.setValue(0);
          endYear.setValue(newValue + 1);
        } else {
          startMonth.setValue(startMonth.value - 1);
          endMonth.setValue(11);
        }
      }
    }

    startYear.onChange(e);
  };

  const onChangeEndMonth = (e) => {
    if (startYear.value === endYear.value && parseInt(e.target.value) < startMonth.value) {
      endMonth.setValue(endMonth.value);
      return;
    }
    endMonth.onChange(e);
  };

  const onChangeStartMonth = (e) => {
    if (startYear.value === endYear.value && parseInt(e.target.value) > endMonth.value) {
      startMonth.setValue(startMonth.value);
      return;
    }

    startMonth.onChange(e);
  };

  const onReset = () => {
    dateRange.setRadio('year');
    optionValue.setValue('All');
    startYear.setValue(dateFromType.year);
    endYear.setValue(moment().format('YYYY'));
    startMonth.setValue(dateFromType.month - 1);
    endMonth.setValue(endMonthIndex);
  };

  const handleChange = (newValue) => {
    setValue(newValue);

    optionValue.setValue('All');
  };

  return (
    <Box boxShadow="0px 3px 6px #0000000D" className={classes.container}>
      <Box padding="8px 32px" display="flex" alignItems="center" justifyContent="space-between">
        <Typography className={classes.sectionText1}>Reports</Typography>
        {!desktop && (
          <Box style={{ cursor: 'pointer' }} onClick={onClose}>
            <CloseIcon htmlColor="#333" />
          </Box>
        )}
      </Box>
      <Divider />
      <Box padding="16px 32px" width="100%">
        <Select
          labelId="demo-simple-select-label1"
          id="demo-simple-select1"
          style={{ width: '100%' }}
          value={value}
          onChange={(e) => {
            handleChange(e.target.value);
            if (!desktop) {
              onClose();
            }
          }}
        >
          {selectOptions.length > 0 ? (
            selectOptions?.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.text}
              </MenuItem>
            ))
          ) : (
            <MenuItem value={0} disabled>
              Loading...
            </MenuItem>
          )}
        </Select>
      </Box>

      <Box padding="16px 32px">
        <Typography className={classes.sectionText1}>Filter</Typography>
      </Box>
      <Divider />
      <Box padding="16px 32px">
        <Typography className={classes.sectionText}>Date Range</Typography>
        <RadioGroup
          aria-label="position"
          name="data-range"
          defaultValue="top"
          value={dateRange.radio}
          onChange={dateRange.onChangeRadio}
        >
          <FormControlLabel
            value="year"
            className={classes.radioLabel}
            control={<Radio color="primary" />}
            label={<Typography className={classes.radioLabel}>Year</Typography>}
          />
          {dateRange.radio === 'year' && (
            <Box display="flex">
              <FormControl className={classes.formControl} style={{ marginRight: 10 }}>
                <InputLabel id="demo-simple-select-label">Start Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={startYear.value}
                  onChange={onChangeStartYear}
                  disabled={loading}
                >
                  {getStartYears()}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">End Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={endYear.value}
                  onChange={onChangeEndYear}
                >
                  {getEndYears()}
                </Select>
              </FormControl>
            </Box>
          )}
          <FormControlLabel
            value="month"
            control={<Radio color="primary" />}
            label={<Typography className={classes.radioLabel}>Month</Typography>}
            className={classes.radioLabel}
          />
          {dateRange.radio === 'month' && (
            <>
              <Box display="flex">
                <FormControl className={classes.formControl} style={{ marginRight: 10 }}>
                  <InputLabel id="demo-simple-select-label">Start Month</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={startMonth.value}
                    onChange={onChangeStartMonth}
                    disabled={loading}
                  >
                    {months.map((month) => {
                      const value = months.indexOf(month);
                      let disabled = false;

                      if (startYear.value === dateFromType.year) {
                        disabled = value < dateFromType.month - 1;
                      }

                      if (startYear.value === endYear.value && startYear.value !== dateFromType.year) {
                        disabled = value > endMonth.value;
                      }

                      return (
                        <MenuItem value={value} disabled={disabled}>
                          {month}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Start Year</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={startYear.value}
                    onChange={onChangeStartYear}
                  >
                    {getStartYears()}
                  </Select>
                </FormControl>
              </Box>
              <Box display="flex">
                <FormControl className={classes.formControl} style={{ marginRight: 10 }}>
                  <InputLabel id="demo-simple-select-label">End Month</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={endMonth.value}
                    onChange={onChangeEndMonth}
                  >
                    {months.map((month) => {
                      const value = months.indexOf(month);

                      let disabled = false;

                      if (startYear.value === endYear.value && endYear.value === dateFromType.year) {
                        disabled = value < dateFromType.month - 1 || value < startMonth.value;
                      }

                      if (startYear.value === endYear.value && endYear.value !== dateFromType.year) {
                        disabled = value < startMonth.value;
                      }

                      return (
                        <MenuItem disabled={disabled} value={value}>
                          {month}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">End Year</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={endYear.value}
                    onChange={onChangeEndYear}
                  >
                    {getEndYears()}
                  </Select>
                </FormControl>
              </Box>
            </>
          )}
          {/* <FormControlLabel
            value="day"
            control={<Radio color="primary" />}
            label={<Typography className={classes.radioLabel}>Day</Typography>}
            className={classes.radioLabel}
          /> */}
        </RadioGroup>

        {value > 1 && (
          <>
            <Typography className={classes.sectionText}>{renderText(value)}</Typography>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label-1">Select a {renderText(value)}</InputLabel>
              <Select
                labelId="demo-simple-select-label-1"
                id="demo-simple-select-1"
                style={{ width: '100%' }}
                value={optionValue.value}
                onChange={optionValue.onChange}
              >
                <MenuItem value="All">All</MenuItem>
                {optionsSelect.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        <Typography
          className={classes.sectionText}
          style={{ marginTop: 30, color: '#4B7BFF', cursor: 'pointer' }}
          onClick={onReset}
        >
          RESET ALL
        </Typography>
      </Box>
    </Box>
  );
};

export default FilterReports;
