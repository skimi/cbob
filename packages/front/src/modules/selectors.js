import first from 'lodash/first';
import get from 'lodash/get';

export const getBase = (state) => state.base;

export const getLastPrice = (state, base, type) => (
  parseFloat(get(state.prices.data.find(price => (
    price.base === base && price.type === type
  )), 'amount', 0))
);
