import queryString from 'query-string';
import { call, put, takeLatest } from 'redux-saga/effects';
import { TYPES } from '../modules/constants';

export function* fetchOrdersApi({ payload: params }) {
  try {
    const promise = yield fetch(
      `http://localhost:8000/orders`,
      {
        headers: new Headers({
          'Authorization': localStorage.getItem('token'),
        })
      }
    );
    const data = yield promise.json();
    yield put({
      type: TYPES.SUCCESS_FETCH_ORDERS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: TYPES.FAILURE_FETCH_ORDERS,
      payload: error,
    });
  }
}

export function* fetchOrders(reddit) {
  yield takeLatest(TYPES.REQUEST_FETCH_ORDERS, fetchOrdersApi);
}

export default fetchOrders;
