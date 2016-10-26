import React from 'react';
import { Route,IndexRoute } from 'react-router';
import requireAuth  from './components/auth/require-auth';

import Dashboard from './views/Dashboard';
import Homepage from './views/Homepage';
import Login from './views/Login';
import ListUser from './views/ListUsers';

export default (
    <Route path="/" component={Dashboard}>
        <IndexRoute component={requireAuth(Homepage,['ROLE_USER'])}/>
        <Route path="login" component={Login} />
        <Route path="users" component={requireAuth(ListUser,['ROLE_ADMIN'])}/>
    </Route>
);