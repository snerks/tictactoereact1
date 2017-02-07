import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore /*, applyMiddleware */ } from 'redux';
import { Provider } from 'react-redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
const composeWithDevTools: Function = require('redux-devtools-extension').composeWithDevTools;

import './index.css';
import App from './App';
import rootReducer from './reducers/rootReducer';

const store = createStore(
  rootReducer,
  composeWithDevTools()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
