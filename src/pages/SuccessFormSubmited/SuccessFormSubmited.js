import React, { useEffect, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { navigate } from '@reach/router';
import Layout from '../../components/Layout';
import Nav from '../../components/Nav';
import useGoogleTranslate from '../../hooks/useGoogleTranslate';
import useOrganization from '../../hooks/useOrganization';
import { getFormType } from '../../services/unarmed';
import SuccessSumitted from './SuccessSumitted';

const SuccessFormSubmited = ({ id }) => {
  useGoogleTranslate();
  const [formsType, setFormsType] = useState([]);
  const { organizationData } = useOrganization();

  useEffect(() => {
    if (organizationData) {
      onGetForms(organizationData?._id);
    }
  }, [organizationData]);

  const onGetForms = async (idOrg) => {
    try {
      const response = await getFormType(idOrg);
      setFormsType(response.data);
    } catch (err) {
      console.log('ERR get forms ', err);
    }
  };

  const complimentForm = formsType?.find((res) => res.type === 'COMPLIMENT' && res.published);
  const complaintForm = formsType?.find((res) => res.type === 'COMPLAINT' && res.published);
  return (
    <Layout>
      <Nav>
        <Box display="flex" alignItems="center">
          {organizationData?.features?.portal?.compliment && complimentForm ? (
            <Button
              variant="contained"
              style={{
                background: '#008858',
                color: '#fff',
                marginRight: 20,
              }}
              onClick={() => navigate(`/form/${complimentForm._id}`)}
            >
              MAKE A COMPLIMENT
            </Button>
          ) : null}
          {organizationData?.features?.portal?.complaint && complaintForm ? (
            <Button
              variant="contained"
              color="secondary"
              style={{
                background: '#e52828',
              }}
              onClick={() => navigate(`/form/${complaintForm._id}`)}
            >
              MAKE A COMPLAINT
            </Button>
          ) : null}
        </Box>
      </Nav>
      <SuccessSumitted id={id} />
    </Layout>
  );
};

export default SuccessFormSubmited;
