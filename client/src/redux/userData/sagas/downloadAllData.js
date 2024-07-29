import { call, put, select } from 'redux-saga/effects';
import myWorker from '../../../workers/jsonParser.worker';
import actions from '../actions';

const getUserData = (state) => state.userData;

const downloadFile = (filename, url) => {
  // Automatically download file after it is processed
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.click();
  window.URL.revokeObjectURL(url);
};

const processAndDownloadData = (allData) => {
  return new Promise((resolve, reject) => {
    const jsonToCSVWorker = new myWorker();
    jsonToCSVWorker.postMessage({ type: 'jsonToCSV', allData });
    jsonToCSVWorker.onerror = (e) => {
      reject(e);
    };

    let requiredCount = 0,
      currentCount = 0;

    jsonToCSVWorker.onmessage = (e) => {
      switch (e.data.type) {
        case 'userDataURL':
          downloadFile('user_data.csv', e.data.url);
          currentCount++;
          break;
        case 'pageDataURL':
          downloadFile('page_data.csv', e.data.url);
          currentCount++;
          break;
        case 'actionDataURL':
          downloadFile('action_data.csv', e.data.url);
          currentCount++;
          break;
        case 'done':
          requiredCount = e.data.parsed;
          break;
        default:
          break;
      }

      if (currentCount === requiredCount) {
        resolve();
      }
    };
  });
};

export default function* downloadAllData() {
  const userData = yield select(getUserData);

  try {
    yield call(processAndDownloadData, userData);
    yield put(actions.downloadAllDataSuccess());
  } catch (e) {
    alert(e.message);
    yield put(actions.downloadAllDataFailure());
  }
}
