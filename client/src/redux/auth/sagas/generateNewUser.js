import 'regenerator-runtime/runtime';
import { call, put } from 'redux-saga/effects';
import axios from 'axios';

import actions from '../actions';

export default function* generateNewUser(action) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = action.payload;
    const { data } = yield call(
      axios.post,
      '/api/users/generate-user',
      body,
      config
    );

    yield put(actions.newUserSuccess(data.user));

    localStorage.setItem(
      'digitalFinanceSandbox_userInfo',
      JSON.stringify(data.user)
    );
  } catch (e) {
    const formattedError = new Error(
      'An unexpected error occured when trying to generate your user id.'
    );
    alert(formattedError.message);
    yield put(actions.newUserFailure(formattedError));
  }
}
