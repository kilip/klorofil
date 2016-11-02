import { ajax } from 'rxjs/observable/dom/ajax';
import * as actions from './actions';

export function authEpic(action$){
    return action$.ofType(actions.LOGIN_START)
        .debounceTime(500)
        .switchMap(action =>
            ajax.post('http://localhost:8000/api/token',action.payload.credentials,{'Cache-Control': 'no-cache'})
                .map(
                    payload => ({
                        type: actions.LOGIN_RESULT,
                        token: payload.response.token,
                        redirect: action.payload.redirect,
                        payload
                    })
                )
                .takeUntil(action$.ofType(actions.LOGIN_CANCEL))
                .catch(payload =>[{
                    type: actions.LOGIN_ERROR,
                    error: true,
                    payload,
                    response: payload.xhr.response
                }])
        )
    ;
}