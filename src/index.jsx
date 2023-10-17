import React from 'react';
import ReactDOM from 'react-dom/client';
import { DataProvider } from './contexts/data.context';
import App from './App';

import './index.scss';
import { WindowProvider } from './contexts/window.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WindowProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </WindowProvider>
  </React.StrictMode>
);