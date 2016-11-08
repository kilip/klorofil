import * as authAction from './actions';
import AuthUser from './user';
import config from '../../config';

export default (state = new AuthUser(), action = []) => {
    switch(action.type){
        case authAction.LOGIN_START:{
            state.authenticated = false;
            state.authenticating = true;
            return state;
        }
        case authAction.LOGIN_RESULT: {
            const user = new AuthUser();
            user.setToken(action.token);
            user.authenticated = true;
            user.authenticating = false;
            config.token = action.token;
            return user;
        }
        case authAction.LOGIN_ERROR: {
            state.authenticated = false;
            state.authenticating =false;
            state.error = action.response.errors._error;
            return state;
        }
        case authAction.LOGOUT:{
            state.storeToken(null);
            return new AuthUser();
        }
        default:{
            return state;
        }
    }
}