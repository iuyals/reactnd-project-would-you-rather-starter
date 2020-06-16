import { combineReducers} from 'redux';

import questionsReducer from './questions';
import usersReducer from './users'
import loadingReducer from './loading'

export default combineReducers({
    questions:questionsReducer,
    users: usersReducer,
    loading:loadingReducer,
});

