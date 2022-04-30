import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from './App';
//import { store } from './store' 

import styles from './scss/application.scss'; 

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    // <div className="appContainer">
    //   <App />
    // </div>
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )