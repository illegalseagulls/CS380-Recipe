import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SampleQueries from './SampleQueries';
import reportWebVitals from './reportWebVitals';
//import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

ReactDOM.render(
  <React.StrictMode>
    <SampleQueries />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
