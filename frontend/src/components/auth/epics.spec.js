import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { authEpic }  from './epics';
import * as types from './actions';
import sinon from 'sinon';

const epicMiddleware = createEpicMiddleware(authEpic);
const lcStore = configureMockStore(
    [epicMiddleware]
);

describe('Auth Epics', () => {
    let username, password;
    let store,xhr,requests, content, actions;

    beforeEach(() => {
        const state = {
            me: {
                token: 'some-token'
            }
        };
        content = '{"page":1,"limit":5,"pages":101,"total":501,"_links":{"self":{"href":"\/api\/users?sorts%5Bfullname%5D=ASC&page=1&limit=5"},"first":{"href":"\/api\/users?sorts%5Bfullname%5D=ASC&page=1&limit=5"},"last":{"href":"\/api\/users?sorts%5Bfullname%5D=ASC&page=101&limit=5"},"next":{"href":"\/api\/users?sorts%5Bfullname%5D=ASC&page=2&limit=5"}},"_embedded":{"items":[{"username":"alexandrine.powlowski","email":"feil.laurie@ziemann.info","roles":[],"fullname":"Abbey Nader","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-3.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/alexandrine.powlowski"}}},{"username":"udietrich","email":"iva.franecki@hotmail.com","roles":[],"fullname":"Abby Hyatt","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-2.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/udietrich"}}},{"username":"langworth.destinee","email":"jstrosin@mills.com","roles":[],"fullname":"Abdul Hintz","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/male-2.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/langworth.destinee"}}},{"username":"jgrant","email":"dmoen@hansen.com","roles":[],"fullname":"Adele Franecki DDS","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-2.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/jgrant"}}},{"username":"ynolan","email":"lcasper@gmail.com","roles":[],"fullname":"Adolph Jacobson","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/male-1.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/ynolan"}}}]}}';
        store = lcStore(state);
        requests = [];
        xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = function(req){
            requests.push(req);
        };
        username = "admin";
        password = "admin";
    });

    afterEach(() => {
        epicMiddleware.replaceEpic(authEpic);
        xhr.restore();
    });

    context('loginEpic', () => {
        it('should handle 401 error type', () => {
            const payload = {data: {username, password}};
            store.dispatch({
                type: types.LOGIN_START,
                payload
            });
            requests[0].respond(
                401,
                {'Content-Type': 'application/json'},
                '{"errors":{"_error":"Either your username or password is invalid."}}'
            );
            actions = store.getActions();
            expect(actions[0]).toEqual(
                {type: types.LOGIN_START, payload}
            );
            expect(actions[1].type).toContain(types.LOGIN_ERROR);
        });
    });
});