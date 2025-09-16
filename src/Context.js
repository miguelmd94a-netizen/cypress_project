import { navigate } from '@reach/router';
import React, { useState, createContext } from 'react';
import { toast } from 'react-toastify';
import { signOut } from './services/firebase';

export const Context = createContext();

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [organizationId, setOrganizationId] = useState('');
  const [formId, setFormId] = useState('');
  const [requireRefresh, setRequireRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const value = {
    isAuth,
    formId,
    authUser,
    organizationId,
    setOrganizationId,
    setFormId,
    requireRefresh,
    setRequireRefresh,
    loadingScreen: loading,
    setLoadingScreen: setLoading,
    activateAuth: (user) => {
      setIsAuth(true);
      setAuthUser(user);
    },
    setAuthUser,
    removeAuthToLogin: () => {
      signOut();
      setIsAuth(false);
      setAuthUser(null);
      toast.success('Please Re-authenticate to add a MFA');
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('refreshToken');
    },
    removeAuth: () => {
      signOut();
      setIsAuth(false);
      setAuthUser(null);
      toast.success('You have been logout succefully!');
      navigate('/');
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('refreshToken');
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default {
  Provider,
  Consumer: Context.Consumer,
};
