import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import { createStore,applyMiddleware,compose } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import jwtDecode from 'jwt-decode';
import { setAuthorizationToken,setCurrentUser } from  './components/auth/actions';

import routes from './routes';
import reducers from './reducers';

const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

if (localStorage.DemoAuthToken) {
    setAuthorizationToken(localStorage.DemoAuthToken);
    store.dispatch(setCurrentUser(jwtDecode(localStorage.DemoAuthToken)));
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);