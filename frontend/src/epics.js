import {combineEpics} from 'redux-observable';
import { loginEpic } from './components/auth/epics';
import { searchUserEpic } from './components/users/epics';

export default combineEpics(
    loginEpic,
    searchUserEpic
);