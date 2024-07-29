import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import actions from '../actions';

const getUserToken = (state) => state.auth.token;

export default function* getAllData(action) {
  try {
    const userToken = yield select(getUserToken);
    let { startDate, endDate } = action.payload;

    if (endDate) {
      endDate = new Date(endDate); // clone the date object before modifying
      endDate.setDate(endDate.getDate() + 1);
    }

    // Backend API call
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      params: {
        startDate: startDate && startDate.getTime(),
        endDate: endDate && endDate.getTime(),
      },
    };

    const { data } = yield call(axios.get, '/api/userData/getAll', config);

    yield put(actions.getAllDataSuccess(data));
    yield put(actions.downloadAllDataRequest());
  } catch (e) {
    console.log(e);
    if (e.response) {
      alert(e.response.data.message);
    } else {
      alert('An unexpected error occured.');
    }
    yield put(actions.getAllDataFailure());
  }
}
