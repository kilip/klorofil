import { combineReducers } from 'redux';
import flashMessages from './reducers/flash-messages';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { userList} from './components/users/actions';
import auth from './components/auth/reducers';
export default combineReducers({
    form: formReducer,
    routing: routerReducer,
    flashMessages,
    userList,
    auth
});