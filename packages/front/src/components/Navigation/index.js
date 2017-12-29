import React from 'react';
import PropTypes from 'prop-types';
import round from 'lodash/round';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

const Navigation = ({ balances, changeBase }) => (
  <ul className={styles.navigation}>
    <li className={styles.fiat}>
      EUR ({round(balances.EUR, 4)})
    </li>
    <li>
      <Link
        to="/prices/BTC"
        onClick={() => changeBase('BTC')}
        className={styles.link}
      >
        BTC ({round(balances.BTC, 4)})
      </Link>
    </li>
    <li>
      <Link
        to="/prices/LTC"
        onClick={() => changeBase('LTC')}
        className={styles.link}
      >
        LTC ({round(balances.LTC, 4)})
      </Link>
    </li>
    <li>
      <Link
        to="/prices/ETH"
        onClick={() => changeBase('ETH')}
        className={styles.link}
      >
        ETH ({round(balances.ETH, 4)})
      </Link>
    </li>
  </ul>
);

Navigation.propTypes = {
  changeBase: PropTypes.func.isRequired,
  balances: PropTypes.shape({
    EUR: PropTypes.number.isRequired,
  })
};

export default Navigation;
