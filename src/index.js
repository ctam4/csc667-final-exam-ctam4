import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';

ReactDOM.hydrate(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'));
