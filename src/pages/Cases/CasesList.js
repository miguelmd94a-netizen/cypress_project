import {
  Box,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import React from 'react';
import { navigate } from '@reach/router';
import DashboardCard from '../../components/DashboardCard';
import iconGreen from '../../assets/icons/contactIcon1.svg';
import iconRed from '../../assets/icons/contactIconRed.svg';
import EnhancedTable from '../../components/Table';
import useMe from '../../hooks/useMe';
import {
  formTypeColor,
  getFormTypeColor,
} from '../TrackComplaint/TrackFormInfo';
import NotificationToggle from './NotificationToggle';
import { transformStatus } from '../../utils';

const columns = [
  'Created Date',
  'Tracking Number',
  'Status',
  'Type',
  'Contact Name',
  'Contact Email',
];

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
  },
  content: {
    marginTop: 35,

    width: '100%',
  },
}));

const renderName = (firstName, lastName) => {
  if (firstName || lastName) {
    return `Hi ${firstName || ''} ${lastName || ''},`;
  }

  return '';
};

const getStatusTitle = (row) => {
  const currentStatus = row?.availableStatuses?.filter(
    (status) => status.status === row?.status
  );
  return transformStatus(currentStatus[0]?.status);
};

const CasesList = ({
  cases,
  countCases,
  totalCases,
  headers,
  setCivilianCases,
  page,
  rowsPerPage,
  handleChangeRowsPerPage,
  setPage,
  loading,
  length,
  totalComplaints,
  totalCompliments,
  complimentForm,
  complaintForm,
  showNotification,
  onChangeNotifications,
  loadingNotification,
}) => {
  const classes = useStyles();
  const me = useMe();

  const desktop = useMediaQuery('(min-width:1300px)');
  const tablet = useMediaQuery('(min-width:768px)');
  const mobile = useMediaQuery('(min-width:320px)');

  const renderRow = (row, index) => (
    <TableRow
      hover
      onClick={() => navigate(`/tracking/${row.code}`)}
      tabIndex={-1}
      style={{ cursor: 'pointer' }}
      key={row.code}
    >
      <TableCell component="th" scope="row" align="left">
        {row.createdAt}
      </TableCell>
      <TableCell align="left">{row.code}</TableCell>
      <TableCell align="left" style={{ textTransform: 'capitalize' }}>
        {getStatusTitle(row)}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="left"
        style={{
          color: getFormTypeColor(row.type?.toLowerCase()),
          textTransform: 'capitalize',
          fontWeight: '500',
        }}
      >
        {row.type?.toLowerCase()}
      </TableCell>
      <TableCell align="left">
        {row.assigned[0]?.firstName
          ? `${row.assigned[0]?.firstName} ${row.assigned[0]?.lastName}`
          : ''}
      </TableCell>
      <TableCell align="left"> {row.assigned[0]?.email}</TableCell>
    </TableRow>
  );

  return (
    <main className={classes.main}>
      <div
        className={classes.content}
        style={
          desktop
            ? { padding: '0 120px' }
            : tablet
            ? { padding: '0 40px' }
            : { padding: '0 10px' }
        }
      >
        <Box display="flex" justifyContent="space-between" flexWrap="wrap">
          <Box maxWidth="550px">
            <Typography
              variant="h4"
              style={
                desktop
                  ? { fontSize: 29 }
                  : tablet
                  ? { fontSize: 25 }
                  : { fontSize: 22 }
              }
            >
              {renderName(me?.firstName, me?.lastName)} Welcome back!
            </Typography>
            <Typography variant="body2" style={{ color: '#00000099' }}>
              This is your dashboard, where you can find all your cases.
            </Typography>
            <NotificationToggle
              showNotification={showNotification}
              onChangeNotifications={onChangeNotifications}
              loading={loadingNotification}
            />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            flexWrap="wrap"
            width={mobile && !tablet ? '100%' : 'fit-content'}
            margin={!desktop ? '20px 0' : '0'}
          >
            <DashboardCard
              disabledBtn={!complimentForm}
              buttonText="Make a compliment"
              color="#00A5751A"
              icon={iconGreen}
              onClick={() => navigate(`/form/${complimentForm?._id}`)}
              cardText="Compliment Cases"
              value={totalCompliments || 0}
              style={
                mobile && !tablet
                  ? { width: '100%', marginBottom: 10 }
                  : { marginLeft: 0 }
              }
            />
            <DashboardCard
              disabledBtn={!complaintForm}
              buttonText="Make a complaint"
              onClick={() => navigate(`/form/${complaintForm?._id}`)}
              color="#FF42421A"
              icon={iconRed}
              style={
                mobile && !tablet
                  ? { width: '100%', marginBottom: 10 }
                  : { marginLeft: 10 }
              }
              value={totalComplaints || 0}
              cardText="Complaint Cases"
            />
          </Box>
        </Box>
        <Typography
          className={classes.title}
          variant="subtitle2"
          id="tableTitle"
          component="div"
        >
          All Cases ({totalCases})
        </Typography>

        {length > 0 ? (
          <EnhancedTable
            rows={cases}
            setCivilianCases={setCivilianCases}
            rowRender={renderRow}
            columns={columns}
            page={page}
            count={totalCases}
            setPage={setPage}
            loading={loading}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="500px"
          >
            <h1>There are no cases created</h1>
          </Box>
        )}
      </div>
    </main>
  );
};

export default CasesList;
