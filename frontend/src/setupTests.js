import './config';
import 'rxjs';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { LOGIN_START } from './components/auth/actions';
import Dashboard from './views/Dashboard';
import rootEpic from './epics';
import { Route, Router, Provider } from 'react-router';

const epicMiddleware = createEpicMiddleware(rootEpic);
global.mockStore = configureMockStore([epicMiddleware]);

global.defaultState = {
    flash: [],
    me: {

    }
};