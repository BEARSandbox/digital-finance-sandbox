import types from './types';

const actions = {
  getAllDataRequest: (startDate, endDate) => {
    return {
      type: types.GET_ALL_DATA_REQUEST,
      payload: { startDate, endDate },
    };
  },
  getAllDataSuccess: (fileData) => {
    return {
      type: types.GET_ALL_DATA_SUCCESS,
      payload: { ...fileData },
    };
  },
  getAllDataFailure: () => {
    return {
      type: types.GET_ALL_DATA_FAILURE,
    };
  },
  downloadAllDataRequest: () => {
    return {
      type: types.DOWNLOAD_ALL_DATA_REQUEST,
    };
  },
  downloadAllDataSuccess: () => {
    return {
      type: types.DOWNLOAD_ALL_DATA_SUCCESS,
    };
  },
  downloadAllDataFailure: () => {
    return {
      type: types.DOWNLOAD_ALL_DATA_FAILURE,
    };
  },
  deleteAllDataRequest: () => {
    return {
      type: types.DELETE_ALL_DATA_REQUEST,
    };
  },
  deleteAllDataSuccess: () => {
    return {
      type: types.DELETE_ALL_DATA_SUCCESS,
    };
  },
  deleteAllDataFailure: () => {
    return {
      type: types.DELETE_ALL_DATA_FAILURE,
    };
  },
};

export default actions;
