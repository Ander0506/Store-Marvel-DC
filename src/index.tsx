import React from 'react';
import ReactDOM from 'react-dom';
import 'rsuite/dist/rsuite.min.css';
import './index.css';
import Provider from './components/store/provider-store';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
