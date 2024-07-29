import 'regenerator-runtime/runtime';
import { all, takeLatest } from 'redux-saga/effects';

import types from '../types';

// import each saga
import getAllData from './getAllData';
import downloadAllData from './downloadAllData';
import deleteAllData from './deleteAllData';

export default function* userDataSaga() {
  yield all([takeLatest(types.GET_ALL_DATA_REQUEST, getAllData)]);
  yield all([takeLatest(types.DOWNLOAD_ALL_DATA_REQUEST, downloadAllData)]);
  yield all([takeLatest(types.DELETE_ALL_DATA_REQUEST, deleteAllData)]);
}
