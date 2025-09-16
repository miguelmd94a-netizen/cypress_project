import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { navigate } from '@reach/router';
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import Nav from '../../components/Nav';
import { Context } from '../../Context';
import useOrganization from '../../hooks/useOrganization';
import {
  getCivilianCases,
  getFormType,
  updateMe,
} from '../../services/unarmed';
import CasesList from './CasesList';
import useMe from '../../hooks/useMe';
import Layout from '../../components/Layout';
import DashboardCard from '../../components/DashboardCard';
import iconGreen from '../../assets/icons/contactIcon1.svg';
import iconRed from '../../assets/icons/contactIconRed.svg';
import ModalPopUp from '../../components/Modal';
import ChangePassord from './ChangePassword';
import NotificationToggle from './NotificationToggle';

const useStyles = makeStyles(() => ({
  button: {
    fontSize: 14,
    textAlign: 'center',
    padding: '10px !important',
    fontWeight: '600',
    borderColor: '#fff',
    color: '#fff',
    '& span': {
      letterSpacing: '1.25px',
    },
  },
  main: {
    width: '100%',
  },
  content: {
    marginTop: 35,
    padding: '0 120px',
    width: '100%',
  },
}));

const countCases = (cases) => {
  if (cases?.length > 0) {
    const forms = {};
    for (const caseItem of cases) {
      if (forms[caseItem.type.toLowerCase()]) {
        forms[caseItem.type.toLowerCase()]++;
      } else {
        forms[caseItem.type.toLowerCase()] = 1;
      }
    }
    return forms;
  }
};

const Cases = () => {
  const classes = useStyles();
  const desktop = useMediaQuery('(min-width:1300px)');
  const tablet = useMediaQuery('(min-width:768px)');
  const mobile = useMediaQuery('(min-width:320px)');
  const [open, setOpen] = useState(false);
  const [formsType, setFormsType] = useState([]);
  const { removeAuth, authUser } = useContext(Context);
  const { organizationData } = useOrganization();
  const [loading, setLoading] = useState(false);
  const [civilianCases, setCivilianCases] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [loadingNotification, setLoadingNotification] = useState(false);
  const me = useMe();
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en', layout: window.google.translate.TranslateElement },
      'google_translate_element'
    );
  };

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(1);
  };

  useEffect(() => {
    const addScript = document.createElement('script');
    addScript.setAttribute(
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  useEffect(() => {
    const onGetCivilianCases = async () => {
      try {
        setLoading(true);
        if (me?.role === 'admin') {
          const { data, headers } = await getCivilianCases(
            me?._id,
            authUser.tokenId,
            true,
            page,
            rowsPerPage
          );
          setCivilianCases({ data, headers });
        } else {
          const { data, headers } = await getCivilianCases(
            organizationData?._id,
            authUser.tokenId,
            false,
            page,
            rowsPerPage
          );
          setCivilianCases({ data, headers });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    };

    if (organizationData && me) {
      onGetForms(organizationData?._id);
      onGetCivilianCases();
      setShowNotification(me?.settings?.disableAllNotifications);
    }
    // eslint-disable-next-line
  }, [organizationData, me, page, rowsPerPage]);

  const onGetForms = async (idOrg) => {
    try {
      const response = await getFormType(idOrg);
      setFormsType(response.data);
    } catch (err) {
      console.log('ERR get forms ', err);
    }
  };
  const onChangeNotifications = async () => {
    const data = {
      settings: {
        disableAllNotifications: !showNotification,
      },
    };
    setLoadingNotification(true);
    try {
      await updateMe(data);
      setShowNotification(!showNotification);
      toast.success('Notifications settings updated');
    } catch (err) {
      toast.error('Something went wrong updating your settings');
    } finally {
      setLoadingNotification(false);
    }
  };

  const handleLogout = () => {
    removeAuth();
    navigate('/');
  };

  const formatedRows = () => {
    const cases = civilianCases?.data?.map((ccases) => ({
      type: ccases.type,
      code: ccases.code,
      createdAt: moment(ccases.createdAt).format('MMMM DD, YYYY'),
      status: ccases.status,
      assigned: ccases.assigned,
      availableStatuses: ccases.availableStatuses,
    }));

    return cases;
  };

  const renderName = (firstName, lastName) => {
    if (firstName || lastName) {
      return `Hi ${firstName || ''} ${lastName || ''},`;
    }

    return 'Hi';
  };

  const complimentForm = formsType?.find(
    (res) => res.type === 'COMPLIMENT' && res.published
  );
  const complaintForm = formsType?.find(
    (res) => res.type === 'COMPLAINT' && res.published
  );

  return (
    <>
      <ModalPopUp open={open} setOpen={setOpen}>
        <ChangePassord setOpen={setOpen} />
      </ModalPopUp>
      <Layout>
        <Nav>
          <Box display="flex">
            <Button
              variant="outlined"
              className={classes.button}
              onClick={() => setOpen(true)}
              style={{ marginRight: '10px' }}
            >
              Change password
            </Button>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Nav>
        {civilianCases?.data?.length > 0 ? (
          <CasesList
            complimentForm={complimentForm}
            complaintForm={complaintForm}
            cases={formatedRows()}
            totalComplaints={civilianCases?.headers?.['x-total-complaints']}
            totalCompliments={civilianCases?.headers?.['x-total-compliments']}
            countCases={countCases(civilianCases?.data)}
            totalCases={civilianCases?.headers?.['x-pagination-totalitems']}
            setCivilianCases={setCivilianCases}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            length={1}
            loadingNotification={loadingNotification}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            loading={loading}
            showNotification={showNotification}
            onChangeNotifications={onChangeNotifications}
          />
        ) : (
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
              <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
              >
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
                  {/* <Box display="flex" alignItems="center" marginTop="20px">
                    <Typography
                      variant="body2"
                      style={{ color: '#000', marginRight: 15 }}
                    >
                      Disable all emails notifications
                    </Typography>
                    <Switch
                      checked={showNotification}
                      onChange={onChangeNotifications}
                      color="primary"
                      name="checkedB"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Box> */}
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
                    value={0}
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
                    value={0}
                    cardText="Complaint Cases"
                    style={
                      mobile && !tablet
                        ? { width: '100%', marginBottom: 10 }
                        : { marginLeft: 10 }
                    }
                  />
                </Box>
              </Box>
              {loading ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  height="500px"
                >
                  <CircularProgress color="#364F74" size="50px" />
                </Box>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="100%%"
                  height="500px"
                >
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
                    There are no cases created
                  </Typography>
                </Box>
              )}
            </div>
          </main>
        )}
      </Layout>
    </>
  );
};

export default Cases;
