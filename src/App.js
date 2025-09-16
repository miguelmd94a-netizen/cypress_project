import { navigate } from '@reach/router';
import React, { useContext, useEffect } from 'react';
import AppRoutes from './AppRoutes';
import LoadingScreen from './components/LoadingScreen';
import { Context } from './Context';
import useOrganization from './hooks/useOrganization';
import { onAuthStateChanged } from './services/firebase';

function App() {
  const { activateAuth, isAuth, requireRefresh, loadingScreen, setLoadingScreen } = useContext(Context);
  const { organizationData } = useOrganization();

  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user) {
        if (!user.emailVerified) {
          user.sendEmailVerification({
            url: `${window.location.origin}/mfa`,
          });
          console.log(organizationData);
          if (organizationData?.test) {
            navigate('/cases');
          } else {
            navigate('/mfa');
          }
        }
        // if (user.multiFactor.enrolledFactors.length === 0) {
        //   navigate('/mfa');
        // }
        user.getIdToken().then((token) => {
          activateAuth({ ...user, tokenId: token });
          sessionStorage.setItem('authToken', token);
          sessionStorage.setItem('refreshToken', user.refreshToken);
        });
        setLoadingScreen(false);
      }
      if (organizationData) {
        setLoadingScreen(false);
      }
    });
    // eslint-disable-next-line
  }, [organizationData]);

  return loadingScreen ? (
    <LoadingScreen />
  ) : (
    <AppRoutes
      auth={isAuth}
      features={organizationData?.features}
      hasTestFeatures={organizationData?.test}
      requireRefresh={requireRefresh}
    />
  );
}

export default App;
