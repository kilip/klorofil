import { SET_CURRENT_USER } from '../../common/types';
import isEmpty from 'lodash/isEmpty';
import AuthenticatedUser from './AuthenticatedUser';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            var authUser = new AuthenticatedUser(action.user);
            return {
                isAuthenticated: !isEmpty(action.user),
                user: authUser
            };
        default: return state;
    }
}