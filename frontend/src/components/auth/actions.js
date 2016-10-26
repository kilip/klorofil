import axios from 'axios';

import { SET_CURRENT_USER } from '../../common/types';
import jwtDecode from 'jwt-decode';

const $axios = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 5000
});

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('DemoAuthToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function login(data) {
    return dispatch => {
        return $axios.post('/token', data).then(res => {
            const token = res.data.token;
            localStorage.setItem('DemoAuthToken', token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwtDecode(token)));
        });
    }
}

export function setAuthorizationToken(token) {
    if (token) {
        $axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}