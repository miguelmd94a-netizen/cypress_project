import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import { getFormInfo } from '../services/unarmed';
import useCheckAppVersion from './useCheckAppVersion';
import useOrganization from './useOrganization';

const useTrackForm = (trackingNumber) => {
  const [form, setForm] = useState(null);
  const { authUser } = useContext(Context);
  const { onCheckAppVersion } = useCheckAppVersion();
  const [loading, setLoading] = useState(true);
  const { organizationData } = useOrganization();
  // const me = useMe();
  // console.log(me);

  useEffect(() => {
    const onTrackForm = async () => {
      try {
        let res = null;

        if (authUser) {
          res = await getFormInfo(
            trackingNumber,
            organizationData?._id,
            authUser.tokenId
          );
        } else {
          res = await getFormInfo(trackingNumber, organizationData?._id);
        }
        setForm(res.data);
        setLoading(false);
        onCheckAppVersion(res.headers['x-portal-version']);
      } catch (error) {
        console.log(error);
        setForm(null);
        setLoading(false);
      }
    };

    if (trackingNumber && organizationData?._id) {
      onTrackForm();
    }
  }, [trackingNumber, authUser, organizationData?._id]);

  return {
    loading,
    form,
  };
};

export default useTrackForm;
