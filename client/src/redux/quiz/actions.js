import types from './types';

const actions = {
  updateQuizAnswer: (questionKey, answer) => {
    return {
      type: types.UPDATE_QUIZ_ANSWER,
      payload: { questionKey, answer },
    };
  },
  clearQuizAnswers: () => {
    return {
      type: types.CLEAR_QUIZ_ANSWERS,
      payload: {},
    };
  },
  postQuizRetriesSuccess: () => {
    return {
      type: types.POST_QUIZ_RETRIES_SUCCESS,
      payload: {},
    };
  },
  postQuizRetriesFailure: (error) => {
    return {
      type: types.POST_QUIZ_RETRIES_FAILURE,
      payload: { error },
    };
  },
  completedQuiz: () => {
    return {
      type: types.COMPLETED_QUIZ,
      payload: {},
    };
  },
};

export default actions;
