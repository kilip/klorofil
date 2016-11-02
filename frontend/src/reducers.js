import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import me from './components/auth/reducers';
import { userCollection as users } from './components/users/actions';

import {routerReducer} from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    form: formReducer,
    me,
    users
});