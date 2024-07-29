import types from './types';

const actions = {
  addPageData: (webpage) => {
    return {
      type: types.ADD_PAGE_DATA,
      payload: { webpage },
    };
  },
  addActionData: (actionData) => {
    return {
      type: types.ADD_ACTION_DATA,
      payload: { actionData },
    };
  },
  savePageDataToDB: (isLastSave) => {
    return {
      type: types.SAVE_PAGE_DATA_TO_DB,
      payload: { isLastSave },
    };
  },
  savePageDataToDBSuccess: (pagesSaved) => {
    return {
      type: types.SAVE_PAGE_DATA_TO_DB_SUCCESS,
      payload: { pagesSaved },
    };
  },
  savePageDataToDBFailure: (pagesSaved) => {
    return {
      type: types.SAVE_PAGE_DATA_TO_DB_FAILURE,
      payload: { pagesSaved },
    };
  },
  saveActionDataToDB: () => {
    return {
      type: types.SAVE_ACTION_DATA_TO_DB,
      payload: {},
    };
  },
  saveActionDataToDBSuccess: (actionsSaved) => {
    return {
      type: types.SAVE_ACTION_DATA_TO_DB_SUCCESS,
      payload: { actionsSaved },
    };
  },
  saveActionDataToDBFailure: (actionsSaved) => {
    return {
      type: types.SAVE_ACTION_DATA_TO_DB_FAILURE,
      payload: { actionsSaved },
    };
  },
};

export default actions;
