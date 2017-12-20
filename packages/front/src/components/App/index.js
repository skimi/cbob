import React from 'react';

import { Route } from 'react-router-dom';
import Navigation from '../../containers/Navigation';
import Prices from '../../containers/Prices';
import Orders from '../../containers/Orders';
import OrderForm from '../../containers/OrderForm';

import styles from './styles.scss';

const App = () => (
  <div className={styles.app}>
    <Navigation />
    <div className={styles.content}>
      <div className={styles.orders}>
        <Orders />
        <OrderForm />
      </div>
      <div className={styles.prices}>
        <Route path="/prices/:base" component={Prices} />
      </div>
    </div>
  </div>
);

export default App;
