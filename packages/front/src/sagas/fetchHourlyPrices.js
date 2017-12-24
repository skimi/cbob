import queryString from 'query-string';
import { call, put, takeLatest } from 'redux-saga/effects';
import { TYPES } from '../modules/constants';

export function* fetchHourlyPricesApi({ payload: params }) {
  try {
    const promise = yield fetch(
      `http://localhost:8000/prices/hour?${queryString.stringify(params)}`
    );
    const prices = yield promise.json();
    yield put({
      type: TYPES.SUCCESS_FETCH_HOURLY_PRICES,
      payload: prices,
      meta: params,
    });
  } catch (error) {
    yield put({
      type: TYPES.FAILURE_FETCH_HOURLY_PRICES,
      payload: error,
      meta: params,
    });
  }
}

export function* fetchHourlyPrices(reddit) {
  yield takeLatest(TYPES.REQUEST_FETCH_HOURLY_PRICES, fetchHourlyPricesApi);
}

export default fetchHourlyPrices;