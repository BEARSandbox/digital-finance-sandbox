import types from './types';
import authTypes from '../auth/types';

export const initialState = {
  applicationSubmitted: false,
  sessionReviewSubmitted: false,
  surveyCode: '',
  formData: {
    card: {
      key: '',
      category: '',
      name: '',
      description: '',
    },
    checkbox1: false,
    checkbox2: false,
    schumerBoxCheckbox: false,
    termsManagerCheckbox: false,
  },
  currentStep: -1,
  requiredFieldsIncomplete: {},
  onSubmitIncompleteFields: {},
  status: {
    submitApplicationPending: false,
    submitApplicationSuccess: false,
    submitSessionReviewPending: false,
    submitSessionReviewSuccess: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GENERATE_SURVEY_CODE_SUCCESS: {
      const { surveyCode } = payload;
      return {
        ...state,
        surveyCode,
      };
    }
    case types.GENERATE_SURVEY_CODE_FAILURE: {
      return {
        ...state,
      };
    }
    case types.SUBMIT_APPLICATION_REQUEST: {
      return {
        ...state,
        status: {
          ...state.status,
          submitApplicationPending: true,
          submitApplicationSuccess: false,
        },
      };
    }
    case types.SUBMIT_APPLICATION_SUCCESS: {
      return {
        ...state,
        applicationSubmitted: true,
        status: {
          ...state.status,
          submitApplicationPending: false,
          submitApplicationSuccess: true,
        },
      };
    }
    case types.SUBMIT_APPLICATION_FAILURE: {
      return {
        ...state,
        status: {
          ...state.status,
          submitApplicationPending: false,
          submitApplicationSuccess: false,
        },
      };
    }
    case types.SUBMIT_SESSION_REVIEW_REQUEST: {
      return {
        ...state,
        status: {
          ...state.status,
          submitSessionReviewPending: true,
          submitSessionReviewSuccess: false,
        },
      };
    }
    case types.SUBMIT_SESSION_REVIEW_SUCCESS: {
      return {
        ...state,
        sessionReviewSubmitted: true,
        status: {
          ...state.status,
          submitSessionReviewPending: false,
          submitSessionReviewSuccess: true,
        },
      };
    }
    case types.SUBMIT_SESSION_REVIEW_FAILURE: {
      return {
        ...state,
        status: {
          ...state.status,
          submitSessionReviewPending: false,
          submitSessionReviewSuccess: false,
        },
      };
    }
    case types.SET_CURRENT_STEP: {
      const { step } = payload;
      return {
        ...state,
        currentStep: step,
      };
    }
    case types.SET_FORM_ATTRIBUTE: {
      const { attribute, value } = payload;
      return {
        ...state,
        formData: {
          ...state.formData,
          [attribute]: value,
        },
      };
    }
    case types.VALIDATE_REQUIRED_FIELD: {
      const { attribute, value, isValidFunc } = payload;

      return {
        ...state,
        requiredFieldsIncomplete: {
          ...state.requiredFieldsIncomplete,
          [attribute]: !isValidFunc(value),
        },
      };
    }
    case types.SET_OPTIONAL_FIELDS_STATUS: {
      const { statusObj } = payload;
      return {
        ...state,
        onSubmitIncompleteFields: statusObj,
      };
    }
    case types.SET_OPTIONAL_FIELD_STATUS: {
      const { attribute, value } = payload;
      return {
        ...state,
        onSubmitIncompleteFields: {
          ...state.onSubmitIncompleteFields,
          [attribute]: value === '',
        },
      };
    }
    case authTypes.LOGIN_SUCCESS: {
      return { ...initialState };
    }
    case authTypes.NEW_USER_SUCCESS: {
      const { user } = payload;

      return {
        ...initialState,
        applicationSubmitted: user.applicationSubmitted ? true : false,
        sessionReviewSubmitted: user.sessionReviewSubmitted ? true : false,
        surveyCode: user.surveyCode,
      };
    }
    case authTypes.LOAD_EXISTING_USER: {
      const user = JSON.parse(
        localStorage.getItem('digitalFinanceSandbox_userInfo')
      );

      return {
        ...initialState,
        applicationSubmitted: user.applicationSubmitted ? true : false,
        sessionReviewSubmitted: user.sessionReviewSubmitted ? true : false,
      };
    }
    default: {
      return state;
    }
  }
};
