import types from './types';

export const initialState = {
  userDataJSON: null,
  pageDataJSON: null,
  actionDataJSON: null,
  status: {
    getPending: false,
    getSuccess: false,
    downloadPending: false,
    downloadSuccess: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_ALL_DATA_REQUEST: {
      return {
        ...initialState,
        status: {
          ...state.status,
          getPending: true,
          getSuccess: false,
        },
      };
    }
    case types.GET_ALL_DATA_SUCCESS: {
      const { userDataJSON, pageDataJSON, actionDataJSON } = payload;

      return {
        ...initialState,
        userDataJSON,
        pageDataJSON,
        actionDataJSON,
        status: {
          ...state.status,
          getPending: false,
          getSuccess: true,
        },
      };
    }
    case types.GET_ALL_DATA_FAILURE: {
      return {
        ...initialState,
        status: {
          ...state.status,
          getPending: false,
          getSuccess: false,
        },
      };
    }
    case types.DOWNLOAD_ALL_DATA_REQUEST: {
      return {
        ...state,
        status: {
          ...state.status,
          downloadPending: true,
          downloadSuccess: false,
        },
      };
    }
    case types.DOWNLOAD_ALL_DATA_SUCCESS:
    case types.DOWNLOAD_ALL_DATA_FAILURE: {
      return {
        ...state,
        status: {
          ...state.status,
          downloadPending: false,
          downloadSuccess: true,
        },
      };
    }
    default: {
      return state;
    }
  }
};
