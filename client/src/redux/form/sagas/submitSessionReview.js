import 'regenerator-runtime/runtime';
import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import actions from '../actions';

const getUserToken = (state) => state.auth.token;
const getIsAdmin = (state) => state.auth.isAdmin;

export default function* submitSessionReview(action) {
  const isAdmin = yield select(getIsAdmin);

  // Don't store form data to the the database for admins
  if (isAdmin) {
    yield put(actions.submitSessionReviewSuccess());
    return;
  }

  try {
    const userToken = yield select(getUserToken);
    const { formData } = action.payload;

    const newFormData = {
      ...formData,
      sessionReviewSubmitted: true,
    };

    // Backend API call
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    yield call(
      axios.post,
      '/api/form/form-data',
      { formData: newFormData },
      config
    );

    yield put(actions.submitSessionReviewSuccess());

    // Mark in local storage so if the user refreshes the
    // page, the information persists
    const userInfoFromStorage = JSON.parse(
      localStorage.getItem('digitalFinanceSandbox_userInfo')
    );

    userInfoFromStorage.sessionReviewSubmitted = true;
    localStorage.setItem(
      'digitalFinanceSandbox_userInfo',
      JSON.stringify(userInfoFromStorage)
    );
  } catch (e) {
    const formattedError = new Error('An unexpected error occured.');
    if (e.response) {
      formattedError.message = e.response.data.message;
    }
    alert(formattedError.message);
    yield put(actions.submitSessionReviewFailure(formattedError));
  }
}
