import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { searchUserEpic } from './epics';
import * as types from './actions';
import sinon from 'sinon';

const epicMiddleware = createEpicMiddleware(searchUserEpic);
const lcStore = configureMockStore(
    [epicMiddleware]
);

describe('User Epics', () => {
    let actions,store,xhr,requests, content;
    beforeEach(() => {
        const state = {
            me: {
                token: 'some-token'
            }
        };
        content = '{response: {"page":1,"limit":5,"pages":101,"total":501,"_links":{"self":{"href":"\/api\/users?sorts%5Bfullname%5D=ASC&page=1&limit=5"},"first":{"href":"\/api\/users?sorts%5Bfullname%5D=ASC&page=1&limit=5"},"last":{"href":"\/api\/users?sorts%5Bfullname%5D=ASC&page=101&limit=5"},"next":{"href":"\/api\/users?sorts%5Bfullname%5D=ASC&page=2&limit=5"}},"_embedded":{"items":[{"username":"alexandrine.powlowski","email":"feil.laurie@ziemann.info","roles":[],"fullname":"Abbey Nader","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-3.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/alexandrine.powlowski"}}},{"username":"udietrich","email":"iva.franecki@hotmail.com","roles":[],"fullname":"Abby Hyatt","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-2.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/udietrich"}}},{"username":"langworth.destinee","email":"jstrosin@mills.com","roles":[],"fullname":"Abdul Hintz","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/male-2.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/langworth.destinee"}}},{"username":"jgrant","email":"dmoen@hansen.com","roles":[],"fullname":"Adele Franecki DDS","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-2.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/jgrant"}}},{"username":"ynolan","email":"lcasper@gmail.com","roles":[],"fullname":"Adolph Jacobson","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/male-1.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/ynolan"}}}]}}}';
        store = lcStore(state);
        requests = [];
        xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = function(req){
            requests.push(req);
        };
    });

    afterEach(() => {
        epicMiddleware.replaceEpic(searchUserEpic);
    });

    context('searchUserEpic', () => {

        it('should fetch users data', () => {
            store.dispatch({
                type: types.SEARCH_START,
                payload: {
                    url: '/api/users'
                }
            });

            requests[0].respond(200, {
                    'Content-Type': 'application/json'
                },
                '{"response":"data"}'
            );
            actions = store.getActions();
            expect(actions[0].type).toEqual(types.SEARCH_START);
            expect(actions[1].type).toEqual(types.SEARCH_RESULT);
        });

        /* TODO: provide validate error actions */
        it('should handle error type results', () => {
            store.dispatch({
                type: types.SEARCH_START,
                payload: {
                    url: '/api/users'
                }
            });
            requests[0].respond(
                401,
                {'Content-Type': 'application/json'},
                '{"errors":{"_error":"Your Token is expired"}}'
            );

            const request = requests[0];

            expect(request.requestHeaders.Authorization).toBe('Bearer some-token');
            expect(request.url).toBe('/api/users');
            actions = store.getActions();
            expect(actions[0].type).toEqual(types.SEARCH_START);
            //expect(actions[1]).toEqual(types.SEARCH_START);
        });
    });

});