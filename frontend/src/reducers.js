import { combineReducers } from 'redux';
import flashMessages from './reducers/flash-messages';
import auth from './components/auth/auth-reducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    form: formReducer,
    flashMessages,
    auth
});