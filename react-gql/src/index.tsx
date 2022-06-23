import React from 'react';
import ReactDOM from 'react-dom/client';
import { RelayEnvironmentProvider } from 'react-relay';
import { HashRouter } from 'react-router-dom';

import AppRoutes from './AppRoutes';
import environment from './config/environment';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </RelayEnvironmentProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
