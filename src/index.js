import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { FETCH_LEVELS_SUCCESS, FETCH_LEVELS_FAILURE } from './extras/riskLevelsActions';
import { SET, TOGGLE, SET_BONDS, SET_LARGE_CAP, SET_MID_CAP, SET_FOREIGN, SET_SMALL_CAP, 
  REBALANCE, CLEAR_VALUES, CLEAR_REBALANCED_VALUES } from './extras/actions';

const initialState = {
  risk: 0,
  loading: true,
  showChart: true,
  error: null,
  data: [],
  bonds: {
    current: '',
    difference: '',
    new: ''
  },
  largeCap: {
    current: '',
    difference: '',
    new: ''
  },
  midCap: {
    current: '',
    difference: '',
    new: ''
  },
  foreign: {
    current: '',
    difference: '',
    new: ''
  },
  smallCap: {
    current: '',
    difference: '',
    new: ''
  },
  recommended: ''
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
        bonds: {
          ...state.bonds,
          current: action.value
        }
      };
    case SET_LARGE_CAP:
      return {
        ...state,
        largeCap: {
          ...state.largeCap,
          current: action.value
        }
      };
    case SET_MID_CAP:
      return {
        ...state,
        midCap: {
          ...state.midCap,
          current: action.value
        }
      };
    case SET_FOREIGN:
      return {
        ...state,
        foreign: {
          ...state.foreign,
          current: action.value
        }
      };
    case SET_SMALL_CAP:
      return {
        ...state,
        smallCap: {
          ...state.smallCap,
          current: action.value
        }
      };
    case REBALANCE:
      return {
        ...state,
        bonds: {
          ...state.bonds,
          difference: action.bonds.difference,
          new: action.bonds.new
        },
        largeCap: {
          ...state.largeCap,
          difference: action.largeCap.difference,
          new: action.largeCap.new
        },
        midCap: {
          ...state.midCap,
          difference: action.midCap.difference,
          new: action.midCap.new
        },
        foreign: {
          ...state.foreign,
          difference: action.foreign.difference,
          new: action.foreign.new
        },
        smallCap: {
          ...state.smallCap,
          difference: action.smallCap.difference,
          new: action.smallCap.new
        },
        recommended: action.recommended
      };
    case CLEAR_VALUES:
      return {
        ...state,
        bonds: {
          current: '',
          difference: '',
          new: ''
        },
        largeCap: {
          current: '',
          difference: '',
          new: ''
        },
        midCap: {
          current: '',
          difference: '',
          new: ''
        },
        foreign: {
          current: '',
          difference: '',
          new: ''
        },
        smallCap: {
          current: '',
          difference: '',
          new: ''
        },
        recommended: ''
      };
    case CLEAR_REBALANCED_VALUES:
      return {
        ...state,
        bonds: {
          ...state.bonds,
          difference: '',
          new: ''
        },
        largeCap: {
          ...state.largeCap,
          difference: '',
          new: ''
        },
        midCap: {
          ...state.midCap,
          difference: '',
          new: ''
        },
        foreign: {
          ...state.foreign,
          difference: '',
          new: ''
        },
        smallCap: {
          ...state.smallCap,
          difference: '',
          new: ''
        },
        recommended: ''
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
