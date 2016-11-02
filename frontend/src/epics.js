import {combineEpics} from 'redux-observable';
import { authEpic } from './components/auth/epics';
import { searchUsers } from './components/users/epics';

export default combineEpics(
    authEpic,
    searchUsers
);