import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing normalize.css before index.css to avoid overwriting
import 'normalize.css';

import './index.css';
import App from './App';

import { AppProvider } from './context/appContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);