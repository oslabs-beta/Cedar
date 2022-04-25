import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import styles from './scss/application.scss'; 

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <div className="appContainer">
      <App />
    </div>
);