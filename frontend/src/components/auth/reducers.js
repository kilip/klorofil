import isEmpty from 'lodash/isEmpty';
import AuthenticatedUser from './AuthenticatedUser';
import * as authActions from './actions'

const initialState = {
    isAuthenticated: false,
    errors: {},
    user: {}
};
export default (state = initialState, action = {}) => {
    switch(action.type) {
        case authActions.SET_CURRENT_USER:
            var authUser = new AuthenticatedUser(action.payload.user);
            return {
                isAuthenticated: !isEmpty(action.payload.user),
                user: authUser
            };
        case authActions.LOGIN_END:
            return action.payload.users;
        case authActions.LOGIN_START:
            return initialState;
        case authActions.LOGIN_FAILED:
            return {
                errors: action.payload.response.data.errors
            };
        default:
            return state;
    }
}