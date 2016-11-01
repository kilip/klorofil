import {combineEpics} from 'redux-observable';
import { authEpic } from './components/auth/epics';

export default combineEpics(
    authEpic
);