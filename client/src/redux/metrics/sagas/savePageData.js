import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import actions from '../actions';

const getUserToken = (state) => state.auth.token;
const getPageData = (state) => state.metrics.pageData;

export default function* savePageData(action) {
  try {
    const userToken = yield select(getUserToken);
    const pageData = yield select(getPageData);
    const { isLastSave = false } = action.payload;

    const copyData = [...pageData];

    // We don't want to store the last page visit yet
    // since the user is still on it
    if (!isLastSave) {
      copyData.splice(copyData.length - 1);
    }

    // Nothing to save to the database
    if (copyData.length === 0) return;

    /**
     * Note: The last element of copyData won't have end time so
     * create an end time for it, since this is the last save and
     * the user has closed the website
     */
    if (isLastSave) {
      const page = {
        ...copyData[copyData.length - 1],
        end: Date.now(),
      };
      copyData[copyData.length - 1] = page;
    }

    // Backend API call
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    const { data } = yield call(
      axios.post,
      '/api/metrics/page-data',
      { pageData: copyData },
      config
    );

    yield put(actions.savePageDataToDBSuccess(data.pagesSaved));
  } catch (e) {
    let pagesSaved = 0;
    if (e.response) {
      alert(e.response.data.message);
      pagesSaved = e.response.data.pagesSaved || 0;
    } else {
      alert('An unexpected error occured.');
    }
    yield put(actions.savePageDataToDBFailure(pagesSaved));
  }
}
