export const LOGIN_START = 'auth.login.start';
export const LOGIN_END = 'auth.login.end';
export const LOGIN_FAILED = 'auth.login.fail';
export const SET_CURRENT_USER = 'auth.set_current_user'
export const SET_TOKEN = 'auth.set_token';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export function logout(){
    localStorage.removeItem('DemoAuthToken');
    setAuthToken(false);
    return {
        type: SET_CURRENT_USER,
        payload: {
            user: {}
        }
    }
}

export function login(data){
    return {
        type: LOGIN_START,
        payload: {
            data: data
        }
    }
}

export function setAuthToken(token){
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        payload: {
            user: user
        }
    };
}

export function receivedToken(response){
    var token  = response.data.token;
    var user = jwtDecode(token);
    localStorage.setItem('DemoAuthToken',token);
    setAuthToken(token);
    return {
        type: SET_CURRENT_USER,
        payload: {
            token: token,
            user: user
        }
    }
}