import jwtDecode from 'jwt-decode';
import * as authActions from './actions';
import _ from 'lodash';

export default class AuthenticatedUser
{
    constructor(){
        this.authenticated = false;
        this.authenticating = false;
    }

    isTokenExpired(){
        if(!this.authenticated){
            return true;
        }
        const iat = new Date(this.iat*1000);
        const exp = new Date(iat.getTime()+(1000*this.ttl));
        const now  = new Date();

        return now >= exp;
    }

    isGranted(requiredRoles){
        if(!this.authenticated){
            return false;
        }
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
        const {username,roles,email,iat,exp,ttl} = jwtDecode(token);
        this.username = username;
        this.roles = roles;
        this.email = email;
        this.iat = iat;
        this.exp = exp;
        this.ttl = ttl;
        this.token = token;
        this.storeToken(token);
    }

    storeToken(token){
        if(null===token){
            localStorage.removeItem(authActions.AUTH_TOKEN_STORAGE_KEY);
        }else{
            localStorage.setItem(authActions.AUTH_TOKEN_STORAGE_KEY,token);
        }
    }
}