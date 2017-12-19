import 'babel-polyfill/dist/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga'
import reducer from './modules/recuder';
import fetchPrices from './sagas/fetchPrices';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import Navigation from './containers/Navigation';
import Prices from './containers/Prices';

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(fetchPrices)

ReactDOM.render(
  (
    <Provider store={store}>
      <Router>
        <div>
          <Navigation />
          <Route path="/prices/:base" component={Prices} />
        </div>
      </Router>
    </Provider>
  ),
  document.getElementById('content')
);
