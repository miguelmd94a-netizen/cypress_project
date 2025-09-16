// Setting up Sentry
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import Context from './Context';
import GlobalStyles from './styles/GlobalStyles';
import 'react-toastify/dist/ReactToastify.css';

Sentry.init({
  dsn: 'https://d465a363a6364f1b9bb7d75c6def7722@o4504260247683072.ingest.sentry.io/4504406991896576',
  integrations: [new BrowserTracing()],
  environment: process.env.REACT_APP_ENV,
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider>
      <GlobalStyles />

      <App />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
