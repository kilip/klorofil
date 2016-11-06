import React from 'react';
import Pager from './pager';

describe('Pager Utility', () => {

    let pager;
    let baseUrl;
    let response = {"page":3,"limit":5,"pages":101,"total":501,"_links":{"self":{"href":"\/api\/users?page=3&limit=5"},"first":{"href":"\/api\/users?page=1&limit=5"},"last":{"href":"\/api\/users?page=101&limit=5"},"next":{"href":"\/api\/users?page=4&limit=5"},"previous":{"href":"\/api\/users?page=2&limit=5"}},"_embedded":{"items":[{"username":"desiree79","email":"drath@kuphal.com","roles":[],"fullname":"Alfredo Streich III","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/male-2.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/desiree79"}}},{"username":"runolfsson.imogene","email":"rudolph31@yahoo.com","roles":[],"fullname":"Althea Boyer","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-2.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/runolfsson.imogene"}}},{"username":"theodora.heaney","email":"wmurazik@gmail.com","roles":[],"fullname":"Amanda Feest","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-3.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/theodora.heaney"}}},{"username":"berneice13","email":"fbrakus@weber.com","roles":[],"fullname":"Amanda Schoen DVM","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-3.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/berneice13"}}},{"username":"brenden22","email":"tbarton@roob.com","roles":[],"fullname":"Anais Pacocha","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-2.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/brenden22"}}}]}};

    beforeEach(()=>{
        pager = new Pager();
        baseUrl = config.apiBaseUrl;
    });

    it('haveToPaginate() returns true when total > this.limit', () => {

        pager.total = 100;
        pager.limit = 5;
        expect(pager.haveToPaginate()).toBeTruthy();

        pager.total = 10;
        pager.limit = 10;
        expect(pager.haveToPaginate()).toBeFalsy();

        pager.total = 4;
        pager.limit = 5;
        expect(pager.haveToPaginate()).toBeFalsy();
    });

    it('should initialize default value', () => {
        expect(pager.page).toBe(1);
        expect(pager.limit).toBe(5);
        expect(pager.total).toBe(1);
        expect(pager.pages).toBe(1);
        expect(pager.apiUrl).toBe('');

        expect(pager.loaded).toBeFalsy();
        expect(pager.loading).toBeFalsy();
    });

    it('should create fetch data url', () => {
        pager.apiUrl = '/api/users';
        var fetchDataUrl = pager.fetchDataUrl();
        expect(fetchDataUrl).toContain(baseUrl+'/api/users');
        expect(fetchDataUrl).toContain('limit=5');
        expect(fetchDataUrl).toContain('page=1');
    });

    it('should returns first data url', () => {
        pager.fromResponse(response);
        var url = pager.firstUrl();
        expect(url).toContain(baseUrl);
        expect(url).toContain('page=1');
    });

    it('should returns previous data url', () => {
        pager.fromResponse(response);

        pager.page = 1;
        expect(pager.previousUrl()).toContain(baseUrl);
        expect(pager.previousUrl()).toContain('page=1');

        pager.page = 3;
        expect(pager.previousUrl()).toContain('page=2');
    });

    it('should returns next data url', () => {
        pager.fromResponse(response);
        expect(pager.nextUrl()).toContain('page=4');

        pager.page = 101;
        expect(pager.nextUrl()).toContain('page=101');
    });

    it('should returns last data url', () => {
        pager.fromResponse(response);
        expect(pager.lastUrl()).toContain(baseUrl);
        expect(pager.lastUrl()).toContain('page=101');
    });

    it('should convert pager fanta response', () => {
        pager.fromResponse(response);

        expect(pager.page).toBe(3);
        expect(pager.limit).toBe(5);
        expect(pager.pages).toBe(101);
        expect(pager.total).toBe(501);

        expect(pager.nextUrl()).toContain(config.apiBaseUrl);
        expect(pager.nextUrl()).toContain('page=4');
    });

    it('should handle sort data', () => {
        pager.apiUrl = '/some/url';
        pager.addSort('fullname');
        pager.addSort('email', 'desc');

        var decoded = decodeURI(pager.fetchDataUrl());
        expect(decoded).toContain('sorts[fullname]=asc');
        expect(decoded).toContain('sorts[email]=desc');
    });
});
