import 'regenerator-runtime/runtime';
import { all, takeLatest } from 'redux-saga/effects';

import types from '../types';

// import each saga
import postQuizRetries from './postQuizRetries';

export default function* formSaga() {
  yield all([takeLatest(types.CLEAR_QUIZ_ANSWERS, postQuizRetries)]);
}
