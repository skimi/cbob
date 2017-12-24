import 'babel-polyfill/dist/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga'
import reducer from './modules/recuder';
import fetchPrices from './sagas/fetchPrices';
import fetchHourlyPrices from './sagas/fetchHourlyPrices';
import fetchOrders from './sagas/fetchOrders';
import saveOrder from './sagas/saveOrder';

import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import App from './components/App';

import './base.scss';

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(fetchPrices)
sagaMiddleware.run(fetchHourlyPrices)
sagaMiddleware.run(fetchOrders)
sagaMiddleware.run(saveOrder)

ReactDOM.render(
  (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  ),
  document.getElementById('content')
);
