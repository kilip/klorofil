import * as authAction from './actions';
import AuthUser from './user';
import config from '../../config';

const initialState = new AuthUser();

export default (state = initialState, action = []) => {
    switch(action.type){
        case authAction.LOGIN_START:
            state.authenticated = false;
            state.authenticating = true;
            return state;
        case authAction.LOGIN_RESULT:
            const user = new AuthUser();
            user.setToken(action.token);
            user.authenticated = true;
            user.authenticating=false;
            config.token = action.token;
            return user;
        case authAction.LOGIN_ERROR:
            return {
                authenticated: false,
                user: {},
                error: action.response.errors._error
            };
        case authAction.LOGOUT:
            state.storeToken(null);
            return new AuthUser();
        default:
            return state;
    }
}