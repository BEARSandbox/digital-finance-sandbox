import createSagaMiddleWare from 'redux-saga';

import authSaga from './auth/sagas';
import metricsSaga from './metrics/sagas';
import formSaga from './form/sagas';
import quizSaga from './quiz/sagas';
import userDataSaga from './userData/sagas';

const sagaMiddleWare = createSagaMiddleWare();

const runSagas = () => {
  sagaMiddleWare.run(authSaga);
  sagaMiddleWare.run(metricsSaga);
  sagaMiddleWare.run(formSaga);
  sagaMiddleWare.run(quizSaga);
  sagaMiddleWare.run(userDataSaga);
};

export { sagaMiddleWare as sagas, runSagas };
