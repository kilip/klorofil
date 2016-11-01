import * as authAction from './actions';
import AuthUser from './user';
const initialState = new AuthUser();

export default (state = initialState, action = []) => {
    switch(action.type){
        case authAction.LOGIN_START:
            return Object.assign(new AuthUser(), state,{
                isAuthenticating: true,
                isAuthenticated: false
            });
        case authAction.LOGIN_RESULT:
            const user = new AuthUser();
            user.setToken(action.token);
            return Object.assign(user, state,{
                isAuthenticating: false,
                isAuthenticated: true,
            });
        case authAction.LOGIN_ERROR:
            return {
                isAuthenticated: false,
                user: {},
                error: action.response.errors._error
            };
        case authAction.LOGOUT:
            return {
                isAuthenticated: false,
                user: new AuthUser(),
            };
        default:
            return state;
    }
}