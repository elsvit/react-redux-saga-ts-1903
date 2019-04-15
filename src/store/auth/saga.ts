import { put, takeEvery } from 'redux-saga/effects';

import api from 'services/api';
import { GET_TOKEN, getTokenFail, getTokenSuccess, LOGOUT } from '.';
import { setError, setLoaded, setLoading } from '../common';

export function* sagaGetToken() {
  try {
    put(setLoading({ actionType: GET_TOKEN }));
    const res = yield api().auth.get();
    const token = res.data.token;
    if (token) {
      yield put(getTokenSuccess());
      put(setLoaded({ actionType: GET_TOKEN}));
      api().setToken(token);
    } else {
      yield put(setError({ actionType: GET_TOKEN, message: 'Empty Token' }));
      yield put(getTokenFail());
      api().setToken('');
    }
  } catch (err) {
    yield put(setError({ actionType: GET_TOKEN, message: err.message }));
  }
  // put(setLoading({ actionType: GET_TOKEN, loading: false }));
}

function sagaLogOut() {
  api().setToken('');
}

export default function*(): Generator {
  yield takeEvery(GET_TOKEN, sagaGetToken);
  yield takeEvery(LOGOUT, sagaLogOut);
}
