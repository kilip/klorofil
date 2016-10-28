import { Observable } from 'rxjs/Observable';
import * as authActions from './actions';
import {receivedToken} from './actions';
import axios from 'axios';

export function login(action$){
    return action$.ofType(authActions.LOGIN_START)
        .map(action => action.payload.data)
        .switchMap(
            data =>
                Observable
                    .fromPromise(axios.post('/token',data))
                    .map(receivedToken.bind(data))
                    .catch(error => Observable.of({
                        type: authActions.LOGIN_FAILED,
                        payload: error,
                        error: true
                    }))

        )
    ;
}