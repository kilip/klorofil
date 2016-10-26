import _ from 'lodash';

export default class AuthenticatedUser {

    constructor(userInfo){
        const {username,roles,email,iat,exp} = userInfo;
        this.username = username;
        this.roles = roles;
        this.iat = iat;
        this.exp = exp;
        this.email = email;
    }
    isGranted(requiredRoles){
        if(!_.isArray(requiredRoles)){
            requiredRoles = [requiredRoles];
        }
        var roles = this.roles;
        for(var i=0;i<=roles.length;i++){
            var cRole = roles[i];
            if(requiredRoles.indexOf(cRole) >=0){
                return true;
            }
        }
        return false;
    }
}