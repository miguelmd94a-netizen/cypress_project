import { useState, useEffect } from 'react';
import { getOrganizationsByState } from '../services/unarmed';
import useCheckAppVersion from './useCheckAppVersion';

const useOrganization = () => {
  const [organizationData, setOrganizationData] = useState(null);
  const { onCheckAppVersion } = useCheckAppVersion();
  useEffect(() => {
    const getOrg = () => {
      const org = window.location.href.split('.')[0].split('//')[1];

      if (org.includes('localhost')) {
        return 'portal-dev';
      }

      return org;
    };

    getOrganizationsByState(getOrg())
      .then((res) => {
        onCheckAppVersion(res.headers['x-portal-version']);
        setOrganizationData(res.data);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return {
    organizationData,
  };
};

export default useOrganization;
