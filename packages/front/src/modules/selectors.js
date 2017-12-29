import first from 'lodash/first';
import get from 'lodash/get';
import { createSelector } from 'reselect'

export const getBase = (state) => state.base;

export const getLastPrice = (state, base, type) => (
  parseFloat(get(state.prices.data.find(price => (
    price.base === base && price.type === type
  )), 'amount', 0))
);

export const getAccountsBalance = createSelector(
  (state) => state.accounts.data,
  (accounts) => (
    accounts.reduce((acc, account) => ({
      ...acc,
      [account.currency]: parseFloat(account.balance.amount),
    }), {})
  )
);
