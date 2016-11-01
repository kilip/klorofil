import jwtDecode from 'jwt-decode';
import * as authActions from './actions';
import _ from 'lodash';

export default class AuthenticatedUser
{
    constructor(){
        this.isAuthenticated = false;
        this.isAuthenticating = false;
    }

    isTokenExpired(){
        const exp = this.exp;
        const now = parseInt(Date.now()/1000,0);
        return now >= exp;
    }

    isGranted(requiredRoles){
        if(!_.isArray(requiredRoles)){
            requiredRoles = [requiredRoles];
        }

        var roles = this.roles;
        for(var i=0;i<=roles.length;i++){
            var cRole = roles[i];
            if(requiredRoles.indexOf(cRole) >= 0 ){
                return true;
            }
        }
        return false;
    }

    setToken(token){
        const {username,roles,email,iat,exp} = jwtDecode(token);
        this.username = username;
        this.roles = roles;
        this.email = email;
        this.iat = iat;
        this.exp = exp;
        this.token = token;

        this.storeToken(token);
    }

    storeToken(token){
        localStorage.setItem(authActions.AUTH_TOKEN_STORAGE_KEY,token);
    }
}