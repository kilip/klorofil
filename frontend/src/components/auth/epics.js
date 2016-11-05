import { ajax } from 'rxjs/observable/dom/ajax';
import { LOGIN_START, LOGIN_CANCEL, LOGIN_ERROR, LOGIN_RESULT } from './actions';

export function authEpic(action$){
    return action$.ofType(LOGIN_START)
        .debounceTime(500)
        .switchMap(action =>
            ajax.post(process.env.REACT_APP_API_URI+'/api/token',action.payload.credentials,{'Cache-Control': 'no-cache'})
                .map(
                    payload => ({
                        type: LOGIN_RESULT,
                        token: payload.response.token,
                        payload
                    })
                )
                .takeUntil(action$.ofType(LOGIN_CANCEL))
                .catch(payload =>[{
                    type: LOGIN_ERROR,
                    error: true,
                    payload,
                    response: payload.xhr.response
                }])
        )
    ;
}