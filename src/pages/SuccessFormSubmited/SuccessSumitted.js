import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { navigate, useLocation } from '@reach/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Context } from '../../Context';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const useStyles = makeStyles(() => ({
  formSection: {
    fontSize: 14,
    color: '#000000DE',
    fontWeight: 'bold',
    marginTop: 60,
  },
}));

const SuccessSumitted = ({ id }) => {
  const classes = useStyles();
  const { authUser } = useContext(Context);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <ContainerDiv>
      <Typography variant="h3" style={{ fontWeight: 'bold' }}>
        Thank you!
      </Typography>

      <Box
        height={42}
        margin="20px 0"
        border="1px solid #0026CA19"
        display="flex"
        bgcolor="#FAFBFF"
        alignItems="center"
        width="240px"
        borderRadius="5px"
        padding="10px"
        justifyContent="space-between"
      >
        <Typography>{id}</Typography>
        <CopyToClipboard
          text={id}
          onCopy={() => toast.success('Tracking Number copied!')}
        >
          <FileCopyOutlinedIcon
            fontSize="small"
            htmlColor="#4B7BFF"
            style={{ cursor: 'pointer' }}
          />
        </CopyToClipboard>
      </Box>

      <Box display="flex" style={{ marginBottom: 20 }}>
        <CheckCircleOutlineIcon
          htmlColor={
            location.state?.type === 'COMPLIMENT' ? '#008858' : '#e52828 '
          }
          fontSize="small"
        />
        <Typography
          variant="body2"
          style={{
            color:
              location.state?.type === 'COMPLIMENT' ? '#008858' : '#e52828 ',
            marginLeft: 10,
          }}
        >
          {location.state?.type === 'COMPLIMENT' ? 'Compliment ' : 'Complaint '}
          form submitted successfully
        </Typography>
      </Box>
      <Typography variant="body2" style={{ width: '100%', maxWidth: 400 }}>
        Your form is submitted. If you entered an email address, your tracking
        information has been emailed to you.
      </Typography>
      {(authUser && (
        <Button
          variant="contained"
          color="secondary"
          style={{
            background: '#364F74',
            letterSpacing: '1.25px',
            marginTop: 10,
          }}
          onClick={() => navigate('/cases')}
        >
          View My cases
        </Button>
      )) || (
        <>
          <Typography variant="body2" className={classes.formSection}>
            Would you like to create an account to track your submission?
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            style={{
              background: '#364F74',
              letterSpacing: '1.25px',
              marginTop: 10,
            }}
            onClick={() =>
              navigate('/signup', { state: { formId: location.state?.formId } })
            }
          >
            CREATE ACCOUNT
          </Button>
        </>
      )}
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  @media screen and (min-width: 320px) {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 500px;
    text-align: center;
  }
  @media screen and (min-width: 768px) {
    padding-top: 120px;
    padding-left: 140px;
    text-align: unset;
    display: block;
  }
`;
export default SuccessSumitted;
