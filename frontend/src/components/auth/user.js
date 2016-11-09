import jwtDecode from 'jwt-decode';
import * as authActions from './actions';
import _ from 'lodash';

export class AuthenticatedUser
{
    constructor(){
        this.authenticated = false;
        this.authenticating = false;
        this.error = "";
        this.roles = [];
        this.username = '';
        this.fullname = '';
        this.avatar = '';
    }

    isTokenExpired(){
        if(!this.authenticated){
            return true;
        }
        const iat = new Date(this.iat*1000);
        const exp = new Date(iat.getTime()+(1000*this.ttl));
        const now  = Date.now();
        return now >= exp;
    }

    isGranted(requiredRoles){
        if(this.isTokenExpired()){
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

export default AuthenticatedUser;