import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

import { Box, CircularProgress } from '@material-ui/core';

function EnhancedTableHeadItem({ onClick, children }) {
  const [sort, setSort] = useState(true);
  return (
    <TableCell align="left" padding="default" onClick={() => setSort(!sort)}>
      <TableSortLabel direction={sort ? 'desc' : 'asc'} onClick={onClick}>
        {children}
      </TableSortLabel>
    </TableCell>
  );
}

function EnhancedTableHead({ setCivilianCases, rows }) {
  return (
    <TableHead>
      <TableRow>
        {rows.map((column, i) => {
          if (column === 'Created Date') {
            return (
              <EnhancedTableHeadItem onClick={() => setCivilianCases(rows.reverse())}>
                Created Date
              </EnhancedTableHeadItem>
            );
          }
          return <EnhancedTableHeadItem>{column}</EnhancedTableHeadItem>;
        })}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 20,
    boxShadow: '0 3px 6px #00000005',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({
  rows = [],
  onClick,
  setCivilianCases,
  columns,
  rowRender,
  loading,
  count,
  page,
  setPage,
  rowsPerPage,
  handleChangeRowsPerPage,
}) {
  const classes = useStyles();
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {loading ? (
          <Box width="100%" height="200px" display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
              <EnhancedTableHead
                classes={classes}
                rowCount={rows.length}
                rows={columns}
                setCivilianCases={setCivilianCases}
              />

              <TableBody>{rows.map((row, index) => rowRender(row, index))}</TableBody>
            </Table>
          </TableContainer>
        )}

        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          component="div"
          count={count || 0}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
