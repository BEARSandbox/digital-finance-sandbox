import 'regenerator-runtime/runtime';
import { all, takeLatest } from 'redux-saga/effects';

import types from '../types';

// import each saga
import savePageData from './savePageData';
import saveActionData from './saveActionData';

export default function* metricsSaga() {
  yield all([takeLatest(types.SAVE_PAGE_DATA_TO_DB, savePageData)]);
  yield all([takeLatest(types.SAVE_ACTION_DATA_TO_DB, saveActionData)]);
}
