import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  Input,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import PreviewLabel from './PreviewLabel';

export default function Dropdown({
  data,
  getFormValue,
  onSaveFormValues,
  subIndex,
}) {
  const [dropdownArray, setDropdownArray] = useState([]);
  const dropdownString = useInput('');

  const getStateValue = () => {
    if (data?.isDemographics) {
      return getFormValue()?.[data?.demographicKey] || '';
    }
    if (typeof data.questionBankIndex === 'number') {
      return getFormValue()?.[data.questionBankIndex] || '';
    }
    return getFormValue() || '';
  };
  useEffect(() => {
    if (getFormValue()?.[data.questionBankIndex]?.length > 0) {
      if (typeof subIndex === 'number') {
        setDropdownArray(getFormValue()[subIndex]);
      } else {
        setDropdownArray(getFormValue());
      }
    }
  }, [data]);
  return (
    <Box marginBottom="20px">
      <PreviewLabel
        required={data?.required}
        description={data?.description}
        question={data?.question}
      />
      <FormControl error={data?.showRequired} style={{ width: '100%' }}>
        {data?.multipleChoice === true ? (
          <Select
            // labelId="demo-simple-select-label121"
            // id="demo-simple-select22"
            multiple
            value={dropdownArray}
            displayEmpty
            input={<Input />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Typography style={{ fontSize: 14, color: '#000000DE' }}>
                    Select an Option
                  </Typography>
                );
              }
              if (typeof data.options[0] === 'object') {
                const selectedOptions = selected.map((sted) =>
                  data.options.find((option) => option.value === sted)
                );
                return selectedOptions
                  .map((sOption) => sOption.label)
                  .join(', ');
              }

              return selected.join(', ');
            }}
            onChange={(e) => {
              if (typeof subIndex === 'number') {
                if (data.isDemographics) {
                  const obj = { ...(getFormValue() || {}) };
                  obj[data.demographicKey] = e.target.value;
                  onSaveFormValues(obj, data.questionBankIndex);
                } else {
                  const subArrayValue = [...getFormValue()];
                  subArrayValue[subIndex] = e.target.value;
                  onSaveFormValues(subArrayValue);
                }
              } else {
                onSaveFormValues(e.target.value);
              }
              setDropdownArray(e.target.value);
            }}
            style={{ width: '100%' }}
          >
            <MenuItem disabled value="">
              <Typography style={{ fontSize: 14, color: '#000000DE' }}>
                Select an Option
              </Typography>
            </MenuItem>
            {data?.options?.map((option, i) => {
              if (typeof option === 'string') {
                return (
                  <MenuItem key={i} value={option}>
                    <Checkbox
                      color="primary"
                      checked={dropdownArray.indexOf(option) > -1}
                    />
                    <ListItemText primary={option} />
                  </MenuItem>
                );
              }

              return (
                <MenuItem key={i} value={option.value}>
                  <Checkbox
                    color="primary"
                    checked={dropdownArray.indexOf(option.value) > -1}
                  />
                  <ListItemText primary={option.label} />
                </MenuItem>
              );
            })}
          </Select>
        ) : (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            multiple={false}
            value={getStateValue()}
            onChange={(e) => {
              dropdownString.onChange(e);
              if (typeof data.questionBankIndex === 'number') {
                if (data.isDemographics) {
                  const obj = { ...(getFormValue() || {}) };
                  obj[data.demographicKey] = e.target.value;
                  onSaveFormValues(obj, data.questionBankIndex);
                } else {
                  onSaveFormValues([e.target.value]);
                }
              } else {
                onSaveFormValues(e.target.value);
              }
            }}
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <Typography style={{ fontSize: 14, color: '#000000DE' }}>
                    Select an Option
                  </Typography>
                );
              }
              return selected;
            }}
            displayEmpty
            style={{ width: '100%' }}
          >
            <MenuItem disabled value="">
              <Typography style={{ fontSize: 14, color: '#000000DE' }}>
                Select an Option
              </Typography>
            </MenuItem>
            {data?.options?.map((option, i) => {
              if (typeof option === 'string') {
                return (
                  <MenuItem key={i} value={option}>
                    <ListItemText primary={option} />
                  </MenuItem>
                );
              }

              return (
                <MenuItem key={i} value={option.value}>
                  <ListItemText primary={option.label} />
                </MenuItem>
              );
            })}
          </Select>
        )}
        {data?.showRequired && (
          <FormHelperText>{data?.requiredMessage}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
