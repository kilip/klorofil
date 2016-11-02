export const SEARCH_START       = 'users.search.start';
export const SEARCH_CANCEL      = 'users.search.cancel';
export const SEARCH_RESULT      = 'users.search.result';
export const SEARCH_ERROR       = 'users.search.error';

import Pager from '../util/pager';

const initialState = {
    pager: new Pager({
        baseUrl: '/api/users'
    })
};
export function userCollection(state=initialState,action){
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