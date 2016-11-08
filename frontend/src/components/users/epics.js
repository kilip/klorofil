import { ajax } from 'rxjs/observable/dom/ajax';
import { SEARCH_START, SEARCH_CANCEL, searchError, searchResult} from './actions';

function getSearchUserSetting(store){
    var token = store.getState().me.token;
    return {'Authorization': 'Bearer '+token}
}
export function searchUserEpic(action$, store){
    return action$.ofType(SEARCH_START)
        .switchMap(action =>
            ajax({url: action.payload.url, headers: getSearchUserSetting(store)})
                .map((payload) => searchResult(payload))
                .takeUntil(action$.ofType(SEARCH_CANCEL))
                .catch(
                    (payload) =>[searchError(payload)]
                )
        )
    ;
}