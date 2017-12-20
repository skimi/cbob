import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

const Navigation = ({ changeBase }) => (
  <ul className={styles.navigation}>
    <li>
      <Link
        to="/prices/BTC"
        onClick={() => changeBase('BTC')}
        className={styles.link}
      >
        BTC
      </Link>
    </li>
    <li>
      <Link
        to="/prices/LTC"
        onClick={() => changeBase('LTC')}
        className={styles.link}
      >
        LTC
      </Link>
    </li>
    <li>
      <Link
        to="/prices/ETH"
        onClick={() => changeBase('ETH')}
        className={styles.link}
      >
        ETH
      </Link>
    </li>
  </ul>
);

export default Navigation;
