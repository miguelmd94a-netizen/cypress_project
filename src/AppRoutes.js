import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Router } from '@reach/router';

// import Home from './pages/Home/Home';
// import Login from './pages/Auth/Login/Login';
// import SuccessFormSubmited from './pages/SuccessFormSubmited/SuccessFormSubmited';
// import Cases from './pages/Cases/Cases';
// import Faq from './pages/Faq/Faq';
// import Signup from './pages/Auth/Signup/Signup';
// import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
// import TrackForm from './pages/TrackComplaint/TrackForm';
// import Reports from './pages/Reports/Reports';
import NotFound from './pages/NotFound';
import LoadingScreen from './components/LoadingScreen';
// import UpdateAlert from './components/UpdateAlert';
// import Mfa from './pages/Auth/Mfa/Mfa';
// import Form from './pages/FormType/Form';
// import ResetPasswordById from './pages/ResetPasswordById/ResetPasswordById';

const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Auth/Login/Login'));
const Signup = lazy(() => import('./pages/Auth/Signup/Signup'));
const Cases = lazy(() => import('./pages/Cases/Cases'));
const SuccessFormSubmited = lazy(() => import('./pages/SuccessFormSubmited/SuccessFormSubmited'));
const Faq = lazy(() => import('./pages/Faq/Faq'));
const UpdateAlert = lazy(() => import('./components/UpdateAlert'));
const Mfa = lazy(() => import('./pages/Auth/Mfa/Mfa'));
const Form = lazy(() => import('./pages/FormType/Form'));
const ResetPasswordById = lazy(() => import('./pages/ResetPasswordById/ResetPasswordById'));
const Reports = lazy(() => import('./pages/Reports/Reports'));
const TrackForm = lazy(() => import('./pages/TrackComplaint/TrackForm'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword/ResetPassword'));

const AppRoutes = ({ auth, features, requireRefresh, hasTestFeatures }) => {
  const [isReportAvailable, setIsReportAvailable] = useState([]);

  useEffect(() => {
    if (features) {
      const featuresKeys = Object.keys(features?.data);
      const reportsAvailable = featuresKeys.filter((key) => features?.data?.[key]);
      setIsReportAvailable(reportsAvailable);
    }
  }, [features]);

  if (auth) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        {requireRefresh && <UpdateAlert />}
        <Router>
          <NotFound default />
          <Home path="/" showReports={isReportAvailable.length > 0} />

          <SuccessFormSubmited path="/successForm/:id" />
          {features?.portal?.trackYourCase && <TrackForm path="/tracking/:id" />}
          {!hasTestFeatures && <Mfa path="/mfa" />}
          <Cases path="/cases" />
          {features?.portal?.FAQ && <Faq path="/faq" />}
          <Form path="/form/:id" />
          {isReportAvailable.length > 0 && <Reports path="/reports" />}
        </Router>
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<LoadingScreen />}>
      {requireRefresh && <UpdateAlert />}
      <Router>
        <NotFound default />
        <Home path="/" showReports={isReportAvailable.length > 0} />
        <ResetPasswordById path="/password/reset" />
        {features?.portal?.createAccount && <Signup path="/signup" />}
        {features?.portal?.login && <Login path="/login" />}
        {features?.portal?.login && <ResetPassword path="/reset-password" />}
        {features?.portal?.FAQ && <Faq path="/faq" />}

        {isReportAvailable.length > 0 && <Reports path="/reports" />}

        <SuccessFormSubmited path="/successForm/:id" />
        {features?.portal?.trackYourCase && <TrackForm path="/tracking/:id" />}
        <Form path="/form/:id" />
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
