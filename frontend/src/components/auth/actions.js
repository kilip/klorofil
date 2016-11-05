import store from '../../store';
export const AUTH_TOKEN_STORAGE_KEY = 'klorofil.auth.token';
export const LOGIN_START        = 'auth.login.start';
export const LOGIN_CANCEL       = 'auth.login.cancel';
export const LOGIN_RESULT       = 'auth.login.result';
export const LOGIN_ERROR        = 'auth.login.error';
export const LOGOUT             = 'auth.logout';

export function login(data,redirect){
    return {
        type: LOGIN_START,
        payload: {
            credentials: data,
            redirect: redirect
        }
    }
}

export function logout(){
    return {
        type: LOGOUT
    }
}

export function setAuthToken(token){
    return {
        type: LOGIN_RESULT,
        payload: {},
        token: token
    }
}

export function tokenExpired(){
    return {
        type: LOGOUT,
        payload: {}
    };
}

export function checkAjaxUnauthorized(payload){
    const auth = store.getState().me;
    if(payload.status === 401 && auth.isTokenExpired()){
        return tokenExpired();
    }
}