import {
  Box,
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import React from 'react';
import img from '../../assets/faq.png';
import CollapseItem from '../../components/CollapseItem';
import Layout from '../../components/Layout';
import useGoogleTranslate from '../../hooks/useGoogleTranslate';
import Header from '../../components/Header';
import useOrganization from '../../hooks/useOrganization';
import { onGetFaqs } from '../../services/unarmed';
import HTMLContent from '../../components/HTMLContent';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 30,
  },
  content: {
    background: '#FAFBFF',
    borderRadius: 7,
    padding: 16,
  },
  leftBox: {
    width: 350,
    height: 600,
    background: '#4B7BFF',
  },
  leftBoxMobile: {
    width: '100%',
    height: 100,
    display: 'flex',
    background: '#4B7BFF',
  },
  img: {
    objectFit: 'contain',
    objectPosition: 'bottom',
  },
  rightBox: {
    borderRadius: 5,
    width: '100%',

    height: '100%',
  },
  bulletItem: {
    color: '#4B7BFF',
  },
  colorItem: {
    color: '#00000099',
    fontSize: 14,
    margin: 0,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    whiteSpace: 'pre-wrap',
  },
}));

const Faq = () => {
  const classes = useStyles();
  useGoogleTranslate();

  const tablet = useMediaQuery('(min-width:600px)');
  const desktop = useMediaQuery('(min-width:1024px)');
  const { organizationData } = useOrganization();
  const [faqs, setFaqs] = React.useState([]);
  const [loadingfaqs, setLoadingfaqs] = React.useState(false);

  React.useEffect(() => {
    const onGetQuestions = async (orgId) => {
      setLoadingfaqs(true);
      try {
        const { data } = await onGetFaqs(orgId);
        setFaqs(data);
      } catch (error) {
        console.log(error);
      }
      setLoadingfaqs(false);
    };
    if (organizationData?._id) {
      onGetQuestions(organizationData?._id);
    }
  }, [organizationData]);

  return (
    <Layout>
      <Header />
      <div
        className={classes.container}
        style={
          desktop
            ? { padding: '0 120px' }
            : tablet
            ? { padding: '0 40px' }
            : { padding: '0' }
        }
      >
        <Box
          className={classes.content}
          display="flex"
          flexDirection={!desktop ? 'column' : 'row'}
        >
          <Box className={!desktop ? classes.leftBoxMobile : classes.leftBox}>
            <Typography
              variant={desktop ? 'h4' : tablet ? 'h5' : 'h6'}
              style={{ padding: 32, color: '#fff', flexGrow: 1 }}
            >
              Frequently Asked Questions
            </Typography>
            {tablet && (
              <img
                src={img}
                alt="404"
                className={classes.img}
                style={
                  desktop
                    ? { width: 350, height: 432 }
                    : {
                        width: 150,
                        height: 200,
                        objectPosition: 'center',
                        marginRight: 32,
                      }
                }
              />
            )}
          </Box>
          <Paper
            className={classes.rightBox}
            style={desktop ? { marginLeft: 30 } : {}}
          >
            {loadingfaqs ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                height={195}
              >
                <Typography style={{ marginBottom: 10 }}>
                  Loading FAQs
                </Typography>
                <CircularProgress color="#1F63FF" size="20px" />
              </Box>
            ) : (
              faqs.map((faq, index) => (
                <CollapseItem text={faq.question} key={index}>
                  <Typography variant="body2" component="div">
                    <HTMLContent content={faq.answer} />
                  </Typography>
                </CollapseItem>
              ))
            )}
          </Paper>
        </Box>
      </div>
    </Layout>
  );
};

export default Faq;
