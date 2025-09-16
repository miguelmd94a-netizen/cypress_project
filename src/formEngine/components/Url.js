import {
  Box,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import PreviewLabel from './PreviewLabel';
import { wiredValue } from './File';
import useInput from '../../hooks/useInput';
import { LabelError } from './MultipleChoice';

const urlExpression = /https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const onChangeItem = (e, index, setItems, items, setter, isQuestionBank) => {
  const { value } = e.target;
  const itemsCopy = Array.from(items);
  itemsCopy[index] = value || null;

  if (isQuestionBank) {
    setter([itemsCopy]);
  } else {
    setter(itemsCopy);
  }

  setItems(itemsCopy);
};

export const onAddItems = (items, setItems, data, setter) => {
  if (typeof setter === 'function') {
    setter([...items, data]);
  }
  setItems([...items, data]);
};

export const onDeleteItem = (items, setItems, item, setter) => {
  const itemsCopy = [...items];
  itemsCopy.splice(item, 1);
  if (typeof setter === 'function') {
    setter(itemsCopy);
  }
  setItems(itemsCopy);
};

const validateURl = (value) => {
  if (value.match(urlExpression)) {
    return '';
  }
  return 'Please enter a valid url, must have http or https at the beginning';
};

const useStyles = makeStyles(() => ({
  textField: {
    width: '100%',
    marginBottom: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    cursor: 'pointer',
  },

  deleteItemsicon: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    cursor: 'pointer',
  },
}));

export default function Url({ data, onSaveFormValues, getFormValue }) {
  const [externalLinks, setExternalLinks] = useState(['']);
  const externalLink = useInput('');
  const classes = useStyles();

  useEffect(() => {
    if (getFormValue()?.length > 0) {
      wiredValue(
        data?.questionBankIndex,
        getFormValue,
        data?.multiple ? setExternalLinks : externalLink.setValue
      );
    }
  }, []);

  return (
    <Box marginBottom="20px">
      <PreviewLabel
        required={data?.required}
        description={data?.description}
        question={data?.question}
      />
      {data?.multiple ? (
        externalLinks?.map((link, i) => (
          <Grid container spacing={3} style={{ position: 'relative' }} key={i}>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                label="External Link URL"
                value={
                  // typeof data.questionBankIndex === 'number'
                  //   ? getFormValue()?.[data?.questionBankIndex] || ''
                  //   : getFormValue() || ''
                  link
                }
                style={{ marginTop: 5 }}
                onChange={(e) => {
                  onChangeItem(
                    e,
                    i,
                    setExternalLinks,
                    externalLinks,
                    onSaveFormValues,
                    typeof data?.questionBankIndex === 'number'
                  );
                }}
                className={classes.textField}
                error={link?.length > 0 && validateURl(link)}
                autoComplete="off"
                helperText={link?.length > 0 && validateURl(link)}
              />
            </Grid>

            {i > 0 && (
              <CloseIcon
                fontSize="default"
                className={classes.deleteItemsicon}
                onClick={() => onDeleteItem(externalLinks, setExternalLinks, i)}
              />
            )}
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <TextField
            id="standard-basic"
            label="External Link URL"
            value={externalLink.value}
            style={{ marginTop: 5 }}
            onChange={(e) => {
              externalLink.onChange(e);
              onSaveFormValues(e.target.value || null);
            }}
            className={classes.textField}
            error={
              externalLink.value?.length > 0 && validateURl(externalLink.value)
            }
            autoComplete="off"
            helperText={
              externalLink.value?.length > 0 && validateURl(externalLink.value)
            }
          />
        </Grid>
      )}
      {data?.multiple && (
        <Box
          display="flex"
          alignItems="center"
          style={{ marginBottom: 10, marginTop: 20 }}
        >
          <AddCircleOutlineIcon
            htmlColor="#3d6df1"
            fontSize="small"
            onClick={() => onAddItems(externalLinks, setExternalLinks, '')}
          />{' '}
          <Typography
            variant="caption"
            style={{ marginLeft: 10, color: '#3d6df1', cursor: 'pointer' }}
            onClick={() => onAddItems(externalLinks, setExternalLinks, '')}
          >
            Add another link
          </Typography>
        </Box>
      )}
      {data?.showRequired && <LabelError>{data?.requiredMessage}</LabelError>}
    </Box>
  );
}
