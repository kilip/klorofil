import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import {browserHistory} from 'react-router';
import rootReducer from './reducers';
import rootEpic from './epics'

const epicMiddleWare = createEpicMiddleware(rootEpic);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            epicMiddleWare,
            routerMiddleware(browserHistory)
        )
    )
);

export default store;