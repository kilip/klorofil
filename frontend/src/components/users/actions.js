export const SEARCH_START  = 'users.search.start';
export const SEARCH_END    = 'users.search.end';

import * as authAction from '../auth/actions';
export function searchUsers(page) {
    return {
        type: SEARCH_START,
        payload: {
            page
        }
    };
}

const initialState = {};

export function userList(state=initialState,action){
    switch(action.type){
        case SEARCH_START:
            return initialState;
        case SEARCH_END:
            return action.payload;
        case authAction.SET_CURRENT_USER:
            return initialState;
        default:
            return state;
    }
}

export function receiveUsers(res) {
    return {
        type: SEARCH_END,
        payload: {
            pager: res.data,
            users: res.data._embedded.items
        }
    };
}
