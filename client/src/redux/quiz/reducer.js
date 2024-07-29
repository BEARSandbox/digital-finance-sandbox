import types from './types';

export const initialState = {
  question1: '',
  question2: '',
  completed: false,
  attempted: false,
  retries: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.UPDATE_QUIZ_ANSWER: {
      const { questionKey, answer } = payload;

      return {
        ...state,
        [questionKey]: answer,
      };
    }
    case types.CLEAR_QUIZ_ANSWERS: {
      return {
        ...initialState,
        attempted: true,
        retries: state.retries + 1,
      };
    }
    case types.COMPLETED_QUIZ: {
      return {
        ...state,
        completed: true,
        attempted: true,
      };
    }
    default: {
      return state;
    }
  }
};
