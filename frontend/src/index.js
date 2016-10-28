import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore} from 'react-router-redux';

import 'rxjs';

import {Provider} from 'react-redux';
//import jwtDecode from 'jwt-decode';
//import { setAuthorizationToken,setCurrentUser } from  './components/auth/old/actions.old';
import routes from './routes';

import axios from 'axios';
import store from './store';

const history = syncHistoryWithStore(browserHistory,store);
axios.defaults.baseURL = 'http://localhost:8000/api';

import {setAuthToken,setCurrentUser} from './components/auth/actions';
import jwtDecode from 'jwt-decode';
if (localStorage.DemoAuthToken) {
    setAuthToken(localStorage.DemoAuthToken);
    store.dispatch(setCurrentUser(jwtDecode(localStorage.DemoAuthToken)));
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
);