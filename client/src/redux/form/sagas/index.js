import 'regenerator-runtime/runtime';
import { all, takeLatest } from 'redux-saga/effects';

import types from '../types';

// import each saga
import submitApplication from './submitApplication';
import submitSessionReview from './submitSessionReview';
import generateSurveyCode from './generateSurveyCode';

export default function* formSaga() {
  yield all([
    takeLatest(types.GENERATE_SURVEY_CODE_REQUEST, generateSurveyCode),
  ]);
  yield all([takeLatest(types.SUBMIT_APPLICATION_REQUEST, submitApplication)]);
  yield all([
    takeLatest(types.SUBMIT_SESSION_REVIEW_REQUEST, submitSessionReview),
  ]);
}
