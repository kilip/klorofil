import React from 'react';
import { userReducer, searchUsers, searchError, searchResult } from './actions';
import { LOGOUT } from '../auth/actions';

import * as types from './actions';
import Pager from '../util/pager';

describe('User Actions/Reducers', () => {
    let action, payload, state;
    let response = {"page":3,"limit":5,"pages":101,"total":501,"_links":{"self":{"href":"\/api\/users?page=3&limit=5"},"first":{"href":"\/api\/users?page=1&limit=5"},"last":{"href":"\/api\/users?page=101&limit=5"},"next":{"href":"\/api\/users?page=4&limit=5"},"previous":{"href":"\/api\/users?page=2&limit=5"}},"_embedded":{"items":[{"username":"desiree79","email":"drath@kuphal.com","roles":[],"fullname":"Alfredo Streich III","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/male-2.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/desiree79"}}},{"username":"runolfsson.imogene","email":"rudolph31@yahoo.com","roles":[],"fullname":"Althea Boyer","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-2.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/runolfsson.imogene"}}},{"username":"theodora.heaney","email":"wmurazik@gmail.com","roles":[],"fullname":"Amanda Feest","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-3.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/theodora.heaney"}}},{"username":"berneice13","email":"fbrakus@weber.com","roles":[],"fullname":"Amanda Schoen DVM","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-3.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/berneice13"}}},{"username":"brenden22","email":"tbarton@roob.com","roles":[],"fullname":"Anais Pacocha","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-2.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/brenden22"}}}]}};
    context('ACTIONS',() => {
        it('should create SEARCH_START actions properly', () => {
            action = searchUsers({url: 'some'});
            expect(action.type).toBe(types.SEARCH_START);
            expect(action.payload.url).toBe('some');
        });

        it('should create SEARCH_RESULT actions properly', () => {
            payload = { xhr: {response: 'some-response'}};
            action = searchResult(payload);
            expect(action.type).toBe(types.SEARCH_RESULT);
            expect(action.response).toBe(payload.xhr.response);
        });

        it('should create SEARCH_ERROR actions properly', () => {
            payload = {error: 'some errorr'};
            action = searchError(payload);

            expect(action.type).toBe(types.SEARCH_ERROR);
            expect(action.payload).toBe(payload);
        });
    });

    context('REDUCERS', () => {
        beforeEach( () => {
            state = { pager: new Pager()};
        });
        it('should handle return the initial state properly', () => {
            state = userReducer();
            expect(state.pager.loading).toBe(false);
            expect(state.pager.loaded).toBe(false);
            expect(state.pager.data).toEqual([]);
        });

        it('should handle SEARCH_START action', () => {
            const data = {url: 'someurl'};
            action = searchUsers(data);
            state = userReducer(state,action);

            expect(state.pager.loading).toBeTruthy();
            expect(state.pager.loaded).toBeFalsy();
        });

        it('should handle SEARCH_RESULT action', () => {
            payload = {
                xhr: {response},
            };
            action = searchResult(payload);
            state = userReducer(state,action);
            const user = state.pager.data[0];
            expect(state.pager.loading).toBeFalsy();
            expect(state.pager.loaded).toBeTruthy();
            expect(user.fullname).toBe('Alfredo Streich III');
        });

        it('should handle SEARCH_ERROR action', () => {
            payload = {'foo':'bar'};
            action = searchError(payload);
            state = userReducer(state,action);

            expect(state.error).toBeTruthy();
            expect(state.payload).toBe(payload);
        });

        it('should clear pager data in LOGOUT action', () => {
            payload = {
                xhr: {response},
            };
            action = searchResult(payload);
            state = userReducer(state,action);

            state = userReducer(state,{type: LOGOUT});

            expect(state.pager.loaded).toBeFalsy();
            expect(state.pager.data).toEqual([]);
        });
    });
});