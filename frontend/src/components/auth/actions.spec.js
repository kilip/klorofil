import * as types from './actions';
import { login, logout, loginError, setAuthToken,tokenExpired,checkAjaxUnauthorized } from './actions';
import reducer from './reducers';
import AuthenticatedUser from './user';

describe('Auth ACTIONS/REDUCERS', () => {
    let action, token, credentials, state, authUser;

    beforeEach( () => {
        token = "eyJhbGciOiJSUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidHRsIjozNjAwLCJyb2xlcyI6WyJST0xFX1NVUEVSX0FETUlOIiwiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJlbWFpbCI6Im1lQGl0c3RvbmkuY29tIiwiZXhwIjoxNDc4NjU5MzI3LCJpYXQiOjE0Nzg2NTU3Mjd9.d4w6TnT_kIS2QQa4ZCqlkX1iCJOhGhfbwMxFLXBVdOs3F-SJ6IizNBcTvMg4LKQnKQ7hdPhKTXAhSfEC7cmrmXr38ggIQH93PBEGAwUVnbckpp0ysSJaIqS_0RWxH5pEQRyrkyCmKZWhZmZ11fqjNUILuj2ev8oQExP2vTTcOHZfYZg0w_aEQxjrDWY1v3GOlN1spPgHvxqdS5njnTGB_V6DXA-Pv2RtExAuz0jo3vf8JdIHqIQzSieeeAPHkoe7Ea-K88q1YrceHou5qLXt6Pl_QfXPv-UTg_FGo7wHKVdBfKB7_dWfasLVbk6RjxQFSDKBspignzYyJ2fKyQ6u2_ORKNLLTSPWLA212OdknHQyxtj1kuOeLV1pzEYMTnbNdXs9vKdtX4DwcV0nFZn3NWjUxpslqGSWKi7--t1z1vALT4jdK9REivxshT797ywBtfB2_CvW4vQu0F0NssgKHqr916SsI_W-zapKNYVvnfdr7Km318fNfy8-vW-K89F43Z-FPids_25jkvoXW1k_SgeSMU_Pu2AeADgD1HXkOO3yvfqCo4R2W7eaNCkHHDwU3gOPJyJesd-_PaNh-7fiU_uwPA7jM_groQxrg0iUQ7HEb7_WjuuXUlZooSZXqHkfqudR_gEJ19SJJz9NkM_5KXiPL-qQU-vYzetlWGNH3Vc";
        credentials = { username: 'admin', password: 'admin'};
        authUser = new AuthenticatedUser();
    });

    context('ACTIONS', () => {

        it('login() should create LOGIN_START action', () => {
            action = login(credentials);

            expect(action.type).toEqual(types.LOGIN_START);
            expect(action.payload.credentials).toEqual(credentials);
            expect(action.payload.redirect).toBeUndefined();
        });

        it('logout() should create LOGOUT action', () => {
            action = logout();
            expect(action.type).toBe(types.LOGOUT);
        });

        it('setAuthToken() should create LOGIN_RESULT action', () => {
            action = setAuthToken(token);
            expect(action.type).toBe(types.LOGIN_RESULT);
            expect(action.token).toBe(token);
        });


    });

    context('REDUCERS', () => {

        it('should return the initial state', () => {
            state = reducer();
            expect(state.authenticated).toBeFalsy();
            expect(state.authenticating).toBeFalsy();
        });

        it('should handle LOGIN_START action', () => {
            action = login(credentials);
            authUser.authenticated = true;
            state = reducer(authUser,action);
            expect(state.authenticated).toBeFalsy();
            expect(state.authenticating).toBeTruthy();
        });

        it('should handle LOGIN_RESULT action', () => {
            action  = setAuthToken(token);
            state = reducer(authUser,action);
            expect(state.authenticated).toBeTruthy();
            expect(state.authenticating).toBeFalsy();
            expect(state.username).toBe('admin');
            expect(state.iat).toBeDefined();
        });

        it('should handle LOGIN_ERROR action', () => {
            const payload  = { xhr: {response: { errors: {_error: 'some error'}}}};
            action = loginError(payload);
            state = reducer(authUser,action);
            expect(state.error).toBe('some error');
        });

        it('should handle LOGOUT action', () => {
            action = logout();
            state = reducer(authUser,action);
            expect(state.authenticated).toBeFalsy();
        });
    });
});