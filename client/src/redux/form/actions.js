import types from './types';

const actions = {
  generateSurveyCodeRequest: () => {
    return {
      type: types.GENERATE_SURVEY_CODE_REQUEST,
      payload: {},
    };
  },
  generateSurveyCodeSuccess: (surveyCode) => {
    return {
      type: types.GENERATE_SURVEY_CODE_SUCCESS,
      payload: { surveyCode },
    };
  },
  generateSurveyCodeFailure: (error) => {
    return {
      type: types.GENERATE_SURVEY_CODE_FAILURE,
      payload: { error },
    };
  },
  submitApplicationRequest: () => {
    return {
      type: types.SUBMIT_APPLICATION_REQUEST,
      payload: {},
    };
  },
  submitApplicationSuccess: () => {
    return {
      type: types.SUBMIT_APPLICATION_SUCCESS,
      payload: {},
    };
  },
  submitApplicationFailure: (error) => {
    return {
      type: types.SUBMIT_APPLICATION_FAILURE,
      payload: { error },
    };
  },
  submitSessionReviewRequest: (formData) => {
    return {
      type: types.SUBMIT_SESSION_REVIEW_REQUEST,
      payload: { formData },
    };
  },
  submitSessionReviewSuccess: () => {
    return {
      type: types.SUBMIT_SESSION_REVIEW_SUCCESS,
      payload: {},
    };
  },
  submitSessionReviewFailure: (error) => {
    return {
      type: types.SUBMIT_SESSION_REVIEW_FAILURE,
      payload: { error },
    };
  },
  setCurrentStep: (step) => {
    return {
      type: types.SET_CURRENT_STEP,
      payload: { step },
    };
  },
  setFormAttribute: (attribute, value) => {
    return {
      type: types.SET_FORM_ATTRIBUTE,
      payload: { attribute, value },
    };
  },
  validateRequiredField: (attribute, value, isValidFunc) => {
    return {
      type: types.VALIDATE_REQUIRED_FIELD,
      payload: { attribute, value, isValidFunc },
    };
  },
  setOptionalFieldsStatus: (statusObj) => {
    return {
      type: types.SET_OPTIONAL_FIELDS_STATUS,
      payload: { statusObj },
    };
  },
  setOptionalFieldStatus: (attribute, value) => {
    return {
      type: types.SET_OPTIONAL_FIELD_STATUS,
      payload: { attribute, value },
    };
  },
};

export default actions;
