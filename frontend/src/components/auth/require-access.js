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
    predicate: me => !me.isTokenExpired(),
    redirectAction: routerActions.push,
    failureRedirectPath: '/login',
    wrapperDisplayName: 'UserIsAuthenticated'
});

export const isNotAuthenticated = UserAuthWrapper({
    authSelector: (state) => state.me,
    predicate: me => !me.authenticated,
    redirectAction: routerActions.push,
    failureRedirectPath: '/',
    wrapperDisplayName: 'UserIsNotAuthenticated'
});

export const isUserAdmin = isGranted('ROLE_ADMIN');

export const isSuperAdmin = isGranted('ROLE_SUPER_ADMIN');