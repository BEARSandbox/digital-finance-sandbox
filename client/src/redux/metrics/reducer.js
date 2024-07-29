import types from './types';
import { v4 as uuidv4 } from 'uuid';

export const initialState = {
  pageData: [],
  actionData: [],
  currentPageId: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_PAGE_DATA: {
      // New page so new page id
      const newCurrentPageId = uuidv4();

      const { webpage } = payload;
      const newState = { ...state };
      const newPageData = [...newState.pageData];

      const currentTime = Date.now();

      // The last entry used to have just the start time, add the end time now
      if (newPageData.length > 0) {
        const page = {
          ...newPageData[newPageData.length - 1],
          end: currentTime,
        };

        newPageData[newPageData.length - 1] = page;
      }

      // Add the new webpage that triggered this action
      newPageData.push({
        webpage: webpage,
        webpageId: newCurrentPageId,
        start: currentTime,
      });

      newState.pageData = newPageData;
      newState.currentPageId = newCurrentPageId;
      return newState;
    }
    case types.ADD_ACTION_DATA: {
      const { actionData } = payload;
      actionData.webpageId = state.currentPageId;

      // Add the click data to the array
      return {
        ...state,
        actionData: [...state.actionData, actionData],
      };
    }
    case types.SAVE_PAGE_DATA_TO_DB_SUCCESS: {
      const { pagesSaved } = payload;

      // Remove the data that was saved to the database from the state
      return {
        ...state,
        pageData: state.pageData.slice(pagesSaved),
      };
    }
    case types.SAVE_PAGE_DATA_TO_DB_FAILURE: {
      const { pagesSaved } = payload;

      // Remove the data that was saved to the database before the error from the state
      return {
        ...state,
        pageData: state.pageData.slice(pagesSaved),
      };
    }
    case types.SAVE_ACTION_DATA_TO_DB_SUCCESS: {
      const { actionsSaved } = payload;

      // Remove the data that was saved to the database from the state
      return {
        ...state,
        actionData: state.actionData.slice(actionsSaved),
      };
    }
    case types.SAVE_ACTION_DATA_TO_DB_FAILURE: {
      const { actionsSaved } = payload;

      // Remove the data that was saved to the database before the error from the state
      return {
        ...state,
        actionData: state.actionData.slice(actionsSaved),
      };
    }
    default: {
      return state;
    }
  }
};
