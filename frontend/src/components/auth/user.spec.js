import { AuthenticatedUser } from './user';
import { AUTH_TOKEN_STORAGE_KEY } from './actions';

describe('AuthenticatedUser class', () => {
    let user, token;

    beforeEach( () => {
        user = new AuthenticatedUser();
        token = "eyJhbGciOiJSUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidHRsIjozNjAwLCJyb2xlcyI6WyJST0xFX1NVUEVSX0FETUlOIiwiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJlbWFpbCI6Im1lQGl0c3RvbmkuY29tIiwiZXhwIjoxNDc4NjU5MzI3LCJpYXQiOjE0Nzg2NTU3Mjd9.d4w6TnT_kIS2QQa4ZCqlkX1iCJOhGhfbwMxFLXBVdOs3F-SJ6IizNBcTvMg4LKQnKQ7hdPhKTXAhSfEC7cmrmXr38ggIQH93PBEGAwUVnbckpp0ysSJaIqS_0RWxH5pEQRyrkyCmKZWhZmZ11fqjNUILuj2ev8oQExP2vTTcOHZfYZg0w_aEQxjrDWY1v3GOlN1spPgHvxqdS5njnTGB_V6DXA-Pv2RtExAuz0jo3vf8JdIHqIQzSieeeAPHkoe7Ea-K88q1YrceHou5qLXt6Pl_QfXPv-UTg_FGo7wHKVdBfKB7_dWfasLVbk6RjxQFSDKBspignzYyJ2fKyQ6u2_ORKNLLTSPWLA212OdknHQyxtj1kuOeLV1pzEYMTnbNdXs9vKdtX4DwcV0nFZn3NWjUxpslqGSWKi7--t1z1vALT4jdK9REivxshT797ywBtfB2_CvW4vQu0F0NssgKHqr916SsI_W-zapKNYVvnfdr7Km318fNfy8-vW-K89F43Z-FPids_25jkvoXW1k_SgeSMU_Pu2AeADgD1HXkOO3yvfqCo4R2W7eaNCkHHDwU3gOPJyJesd-_PaNh-7fiU_uwPA7jM_groQxrg0iUQ7HEb7_WjuuXUlZooSZXqHkfqudR_gEJ19SJJz9NkM_5KXiPL-qQU-vYzetlWGNH3Vc";
    });

    afterEach( () => {
        localStorage.clear();
    });

    const buildAuthenticatedUser = (roles=['ROLE_USER']) => {
        user.authenticated = true;
        user.iat = Math.round(Date.now()/1000);
        user.ttl = 3600;
        user.roles = roles;
    };

    it('should init default props', () => {
        expect(user.username).toBe('');
        expect(user.authenticated).toBeFalsy();
        expect(user.authenticating).toBeFalsy();
        expect(user.roles).toEqual([]);
    });

    it('isTokenExpired returns true when token user is not authenticated', () => {
        expect(user.isTokenExpired()).toBeTruthy();
    });

    it('isTokenExpired returns true when token is expired', () => {
        var yesterday = Math.round(new Date().getTime()/1000) - (24*3600);
        user.authenticated = true;
        user.ttl = 3600;
        user.iat = yesterday;
        expect(user.isTokenExpired()).toBeTruthy();
    });

    it('isTokenExpired returns false when token is valid', () => {
        user.authenticated = true;
        user.iat = Math.round(Date.now()/1000);
        user.ttl = 3600;
        expect(user.isTokenExpired()).toBeFalsy();
    });

    it('isGranted returns false when token expired', () => {
        expect(user.isGranted()).toBeFalsy();
    });

    it('isGranted should accept string parameter', () => {
        buildAuthenticatedUser();
        expect(user.isGranted('ROLE_USER')).toBeTruthy();
    });

    it('isGranted returns false when user role is invalid', () => {
        buildAuthenticatedUser();
        expect(user.isGranted(['ROLE_ADMIN'])).toBeFalsy();
    });

    it('setToken should import token into user properties', () => {
        user.setToken(token);
        expect(user.username).toBe('admin');
        expect(user.roles).toEqual(['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_USER']);
        expect(user.email).toEqual('me@itstoni.com');
        expect(user.iat).toBe(1478655727);
        expect(user.exp).toBe(1478659327);
        expect(user.ttl).toBe(3600);
        expect(user.token).toEqual(token);
        expect(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toEqual(token);
    });

    it('should remove token from local storage', () => {
        user.storeToken(null);

        expect(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toBeUndefined();
    });
});