import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';
import { sagas, runSagas } from './sagas';
import { initialState as initialAuthState } from './auth/reducer';
import { initialState as initialMetricsState } from './metrics/reducer';
import { initialState as initialFormState } from './form/reducer';
import { initialState as initialQuizState } from './quiz/reducer';
import { initialState as initialUserDataState } from './userData/reducer';

const userInfoFromStorage = localStorage.getItem(
  'digitalFinanceSandbox_userInfo'
)
  ? JSON.parse(localStorage.getItem('digitalFinanceSandbox_userInfo'))
  : null;

const persistedState = {
  auth: {
    ...initialAuthState,
  },
  metrics: {
    ...initialMetricsState,
  },
  form: {
    ...initialFormState,
  },
  quiz: {
    ...initialQuizState,
  },
  userData: {
    ...initialUserDataState,
  },
};

if (userInfoFromStorage) {
  persistedState.auth.userId = userInfoFromStorage.id;
  persistedState.auth.userEmail = userInfoFromStorage.email;
  persistedState.auth.isAuthenticated = true;
  persistedState.auth.hasConsented = userInfoFromStorage.hasConsented;
  persistedState.auth.isAdmin = userInfoFromStorage.isAdmin;
  persistedState.auth.hasDeleteAccess =
    userInfoFromStorage.hasDeleteAccess || false;
  persistedState.auth.token = userInfoFromStorage.token;
  persistedState.auth.factorOne = userInfoFromStorage.factorOne;
  persistedState.auth.factorTwo = userInfoFromStorage.factorTwo;
  persistedState.auth.factorThree = userInfoFromStorage.factorThree;
  persistedState.auth.status = {
    ...persistedState.auth.status,
    loginPending: false,
    loginSuccess: true,
  };
  persistedState.form.cardName = userInfoFromStorage.cardName || '';
  persistedState.form.applicationSubmitted =
    userInfoFromStorage.applicationSubmitted || false;
  persistedState.form.sessionReviewSubmitted =
    userInfoFromStorage.sessionReviewSubmitted || false;
  persistedState.form.surveyCode = userInfoFromStorage.surveyCode || '';
  persistedState.quiz.completed = userInfoFromStorage.quizCompleted || false;
}

const loggerOptions = {
  collapsed: true,
  timestamp: false,
};

const logger = createLogger(loggerOptions);

// Only enable logger for dev env
let middleware;
if (process.env.NODE_ENV === 'development') {
  middleware = applyMiddleware(sagas, logger);
} else {
  middleware = applyMiddleware(sagas);
}

const store = createStore(reducers, persistedState, middleware);

runSagas();

export default store;
