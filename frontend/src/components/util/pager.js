import _ from 'lodash';

export default class Pager {
    constructor(){
        this.page = 1;
        this.limit = 10;
        this.pages = 0;
        this.total = 0;
        this.links = {};
        this.data = [];
        this.loaded = false;
        this.loading = false;
    }

    fromResponse(response){
        this.data = response._embedded.items;

        var links = {};
        _.forEach(response._links,function(value,key){
            links[key] = value.href;
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
}