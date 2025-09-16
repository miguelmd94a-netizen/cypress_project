import { useContext } from 'react';
import { Context } from '../Context';

const useCheckAppVersion = () => {
  const { setRequireRefresh } = useContext(Context);

  const onCheckAppVersion = (appVr) => {
    const appVersion = localStorage.getItem('app-portal-version');
    if (appVersion) {
      if (appVersion !== appVr) {
        setRequireRefresh(true);
        localStorage.setItem('app-portal-version', appVr);
      }
    } else {
      localStorage.setItem('app-portal-version', appVr);
    }
  };

  return {
    onCheckAppVersion,
  };
};

export default useCheckAppVersion;
