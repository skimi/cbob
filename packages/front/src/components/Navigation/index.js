import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ changeBase }) => (
  <ul>
    <li>
      <Link to="/prices/BTC" onClick={() => changeBase('BTC')}>BTC</Link>
    </li>
    <li>
      <Link to="/prices/LTC" onClick={() => changeBase('LTC')}>LTC</Link>
    </li>
    <li>
      <Link to="/prices/ETH" onClick={() => changeBase('ETH')}>ETH</Link>
    </li>
  </ul>
);

export default Navigation;
