import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Dashboard from './views/dashboard';
import Homepage from './views/homepage';
import Login from './views/login';
import Unauthorized from './views/unauthorized';

import User from './views/user/users';
import ListUser from './views/user/list';
import { isAuthenticated,isUserAdmin, isNotAuthenticated } from './components/auth/require-access';

export default(
    <Route path="/" component={Dashboard}>
        <Route path="login" component={isNotAuthenticated(Login)}/>
        <IndexRoute component={isAuthenticated(Homepage)} />
        <Route path="unauthorized" components={Unauthorized}/>

        <Route path="users" component={isAuthenticated(isUserAdmin(User))}>
            <IndexRoute component={ListUser}/>
        </Route>
    </Route>
);