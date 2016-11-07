import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import ListUser,{ ListUser as ListUserClass } from './list';
import Pager from '../../components/util/pager';
function getComponent(props={}){
    var component = <ListUserClass {...props}/>;
    return mount(component);
}

describe('<ListUser/>', () => {

    let props = {};
    let response = {"page":3,"limit":5,"pages":101,"total":501,"_links":{"self":{"href":"\/api\/users?page=3&limit=5"},"first":{"href":"\/api\/users?page=1&limit=5"},"last":{"href":"\/api\/users?page=101&limit=5"},"next":{"href":"\/api\/users?page=4&limit=5"},"previous":{"href":"\/api\/users?page=2&limit=5"}},"_embedded":{"items":[{"username":"desiree79","email":"drath@kuphal.com","roles":[],"fullname":"Alfredo Streich III","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/male-2.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/desiree79"}}},{"username":"runolfsson.imogene","email":"rudolph31@yahoo.com","roles":[],"fullname":"Althea Boyer","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-2.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/runolfsson.imogene"}}},{"username":"theodora.heaney","email":"wmurazik@gmail.com","roles":[],"fullname":"Amanda Feest","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-3.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/theodora.heaney"}}},{"username":"berneice13","email":"fbrakus@weber.com","roles":[],"fullname":"Amanda Schoen DVM","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-3.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/berneice13"}}},{"username":"brenden22","email":"tbarton@roob.com","roles":[],"fullname":"Anais Pacocha","avatar":"http:\/\/localhost:8000\/bundles\/user\/images\/female-2.png","_links":{"self":{"href":"http:\/\/localhost:8000\/api\/users\/brenden22"}}}]}};
    let pager;
    let searchUsers = jest.fn();

    beforeEach( () => {
        pager = new Pager();
        pager.fromResponse(response);
        pager.loaded = true;
        props = {
            pager: pager,
            data: pager.data,
            loading: pager.loading,
            searchUsers: searchUsers
        };
    });

    it('should rendered properly', () => {
        const state = {
            users: {
                ...props
            }
        };
        const component = (
            <Provider store={mockStore(state)}>
                <ListUser/>
            </Provider>
        );
        const wrapper = mount(component);

        var testUser = pager.data[0];
        var html = wrapper.html();
        expect(html).toContain(testUser.username);
        expect(html).toContain(testUser.fullname);
        expect(html).toContain(testUser.email);
    });

    it('should handle refresh data button click', () => {
        const wrapper = getComponent(props);
        var btnRefresh = wrapper.find('#btnRefreshUser');
        expect(btnRefresh.length).toBe(1);
        btnRefresh.simulate('click');
        expect(searchUsers).toBeCalledWith({ url: pager.links.self });
    });

    it('should hide pager toolbar when it doesn\'t have to paginate', () => {
        pager.total = 1;
        pager.limit = 5;
        const wrapper = getComponent(props);
        expect(wrapper.html()).not.toContain('btnPager');
    });

    it('should automatically fetch data when component mounted', () => {
        pager.links.self = undefined;
        pager.loaded = false;

        const wrapper = getComponent(props);
        expect(searchUsers).toBeCalledWith({url: pager.fetchDataUrl()});
    });

});