const types = {
  LOAD_EXISTING_USER: 'AUTH/LOAD_EXISTING_USER',
  NEW_USER_REQUEST: 'AUTH/NEW_USER_REQUEST',
  NEW_USER_SUCCESS: 'AUTH/NEW_USER_SUCCESS',
  NEW_USER_FAILURE: 'AUTH/NEW_USER_FAILURE',

  LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',
  LOGOUT: 'AUTH/LOGOUT',

  CONSENT: 'AUTH/CONSENT',
  TOGGLE_FACTOR: 'AUTH/TOGGLE_FACTOR',

  SET_SCHUMER_BOX_CONTEXT: 'AUTH/SET_SCHUMER_BOX_CONTEXT',
  CLEAR_SCHUMER_BOX_CONTEXT: 'AUTH/CLEAR_SCHUMER_BOX_CONTEXT',

  TOGGLE_TERMS_OVERLAY: 'AUTH/TOGGLE_TERMS_OVERLAY',
};

export default types;
