import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { FETCH_LEVELS_SUCCESS, FETCH_LEVELS_FAILURE } from './extras/riskLevelsActions';
import { SET, TOGGLE, SET_BONDS, SET_LARGE_CAP, SET_MID_CAP, SET_FOREIGN, SET_SMALL_CAP, REBALANCE, CLEAR_VALUES } from './extras/actions';

const initialState = {
  risk: 0,
  loading: true,
  showChart: true,
  error: null,
  data: [],
  bonds: '',
  largeCap: '',
  midCap: '',
  foreign: '',
  smallCap: '',
  recommended: '',
};

function reducer(state = initialState, action) {
  console.log("reducer", state, action);
  switch(action.type) {
    case SET:
      return {
        ...state,
        risk: action.risk
      };
    case TOGGLE:
      return {
        ...state,
        showChart: !state.showChart
      };
    case FETCH_LEVELS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.result
      };
    case FETCH_LEVELS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.result
      };
    case SET_BONDS:
      return {
        ...state,
        bonds: action.value
      };
    case SET_LARGE_CAP:
      return {
        ...state,
        largeCap: action.value
      };
    case SET_MID_CAP:
      return {
        ...state,
        midCap: action.value
      };
    case SET_FOREIGN:
      return {
        ...state,
        foreign: action.value
      };
    case SET_SMALL_CAP:
      return {
        ...state,
        smallCap: action.value
      };
    case CLEAR_VALUES:
      return {
        ...state,
        bonds: '',
        largeCap: '',
        midCap: '',
        foreign: '',
        smallCap: '',
      };
      
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
