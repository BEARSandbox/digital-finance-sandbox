import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import actions from '../actions';

const getUserToken = (state) => state.auth.token;

export default function* deleteAllData() {
  try {
    const userToken = yield select(getUserToken);

    // Backend API call
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    yield call(axios.delete, '/api/userData/deleteAll', config);
    yield put(actions.deleteAllDataSuccess());
    alert('Successfully deleted all metrics data');
  } catch (e) {
    console.log(e);
    if (e.response) {
      alert(e.response.data.message);
    } else {
      alert('An unexpected error occured.');
    }
    yield put(actions.deleteAllDataFailure());
  }
}
