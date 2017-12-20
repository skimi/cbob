import queryString from 'query-string';
import { call, put, takeEvery } from 'redux-saga/effects';
import { TYPES } from '../modules/constants';

export function* saveOrderApi({ payload }) {
  try {
    const promise = yield fetch(
      `http://localhost:8000/orders`,
      {
        method: 'POST',
        body: JSON.stringify(payload)
      }
    );
    const data = yield promise.json();
    yield put({
      type: TYPES.SUCCESS_SAVE_ORDER,
      payload: data,
      meta: payload,
    });
  } catch (error) {
    yield put({
      type: TYPES.FAILURE_SAVE_ORDER,
      payload: error,
      meta: payload,
    });
  }
}

export function* saveOrder(reddit) {
  yield takeEvery(TYPES.REQUEST_SAVE_ORDER, saveOrderApi);
}

export default saveOrder;
