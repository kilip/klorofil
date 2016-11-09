import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { loginEpic }  from './epics';
import * as types from './actions';
import sinon from 'sinon';

const epicMiddleware = createEpicMiddleware(loginEpic);
const lcStore = configureMockStore(
    [epicMiddleware]
);

describe('Auth Epics', () => {
    let username, password;
    let store,xhr,requests, content, actions;
    let latestRequest;

    beforeEach(() => {
        const state = {
            me: {
                token: 'some-token'
            }
        };
        store = lcStore(state);
        requests = [];
        xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = function(req){
            requests.push(req);
            latestRequest = req;
        };
        username = "admin";
        password = "admin";
    });

    afterEach(() => {
        epicMiddleware.replaceEpic(loginEpic);
        xhr.restore();
    });

    const getLatestRequest = () => {
        return requests[requests.length-1];
    };

    it('should handle successfull login', () => {
        const payload = {data: {username, password}};
        store.dispatch({
            type: types.LOGIN_START,
            payload
        });
        latestRequest.respond(
            200,
            {'Content-Type':'application/json'},
            '{"token":"some-token"}'
        );
        actions = store.getActions();
        expect(actions[0].type).toBe(types.LOGIN_START);
        expect(actions[1].type).toBe(types.LOGIN_RESULT);
        expect(actions[1].token).toBe('some-token');
    });

    it('should handle 401 error type', () => {
        const payload = {data: {username, password}};
        requests = [];
        store.dispatch({
            type: types.LOGIN_START,
            payload
        });
        latestRequest.respond(
            401,
            {'Content-Type': 'application/json'},
            '{"errors":{"_error":"Either your username or password is invalid."}}'
        );

        actions = store.getActions();
        expect(actions[0].type).toBe(types.LOGIN_START);
        expect(actions[1].type).toBe(types.LOGIN_ERROR);
        expect(actions[1].error).toBeDefined();
    });

});