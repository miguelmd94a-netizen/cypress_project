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
import InputPhone from '../../components/InputPhone';
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
    top: 0,
    bottom: 0,
    margin: 'auto',
    cursor: 'pointer',
  },
}));

export const onChangeItem = (e, index, items, setItems, prop, setter) => {
  const itemsCopy = Array.from(items);
  itemsCopy[index][prop] =
    typeof e === 'object' ? e.target.value || null : e || null;
  if (typeof setter === 'function') {
    setter(itemsCopy);
  }
  setItems(itemsCopy);
};

export default function Witnesses({ data, onSaveFormValues, getFormValue }) {
  const classes = useStyles();
  const [witnesess, setWitnesses] = useState([
    {
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      relationship: null,
    },
  ]);

  useEffect(() => {
    wiredValue(data.questionBankIndex, getFormValue, setWitnesses);
  }, [data]);

  return (
    <Box marginBottom="20px">
      <PreviewLabel
        required={data?.required}
        description={data?.description}
        question={data?.question}
      />
      <Grid container spacing={2} style={{ position: 'relative' }}>
        {witnesess.map((witness, i) => (
          <Fragment key={i}>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="First name"
                value={witness.firstName || ''}
                style={{ marginTop: 5 }}
                onChange={(e) =>
                  onChangeItem(
                    e,
                    i,
                    witnesess,
                    setWitnesses,
                    'firstName',
                    (dt) =>
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
                label="Last name"
                value={witness.lastName || ''}
                style={{ marginTop: 5 }}
                onChange={(e) =>
                  onChangeItem(
                    e,
                    i,
                    witnesess,
                    setWitnesses,
                    'lastName',
                    (dt) =>
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
                label="Email"
                value={witness.email || ''}
                style={{ marginTop: 5 }}
                onChange={(e) =>
                  onChangeItem(e, i, witnesess, setWitnesses, 'email', (dt) =>
                    setterState(data.questionBankIndex, onSaveFormValues, dt)
                  )
                }
                className={classes.textField}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <Box>
                <InputPhone
                  label="Home/Cell Telephone"
                  value={witness.phone || ''}
                  onChange={(phone) =>
                    onChangeItem(
                      phone,
                      i,
                      witnesess,
                      setWitnesses,
                      'phone',
                      (dt) =>
                        setterState(
                          data.questionBankIndex,
                          onSaveFormValues,
                          dt || null
                        )
                    )
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={6}>
                <TextField
                  id="standard-basic"
                  label="Relationship"
                  value={witness.relationship || ''}
                  style={{ marginTop: 5, width: '50%' }}
                  onChange={(e) =>
                    onChangeItem(
                      e,
                      i,
                      witnesess,
                      setWitnesses,
                      'relationship',
                      (dt) =>
                        setterState(
                          data.questionBankIndex,
                          onSaveFormValues,
                          dt
                        )
                    )
                  }
                  className={classes.textField}
                  autoComplete="off"
                />
              </Grid>
            </Grid>

            {i > 0 && (
              <CloseIcon
                fontSize="default"
                className={classes.deleteItemsicon}
                onClick={() => onDeleteItem(witnesess, setWitnesses, i)}
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
          onClick={() => onAddItems(witnesess, setWitnesses, '')}
        />{' '}
        <Typography
          variant="caption"
          style={{ marginLeft: 10, color: '#3d6df1', cursor: 'pointer' }}
          onClick={() =>
            onAddItems(witnesess, setWitnesses, {
              firstName: null,
              lastName: null,
              email: null,
              phone: null,
              relationship: null,
            })
          }
        >
          Add another Witness
        </Typography>
      </Box>
    </Box>
  );
}
