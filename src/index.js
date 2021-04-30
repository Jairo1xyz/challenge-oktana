import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { FETCH_LEVELS_SUCCESS, FETCH_LEVELS_FAILURE } from './extras/riskLevelsActions';

const initialState = {
  risk: 0,
  loading: true,
  showChart: true,
  error: null,
  data: []
};

function reducer(state = initialState, action) {
  console.log("reducer", state, action);
  switch(action.type) {
    case 'SET':
      return {
        ...state,
        risk: action.risk,
      };
    case 'TOGGLE':
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
