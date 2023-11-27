import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

//import createStore and saga
import { createStore, applyMiddleware /*, compose */ } from "redux";

// import Provider
import { Provider } from "react-redux";

// import reducer
import rootReducer from "./reducers";

import createSagaMiddleware from "redux-saga";

import rootSaga from "./saga/sagaindex.js";

const appSagaMiddleware = createSagaMiddleware();

let store = createStore(rootReducer, applyMiddleware(appSagaMiddleware));
// keep running the saga middleware
appSagaMiddleware.run(rootSaga);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store= {store}>
      <App />
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
