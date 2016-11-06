import _ from 'lodash';
import config from '../../config';

export default class Pager {

    constructor(){
        this.page    = 1;
        this.limit   = 5;
        this.pages   = 1;
        this.total   = 1;
        this.links   = {};
        this.data    = [];
        this.loaded  = false;
        this.loading = false;
        this.apiUrl  = '';
        this.sorts   = {};
    }

    fromResponse(response){
        this.data = response._embedded.items;

        var links = {};
        _.forEach(response._links,function(value,key){
            links[key] = config.apiBaseUrl + '/' + _.trim(value.href,'/');
        });
        this.links = links;
        this.pages = response.pages;
        this.page = response.page;
        this.total = response.total;
        this.limit = response.limit;
    }

    haveToPaginate(){
        return this.total > this.limit;
    }

    addSort(field, sort='asc'){
        this.sorts[field] = sort;
    }

    fetchDataUrl(){
        var data = {
            limit: this.limit,
            page: this.page
        };
        var sorts = this.sorts;
        _.forEach(sorts,function (value,key) {
            data['sorts['+key+']'] = value;
        });

        var refs = [];
        _.forEach(data,function(value,key){
            refs.push(key + '=' + value);
        });

        var url = config.apiBaseUrl + '/' + _.trim(this.apiUrl,'/') + '?' +refs.join('&');
        url = encodeURI(url);
        return url;
    }

    firstUrl(){
        return this.links.first;
    }

    previousUrl(){
        if(this.page === 1){
            return this.firstUrl();
        }else{
            return this.links.previous;
        }
    }

    nextUrl(){
        if(this.page === this.pages){
            return this.lastUrl();
        }else{
            return this.links.next;
        }
    }

    lastUrl(){
        return this.links.last;
    }
}