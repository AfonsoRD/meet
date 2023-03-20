import React from 'react';
// import ReactDOM from 'react-dom/client'; <- This import is only for React version 18
import { render } from 'react-dom'; // <- This is the correct import statement for React version 17
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import * as atatus from 'atatus-spa';
import reportWebVitals from './reportWebVitals';

atatus.config('391105fd8715412c9a68ffb0698913c4').install();
// const root = ReactDOM.createRoot(document.getElementById('root'));
const root = document.getElementById('root'); // <- This is the correct method call for React version 17
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

serviceWorkerRegistration.register();
reportWebVitals();

atatus.notify(new Error('Test Atatus Setup'));
