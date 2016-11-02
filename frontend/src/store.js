import { createStore,compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';

import rootEpic from './epics'
import reducers from './reducers';

const epicMiddleWare = createEpicMiddleware(rootEpic);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(
            epicMiddleWare,
            routerMiddleware(hashHistory)
        )
    )
);