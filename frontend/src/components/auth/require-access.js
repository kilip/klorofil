import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';

export function isGranted(role){
    return UserAuthWrapper({
        authSelector: (state) => state.me,
        predicate: me => me.isGranted(role),
        failureRedirectPath: '/unauthorized',
        wrapperDisplayName: 'IsUserGranted'
    });
}

export const isAuthenticated = UserAuthWrapper({
    authSelector: (state) => state.me,
    predicate: me => me.isAuthenticated,
    redirectAction: routerActions.replace,
    failureRedirectPath: '/login',
    wrapperDisplayName: 'UserIsAuthenticated'
});

export const isUserAdmin = isGranted('ROLE_ADMIN');

export const isSuperAdmin = isGranted('ROLE_SUPER_ADMIN');