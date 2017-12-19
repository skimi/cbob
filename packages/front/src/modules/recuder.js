import { createReducer } from 'redux-create-reducer';
import { TYPES } from './constants';

const initialState = {
  base: 'BTC',
  currency: 'EUR',
  prices: [],
  isFetching: false,
};

export default createReducer(initialState, {
  [TYPES.CHANGE_BASE](state, { payload: base }) {
    return {
      ...state,
      base,
    };
  },

  [TYPES.REQUEST_FETCH_PRICES](state) {
    return {
      ...state,
      isFetching: true,
    };
  },

  [TYPES.SUCCESS_FETCH_PRICES](state, { payload: prices }) {
    return {
      ...state,
      prices,
      isFetching: false,
    };
  }
});
