import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { SEARCH_START, SEARCH_RESULT, SEARCH_CANCEL, searchError} from './actions';
import { checkAjaxUnauthorized } from '../auth/actions';

function getSearchUserSetting(action,store){
    var data = action.payload;
    var token = store.getState().me.token;
    return {'Authorization': 'Bearer '+token}
}
export function searchUserEpic(action$, store){
    return action$.ofType(SEARCH_START)
        .switchMap(action =>
            ajax.getJSON(action.payload.url,getSearchUserSetting(action,store))
                .map(
                    payload => ({
                        type: SEARCH_RESULT,
                        response: payload.response,
                        payload
                    })
                )
                .takeUntil(action$.ofType(SEARCH_CANCEL))
                .catch(
                    payload =>[searchError(payload)]
                )
        )
    ;
}