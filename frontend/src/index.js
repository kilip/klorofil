import React from 'react';
import ReactDOM from 'react-dom';
import 'rxjs';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';
import routes from './routes';
import * as authActions from './components/auth/actions';
const history = syncHistoryWithStore(hashHistory,store);

const token = localStorage.getItem(authActions.AUTH_TOKEN_STORAGE_KEY);
if(token){
    store.dispatch(authActions.setAuthToken(token));
}
ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>,
    document.getElementById('root')
);
