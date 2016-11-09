import './config';
import 'rxjs';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { LOGIN_START } from './components/auth/actions';
import Dashboard from './views/dashboard';
import rootEpic from './epics';
import { Route, Router, Provider } from 'react-router';

const epicMiddleware = createEpicMiddleware(rootEpic);
global.mockStore = configureMockStore([epicMiddleware]);

global.defaultState = {
    flash: [],
    me: {

    }
};


class LocalStorageMock
{
    constructor(){
        this.store = {};
    }

    getItem(key) {
        return this.store[key];
    }

    setItem(key,value){
        this.store[key] = value.toString();
    }

    removeItem(key){
        delete this.store[key];
    }

    clear() {
        this.store = {};
    }
}

const localStorageMock = new LocalStorageMock();
Object.defineProperty(window,'localStorage',{value: localStorageMock});