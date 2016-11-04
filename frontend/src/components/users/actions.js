export const SEARCH_START       = 'users.search.start';
export const SEARCH_CANCEL      = 'users.search.cancel';
export const SEARCH_RESULT      = 'users.search.result';
export const SEARCH_ERROR       = 'users.search.error';

import Pager from '../util/pager';
import { LOGOUT } from '../auth/actions';

const initialState = {
    pager: new Pager()
};
export function userReducer(state=initialState,action){
    const pager = state.pager;
    switch(action.type){
        case SEARCH_START:
            pager.loading = true;
            pager.loaded = false;

            return {
                ...state,
                pager
            };
        case SEARCH_RESULT:
            const response = action.payload.response;
            pager.fromResponse(response);
            pager.loading = false;
            pager.loaded = true;
            return {
                ...state,
                pager
            };
        case LOGOUT:
            return { pager: new Pager()};
        default:
            return state;
    }
}

export function searchUsers(data){
    return {
        type: SEARCH_START,
        payload: data
    };
}