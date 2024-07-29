import 'regenerator-runtime/runtime';
import { call, select } from 'redux-saga/effects';
import axios from 'axios';

const getUserToken = (state) => state.auth.token;

export default function* consent() {
  try {
    const userToken = yield select(getUserToken);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    yield call(axios.post, '/api/users/consent', {}, config);

    const userInfoFromStorage = JSON.parse(
      localStorage.getItem('digitalFinanceSandbox_userInfo')
    );

    userInfoFromStorage.hasConsented = true;
    localStorage.setItem(
      'digitalFinanceSandbox_userInfo',
      JSON.stringify(userInfoFromStorage)
    );
  } catch (e) {
    const formattedError = new Error(
      'An unexpected error occured when trying to save your consent.'
    );
    alert(formattedError.message);
  }
}
