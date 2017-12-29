import moment from 'moment';
import omitBy from 'lodash/omitBy';
import flow from 'lodash/flow';
import isNil from 'lodash/isNil';

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

export const fetchHourlyPrices = flow(
  fetchPrices,
  (fetchPricesAction) => ({
    ...fetchPricesAction,
    type: TYPES.REQUEST_FETCH_HOURLY_PRICES,
    payload: {
      ...fetchPricesAction.payload,
      start: moment().subtract(1, 'y').format('x'),
    }
  })
)

export const fetchOrders = () => ({
  type: TYPES.REQUEST_FETCH_ORDERS,
});

export const fetchAccounts = () => ({
  type: TYPES.REQUEST_FETCH_ACCOUNTS,
});

export const saveOrder = (order) => ({
  type: TYPES.REQUEST_SAVE_ORDER,
  payload: omitBy({
    ...order,
    price: parseFloat(order.price) || null,
    amount: parseFloat(order.amount) || null,
  }, isNil),
});

export const saveToken = (token) => ({
  type: TYPES.REQUEST_SAVE_TOKEN,
  payload: token,
});
