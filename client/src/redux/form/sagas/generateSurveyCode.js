import 'regenerator-runtime/runtime';
import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import actions from '../actions';

const getUserToken = (state) => state.auth.token;
const getIsAdmin = (state) => state.auth.isAdmin;

export default function* generateSurveyCode() {
  const isAdmin = yield select(getIsAdmin);

  // Don't store form data to the the database for admins
  if (isAdmin) {
    yield put(actions.generateSurveyCodeSuccess(''));
    return;
  }

  try {
    const userToken = yield select(getUserToken);

    const userInfoFromStorage = JSON.parse(
      localStorage.getItem('digitalFinanceSandbox_userInfo')
    );

    if (!userInfoFromStorage.surveyCode) {
      const surveyCode = Math.floor(Math.random() * 90000) + 10000;

      userInfoFromStorage.surveyCode = surveyCode;
      localStorage.setItem(
        'digitalFinanceSandbox_userInfo',
        JSON.stringify(userInfoFromStorage)
      );

      // Backend API call
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      };

      yield call(axios.post, '/api/form/survey-code', { surveyCode }, config);
    }

    yield put(
      actions.generateSurveyCodeSuccess(userInfoFromStorage.surveyCode)
    );
  } catch (e) {
    const formattedError = new Error('An unexpected error occured.');
    if (e.response) {
      formattedError.message = e.response.data.message;
    }
    alert(formattedError.message);
    yield put(actions.generateSurveyCodeFailure(formattedError));
  }
}
