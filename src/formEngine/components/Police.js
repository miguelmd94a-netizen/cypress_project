import {
  Box,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import { onAddItems, onDeleteItem } from './Url';
import PreviewLabel from './PreviewLabel';
import { onChangeItem } from './Witnesses';
import { setterState, wiredValue } from './File';

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
    right: -20,
    top: 160,
    bottom: 0,
    margin: 'auto',
    cursor: 'pointer',
  },
}));

export default function Police({ data, onSaveFormValues, getFormValue }) {
  const classes = useStyles();
  const [polices, setPolices] = useState([
    {
      firstName: null,
      lastName: null,
      badgeNumber: null,
      officerDescription: null,
    },
  ]);

  useEffect(() => {
    wiredValue(data.questionBankIndex, getFormValue, setPolices);
  }, [data]);

  return (
    <Box marginBottom="20px">
      <PreviewLabel
        required={data?.required}
        description={data?.description}
        question={data?.question}
      />
      <Grid container spacing={2} style={{ position: 'relative' }}>
        {polices.map((police, i) => (
          <Fragment key={i}>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="First name"
                value={police.firstName || ''}
                style={{ marginTop: 5 }}
                onChange={(e) => {
                  onChangeItem(e, i, polices, setPolices, 'firstName', (dt) =>
                    setterState(data.questionBankIndex, onSaveFormValues, dt)
                  );
                }}
                className={classes.textField}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="Last name"
                value={police.lastName || ''}
                style={{ marginTop: 5 }}
                onChange={(e) =>
                  onChangeItem(e, i, polices, setPolices, 'lastName', (dt) =>
                    setterState(data.questionBankIndex, onSaveFormValues, dt)
                  )
                }
                className={classes.textField}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="Badge/Serial Number"
                value={police.badgeNumber || ''}
                style={{ marginTop: 5 }}
                onChange={(e) =>
                  onChangeItem(e, i, polices, setPolices, 'badgeNumber', (dt) =>
                    setterState(data.questionBankIndex, onSaveFormValues, dt)
                  )
                }
                className={classes.textField}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="Description"
                value={police.officerDescription || ''}
                style={{ marginTop: 5 }}
                onChange={(e) =>
                  onChangeItem(
                    e,
                    i,
                    polices,
                    setPolices,
                    'officerDescription',
                    (dt) =>
                      setterState(data.questionBankIndex, onSaveFormValues, dt)
                  )
                }
                inputProps={{ maxLength: 1000 }}
                className={classes.textField}
                autoComplete="off"
              />
            </Grid>

            {i > 0 && (
              <CloseIcon
                fontSize="default"
                className={classes.deleteItemsicon}
                onClick={() => onDeleteItem(polices, setPolices, i)}
              />
            )}
          </Fragment>
        ))}
      </Grid>
      <Box
        display="flex"
        alignItems="center"
        style={{ marginBottom: 10, marginTop: 20 }}
      >
        <AddCircleOutlineIcon
          htmlColor="#3d6df1"
          fontSize="small"
          onClick={() => onAddItems(polices, setPolices, '')}
        />{' '}
        <Typography
          variant="caption"
          style={{ marginLeft: 10, color: '#3d6df1', cursor: 'pointer' }}
          onClick={() =>
            onAddItems(polices, setPolices, {
              firstName: null,
              lastName: null,
              badgeNumber: null,
              officerDescription: null,
            })
          }
        >
          Add another Officer
        </Typography>
      </Box>
    </Box>
  );
}
