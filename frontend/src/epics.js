import {combineEpics} from 'redux-observable';
import { authEpic } from './components/auth/epics';
import { searchUserEpic } from './components/users/epics';

export default combineEpics(
    authEpic,
    searchUserEpic
);