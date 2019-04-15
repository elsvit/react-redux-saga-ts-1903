import {put, takeEvery} from 'redux-saga/effects';

import api from 'services/api';
import {GET_RESTAURANT, GET_RESTAURANTS, getRestaurantsSuccess, getRestaurantSuccess} from '.';
import {sagaGetToken} from '../auth/saga';
import {setError, setLoaded, setLoading} from '../common';

function* sagaGetRestaurants() {
  try {
    const token = api().getToken();
    if (!token) {
      yield sagaGetToken();
    }
    yield put(setLoading({ actionType: GET_RESTAURANTS}));
    const res = yield api().restaurants.get();
    const data = res.data;
    if (data) {
      yield put(getRestaurantsSuccess(data));
      yield put(setLoaded({ actionType: GET_RESTAURANTS}));
    }
  } catch (err) {
    yield put(setError({ actionType: GET_RESTAURANTS, message: err.message }));
  }

}

function* sagaGetRestaurant({ id, type }: { id: string; type: typeof GET_RESTAURANT }) {
  try {
    yield put(setLoading({ actionType: type}));
    const res = yield api().restaurants.getById(id);
    const data = res.data;
    if (data) {
      yield put(getRestaurantSuccess(data));
      yield put(setLoaded({ actionType: type}));
    }
  } catch (err) {
    // tslint:disable-next-line
    console.log('saga error:', err);
    yield put(setError({actionType: type, message: err.message}));
  }
}

export default function*(): Generator {
  yield takeEvery(GET_RESTAURANT, sagaGetRestaurant);
  yield takeEvery(GET_RESTAURANTS, sagaGetRestaurants);
}
