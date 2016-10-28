import _ from 'lodash';
import axios from 'axios';

export function listUsers(){
    return dispatch => {
        return axios.get('/users');
    }
}