import queryString from 'query-string';
import { call, put, takeEvery } from 'redux-saga/effects';
import { TYPES } from '../modules/constants';

export function* saveTokenToLocalStorage({ payload: token }) {
  try {
    localStorage.setItem('token', token);
    yield put({
      type: TYPES.SUCCESS_SAVE_TOKEN,
      payload: token,
    });
  } catch (error) {
    yield put({
      type: TYPES.FAILURE_SAVE_TOKEN,
      payload: error,
      meta: token,
    });
  }
}

export function* saveToken(reddit) {
  yield takeEvery(TYPES.REQUEST_SAVE_TOKEN, saveTokenToLocalStorage);
}

export default saveToken;
