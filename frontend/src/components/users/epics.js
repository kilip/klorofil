import { Observable } from 'rxjs/Observable';
import * as userActions from './actions';
import axios from 'axios';
import {receiveUsers} from './actions';

export function searchUsers(action$){
    return action$.ofType(userActions.SEARCH_START)
        .map(action => action.payload.page)
        .filter(page => !!page)
        .switchMap(page =>
            Observable
                .fromPromise(axios.get('/users?page='+page))
                .map(receiveUsers)
        )
    ;
}
