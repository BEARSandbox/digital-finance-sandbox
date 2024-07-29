import types from './types';

const actions = {
  loadExistingUser: () => {
    return {
      type: types.LOAD_EXISTING_USER,
      payload: {},
    };
  },
  newUserRequest: (assignmentId, workerId, isRA, clientData) => {
    return {
      type: types.NEW_USER_REQUEST,
      payload: { assignmentId, workerId, isRA, clientData },
    };
  },
  newUserSuccess: (user) => {
    return {
      type: types.NEW_USER_SUCCESS,
      payload: {
        user,
      },
    };
  },
  newUserFailure: (error) => {
    return {
      type: types.NEW_USER_FAILURE,
      payload: {
        error,
      },
    };
  },
  loginRequest: (email, password) => {
    return {
      type: types.LOGIN_REQUEST,
      payload: {
        email,
        password,
      },
    };
  },
  loginSuccess: (user) => {
    return {
      type: types.LOGIN_SUCCESS,
      payload: {
        user,
      },
    };
  },
  loginFailure: (error) => {
    return {
      type: types.LOGIN_FAILURE,
      payload: {
        error,
      },
    };
  },
  logout: () => {
    return {
      type: types.LOGOUT,
      payload: {},
    };
  },
  consent: () => {
    return {
      type: types.CONSENT,
      payload: {},
    };
  },
  toggleFactor: (factorKey, factorValue) => {
    return {
      type: types.TOGGLE_FACTOR,
      payload: {
        factorKey,
        factorValue,
      },
    };
  },
  setSchumerBoxContext: (cardKey) => {
    return {
      type: types.SET_SCHUMER_BOX_CONTEXT,
      payload: { cardKey },
    };
  },
  clearSchumerBoxContext: () => {
    return {
      type: types.CLEAR_SCHUMER_BOX_CONTEXT,
      payload: {},
    };
  },
  toggleTermsOverlay: () => {
    return {
      type: types.TOGGLE_TERMS_OVERLAY,
      payload: {},
    };
  },
};

export default actions;
