import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AsideArea from './AsideArea';
import HomeFooter from './HomeFooter';
import Info from './Info';
import useOrganization from '../../hooks/useOrganization';
import useGoogleTranslate from '../../hooks/useGoogleTranslate';
import { getFormType } from '../../services/unarmed';

const Home = ({ showReports }) => {
  const { organizationData } = useOrganization();
  const [formsType, setFormsType] = useState([]);
  useGoogleTranslate();

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

  return (
    <HomeLayout>
      <Info
        logo={organizationData?.logo}
        name={organizationData?.name}
        title={organizationData?.title}
        text={organizationData?.text}
        features={organizationData?.features}
        showReports={showReports}
        formsType={formsType}
      />
      <AsideArea features={organizationData?.features} />
      <HomeFooter features={organizationData?.features} />
    </HomeLayout>
  );
};

const HomeLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  position: relative;
`;

export default Home;
