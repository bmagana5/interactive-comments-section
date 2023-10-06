import React from 'react';
import ReactDOM from 'react-dom/client';
import { DataProvider } from './contexts/data.context';
import App from './App';

import './index.scss';
import { WindowDimensionsProvider } from './contexts/window-dimensions.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WindowDimensionsProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </WindowDimensionsProvider>
  </React.StrictMode>
);