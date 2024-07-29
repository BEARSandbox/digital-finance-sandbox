import { combineReducers } from 'redux';
import auth from './auth/reducer';
import metrics from './metrics/reducer';
import form from './form/reducer';
import quiz from './quiz/reducer';
import userData from './userData/reducer';

const reducers = combineReducers({ auth, metrics, form, quiz, userData });

export default reducers;
