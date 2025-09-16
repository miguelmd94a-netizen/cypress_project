import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import { getMe } from '../services/unarmed';
import useCheckAppVersion from './useCheckAppVersion';

const useMe = () => {
  const { authUser } = useContext(Context);
  const [me, setMe] = useState(null);
  const { onCheckAppVersion } = useCheckAppVersion();

  useEffect(() => {
    const onGetMe = async () => {
      const { data, headers } = await getMe(authUser.tokenId);
      onCheckAppVersion(headers['x-portal-version']);
      setMe(data);
    };

    if (authUser) {
      onGetMe();
    }
  }, [authUser]);

  return me;
};

export default useMe;
