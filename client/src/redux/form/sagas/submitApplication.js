import 'regenerator-runtime/runtime';
import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import actions from '../actions';

const getUserToken = (state) => state.auth.token;
const getFormData = (state) => state.form.formData;
const getIsAdmin = (state) => state.auth.isAdmin;

export default function* submitApplication() {
  const isAdmin = yield select(getIsAdmin);

  // Don't store form data to the the database for admins
  if (isAdmin) {
    yield put(actions.submitApplicationSuccess());
    return;
  }

  try {
    const userToken = yield select(getUserToken);
    const formData = yield select(getFormData);

    const newFormData = {
      ...formData,
      card: formData.card.name,
      applicationSubmitted: true,
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

    yield put(actions.submitApplicationSuccess());

    // Mark the application as submitted in local storage so
    // if the user refreshes the page, the information persists.
    // Also store the card id to be used for the post-study questions.
    const userInfoFromStorage = JSON.parse(
      localStorage.getItem('digitalFinanceSandbox_userInfo')
    );

    userInfoFromStorage.applicationSubmitted = true;
    userInfoFromStorage.cardName = formData.card.name;
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
    yield put(actions.submitApplicationFailure(formattedError));
  }
}
