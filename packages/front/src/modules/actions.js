import moment from 'moment';

import { TYPES } from './constants'

export const changeBase = (base) => ({
  type: TYPES.CHANGE_BASE,
  payload: base,
});

export const fetchPrices = ({
  base,
  type,
  start = moment().subtract(7, 'd').format('x'),
  currency = 'EUR'
}) => ({
  type: TYPES.REQUEST_FETCH_PRICES,
  payload: {
    base,
    currency,
    type,
    start,
  }
});
