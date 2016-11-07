import React from 'react';
import * as types from './flash-message';
import reducer from './flash-message';

describe('Flash Messages', () => {
    let type, message, expectedAction, result;

    beforeEach(() => {
        type = 'info';
        message = 'message';
        result = null;
    });

    context('ACTIONS', () => {
        it('should create an action to add a flash message', () => {
            message = 'Hello World';
            type = 'info';
            expectedAction = {
                type: types.ADD,
                payload: {
                    type: type,
                    text: message
                }
            };
            expect(types.addFlashMessage(type,message)).toEqual(expectedAction);
        });

        it('should create an action to remove a flash message', () => {
            const id = 'someid';
            expectedAction = {
                type: types.REMOVE,
                payload: {
                    id
                }
            };
            expect(types.removeFlashMessage(id)).toEqual(expectedAction);
        });
    });

    context('REDUCERS', () => {
        it('should return the initital state', () => {
            expect(reducer()).toEqual([]);
        });

        it('should handle ADD action', () => {
            result = reducer([],{
                type: types.ADD,
                payload: {
                    type: type,
                    text: message
                }
            });
            expect(result.length).toBe(1);
            expect(result[0].id).toBeDefined();
            expect(result[0].text).toEqual(message);
            expect(result[0].type).toEqual(type);
        });

        it('should handle REMOVE action', () => {
            const state = [
                {id: 'some-id', type: type, text: message}
            ];
            result = reducer(state,{
                type: types.REMOVE,
                payload: {
                    id: 'some-id',
                }
            });

            expect(result).toEqual([]);
        });

        it('should not REMOVE flash for non existent id', () => {
            const state = [
                {id: 'some-id', type: type, text: message}
            ];
            result = reducer(state,{
                type: types.REMOVE,
                payload: {
                    id: 'notid',
                }
            });

            expect(result).toEqual(result);
        });
    });
});