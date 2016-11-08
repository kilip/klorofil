import { ajax } from 'rxjs/observable/dom/ajax';
import { LOGIN_START, LOGIN_CANCEL, LOGIN_ERROR, LOGIN_RESULT } from './actions';

export function authEpic(action$){
    const config = {
        url: process.env.REACT_APP_API_URI+'/api/token',
        headers: {'Cache-Control': 'no-cache'},
        method: 'POST',
        responseType: 'json'
    };
    return action$.ofType(LOGIN_START)
        .switchMap(action =>
            ajax({...config, body: action.payload.credentials})
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