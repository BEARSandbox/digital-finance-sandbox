import 'regenerator-runtime/runtime';
import { all, takeLatest } from 'redux-saga/effects';

import types from '../types';

// import each saga
import generateNewUser from './generateNewUser';
import consent from './consent';
import login from './login';
import logout from './logout';

export default function* authSaga() {
  yield all([takeLatest(types.NEW_USER_REQUEST, generateNewUser)]);
  yield all([takeLatest(types.CONSENT, consent)]);
  yield all([takeLatest(types.LOGIN_REQUEST, login)]);
  yield all([takeLatest(types.LOGOUT, logout)]);
}
