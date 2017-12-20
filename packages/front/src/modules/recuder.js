import { createReducer } from 'redux-create-reducer';
import { TYPES } from './constants';

const initialState = {
  base: 'BTC',
  currency: 'EUR',
  prices: {
    data: [],
    isFetching: false,
  },
  orders: {
    data: [],
    isFetching: false,
    isSaving: false,
  },
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
      prices: {
        ...state.prices,
        isFetching: true,
      }
    };
  },

  [TYPES.SUCCESS_FETCH_PRICES](state, { payload: prices }) {
    return {
      ...state,
      prices: {
        data: prices,
        isFetching: false,
      },
    };
  },

  [TYPES.REQUEST_FETCH_ORDERS](state) {
    return {
      ...state,
      orders: {
        ...state.orders,
        isFetching: true,
      }
    };
  },

  [TYPES.SUCCESS_FETCH_ORDERS](state, { payload: orders }) {
    return {
      ...state,
      orders: {
        data: orders,
        isFetching: false,
      }
    };
  },

  [TYPES.REQUEST_SAVE_ORDER](state) {
    return {
      ...state,
      orders: {
        ...state.orders,
        isSaving: true,
      }
    };
  },

  [TYPES.SUCCESS_SAVE_ORDER](state, { payload: order }) {
    return {
      ...state,
      orders: {
        ...state.orders,
        data: [
          order,
          ...state.orders.data,
        ],
        isSaving: false,
      }
    };
  },
});
