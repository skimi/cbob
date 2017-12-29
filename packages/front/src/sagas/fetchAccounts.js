import queryString from 'query-string';
import config from '../config.json';
import { call, put, takeLatest } from 'redux-saga/effects';
import { TYPES } from '../modules/constants';

export function* fetchAccountsApi({ payload: params }) {
  try {
    const promise = yield fetch(
      `${config.api}/accounts`,
      {
        headers: new Headers({
          'Authorization': localStorage.getItem('token'),
        })
      }
    );
    const prices = yield promise.json();
    yield put({
      type: TYPES.SUCCESS_FETCH_ACCOUNTS,
      payload: prices,
      meta: params,
    });
  } catch (error) {
    yield put({
      type: TYPES.FAILURE_FETCH_ACCOUNTS,
      payload: error,
      meta: params,
    });
  }
}

export function* fetchAccounts(reddit) {
  yield takeLatest(TYPES.REQUEST_FETCH_ACCOUNTS, fetchAccountsApi);
}

export default fetchAccounts;
