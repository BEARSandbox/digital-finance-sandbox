import {
  createUserCSV,
  createPageCSV,
  createActionCSV,
} from '../utils/jsonConverter';

// eslint-disable-next-line
const window = self;

onmessage = (e) => {
  if (e.data.type === 'jsonToCSV') {
    const { allData } = e.data;

    let parsed = 0;
    let csv, blobData, url;
    if (allData.userDataJSON) {
      csv = createUserCSV(allData.userDataJSON);
      blobData = new Blob([csv]);
      url = window.URL.createObjectURL(blobData);
      postMessage({ type: 'userDataURL', url });
      parsed++;
    }

    if (allData.pageDataJSON) {
      csv = createPageCSV(allData.pageDataJSON);
      blobData = new Blob([csv]);
      url = window.URL.createObjectURL(blobData);
      postMessage({ type: 'pageDataURL', url });
      parsed++;
    }

    if (allData.actionDataJSON) {
      csv = createActionCSV(allData.actionDataJSON);
      blobData = new Blob([csv]);
      url = window.URL.createObjectURL(blobData);
      postMessage({ type: 'actionDataURL', url });
      parsed++;
    }

    postMessage({ type: 'done', parsed });
  }
};
