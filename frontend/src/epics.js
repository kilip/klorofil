import {combineEpics} from 'redux-observable';
import {searchUsers} from './components/users/epics';
import { login } from './components/auth/epics';

export default combineEpics(
    login,
    searchUsers
);
