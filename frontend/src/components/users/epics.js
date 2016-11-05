import { ajax } from 'rxjs/observable/dom/ajax';
import * as userActions from './actions';
import { checkAjaxUnauthorized } from '../auth/actions';

function getSearchUserSetting(action,store){
    var data = action.payload;
    var token = store.getState().me.token;

    return {
        method: 'GET',
        url: process.env.REACT_APP_API_URI+data.url,
        headers: {
            'Authorization': 'Bearer '+token
        },
        responseType: 'json'
    };
}
export function searchUsers(action$,store){
    return action$.ofType(userActions.SEARCH_START)
        //.debounceTime(500)
        .switchMap(action =>
                ajax(getSearchUserSetting(action,store))
                .map(
                    payload => ({
                        type: userActions.SEARCH_RESULT,
                        response: payload.response,
                        payload
                    })
                )
                .takeUntil(action$.ofType(userActions.SEARCH_CANCEL))
                .catch(payload => [
                    {
                        type: userActions.SEARCH_ERROR,
                        error: true,
                        payload
                    },
                    checkAjaxUnauthorized(payload,store)
                ])
        )
    ;
}