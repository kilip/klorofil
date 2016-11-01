import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Dashboard from './views/Dashboard';
import Homepage from './views/Homepage';
import Login from './views/Login';
import Unauthorized from './views/Unauthorized';

import ListUser from './views/user/list';
import { isAuthenticated,isUserAdmin } from './components/auth/require-access';

export default(
    <Route path="/" component={Dashboard}>
        <IndexRoute component={isAuthenticated(Homepage)} />
        <Route path="login" component={Login}/>

        <Route path="users" component={isAuthenticated(isUserAdmin(ListUser,'ROLE_ADMIN'))}/>
        <Route path="unauthorized" components={Unauthorized}/>
    </Route>
);