import types from './types';

export const initialState = {
  userId: '',
  userEmail: '',
  isAuthenticated: false,
  hasConsented: false,
  isAdmin: false,
  hasDeleteAccess: false,
  factorOne: 0,
  factorTwo: 2,
  factorThree: 0,
  buttonId: 0,
  token: null,
  schumerBoxContext: null,
  showTermsOverlay: false,
  status: {
    loginPending: false,
    loginSuccess: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOAD_EXISTING_USER: {
      const user = JSON.parse(
        localStorage.getItem('digitalFinanceSandbox_userInfo')
      );

      return {
        ...state,
        userId: user.id,
        userEmail: '',
        isAuthenticated: true,
        hasConsented: user.hasConsented,
        isAdmin: false,
        hasDeleteAccess: false,
        factorOne: user.factorOne,
        factorTwo: user.factorTwo,
        factorThree: user.factorThree,
        token: user.token,
      };
    }
    case types.NEW_USER_REQUEST: {
      return {
        ...state,
        userId: '',
        userEmail: '',
        isAuthenticated: false,
        status: {
          ...state.status,
          loginPending: true,
          loginSuccess: false,
        },
      };
    }
    case types.NEW_USER_SUCCESS: {
      const { user } = payload;
      return {
        ...state,
        userId: user.id,
        userEmail: '',
        isAuthenticated: true,
        hasConsented: user.hasConsented,
        isAdmin: false,
        hasDeleteAccess: false,
        factorOne: user.factorOne,
        factorTwo: user.factorTwo,
        factorThree: user.factorThree,
        token: user.token,
        status: {
          ...state.status,
          loginPending: false,
          loginSuccess: true,
        },
      };
    }
    case types.NEW_USER_FAILURE: {
      return {
        ...state,
        userId: '',
        userEmail: '',
        isAuthenticated: false,
        status: {
          ...state.status,
          loginPending: false,
          loginSuccess: false,
        },
      };
    }
    case types.LOGIN_REQUEST: {
      return {
        ...state,
        userId: '',
        userEmail: '',
        isAuthenticated: false,
        status: {
          ...state.status,
          loginPending: true,
          loginSuccess: false,
        },
      };
    }
    case types.LOGIN_SUCCESS: {
      const { user } = payload;
      return {
        ...state,
        userId: user.id,
        userEmail: user.email,
        isAuthenticated: true,
        hasConsented: user.hasConsented,
        isAdmin: user.isAdmin,
        hasDeleteAccess: user.hasDeleteAccess,
        factorOne: user.factorOne,
        factorTwo: user.factorTwo,
        factorThree: user.factorThree,
        token: user.token,
        status: {
          ...state.status,
          loginPending: false,
          loginSuccess: true,
        },
      };
    }
    case types.LOGIN_FAILURE: {
      return {
        ...state,
        userId: '',
        userEmail: '',
        isAuthenticated: false,
        status: {
          ...state.status,
          loginPending: false,
          loginSuccess: false,
        },
      };
    }
    case types.LOGOUT: {
      return {
        ...state,
        userId: '',
        userEmail: '',
        isAuthenticated: false,
        isAdmin: false,
        hasDeleteAccess: false,
        factorOne: 0,
        factorTwo: 2,
        factorThree: 0,
        token: null,
        status: {
          ...state.status,
          loginPending: false,
          loginSuccess: false,
        },
      };
    }
    case types.CONSENT: {
      return {
        ...state,
        hasConsented: true,
      };
    }
    case types.TOGGLE_FACTOR: {
      return {
        ...state,
        [payload.factorKey]: payload.factorValue,
      };
    }
    case types.SET_SCHUMER_BOX_CONTEXT: {
      return {
        ...state,
        schumerBoxContext: {
          cardKey: payload.cardKey,
        },
      };
    }
    case types.CLEAR_SCHUMER_BOX_CONTEXT: {
      return {
        ...state,
        schumerBoxContext: null,
      };
    }
    case types.TOGGLE_TERMS_OVERLAY: {
      return {
        ...state,
        showTermsOverlay: !state.showTermsOverlay,
      };
    }
    default: {
      return state;
    }
  }
};
