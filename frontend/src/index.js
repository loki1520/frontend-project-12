import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// or if we not use CSS, we can includes styles in HTML
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
