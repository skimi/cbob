import queryString from 'query-string';
import { call, put, takeLatest } from 'redux-saga/effects';
import { TYPES } from '../modules/constants';

export function* fetchPricesApi({ payload: params }) {
  try {
    const promise = yield fetch(
      `http://localhost:8000/prices?${queryString.stringify(params)}`,
      {
        headers: new Headers({
          'Authorization': localStorage.getItem('token'),
        })
      }
    );
    const prices = yield promise.json();
    yield put({
      type: TYPES.SUCCESS_FETCH_PRICES,
      payload: prices,
      meta: params,
    });
  } catch (error) {
    yield put({
      type: TYPES.FAILURE_FETCH_PRICES,
      payload: error,
      meta: params,
    });
  }
}

export function* fetchPrices(reddit) {
  yield takeLatest(TYPES.REQUEST_FETCH_PRICES, fetchPricesApi);
}

export default fetchPrices;
