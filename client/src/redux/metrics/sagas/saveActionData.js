import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import actions from '../actions';

const getUserToken = (state) => state.auth.token;
const getActionData = (state) => state.metrics.actionData;

export default function* saveActionData() {
  try {
    const userToken = yield select(getUserToken);
    const actionData = yield select(getActionData);

    // Nothing to save to the database
    if (actionData.length === 0) return;

    // Backend API call
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    const { data } = yield call(
      axios.post,
      '/api/metrics/action-data',
      { actionData },
      config
    );

    yield put(actions.saveActionDataToDBSuccess(data.actionsSaved));
  } catch (e) {
    let actionsSaved = 0;
    if (e.response) {
      alert(e.response.data.message);
      actionsSaved = e.response.data.actionsSaved || 0;
    } else {
      alert('An unexpected error occured.');
    }
    yield put(actions.saveActionDataToDBFailure(actionsSaved));
  }
}
