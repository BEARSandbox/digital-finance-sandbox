import 'regenerator-runtime/runtime';
import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import actions from '../actions';

const getUserToken = (state) => state.auth.token;
const getRetries = (state) => state.quiz.retries;
const getIsAdmin = (state) => state.auth.isAdmin;

export default function* postQuizRetries() {
  const isAdmin = yield select(getIsAdmin);

  // Don't store quiz data to the the database for admins
  if (isAdmin) {
    yield put(actions.postQuizRetriesSuccess());
    return;
  }

  try {
    const userToken = yield select(getUserToken);
    const retries = yield select(getRetries);

    // Backend API call
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    yield call(axios.post, '/api/quiz/retries', { retries }, config);

    yield put(actions.postQuizRetriesSuccess());
  } catch (e) {
    const formattedError = new Error('An unexpected error occured.');
    if (e.response) {
      formattedError.message = e.response.data.message;
    }
    alert(formattedError.message);
    yield put(actions.postQuizRetriesFailure(formattedError));
  }
}
