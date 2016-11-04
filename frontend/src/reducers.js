import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import me from './components/auth/reducers';
import { userReducer as users } from './components/users/actions';
import flash from './components/util/flash-message';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    form: formReducer,
    flash,
    me,
    users
});