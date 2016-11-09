import React from 'react';
import { mount } from 'enzyme';
import { NavMain } from './nav-main';

const store = mockStore();
var mockLogout = jest.fn();
const wrapper = mount(<NavMain store={store} logout={mockLogout()}/>);

describe('<NavMain/>', () => {

    it('should rendered properly', () => {
        expect(wrapper.find('header.main-header').length).toBe(1);
    });

    it('should add sidebar-collapse class', () => {
        const sidebarToggler = wrapper.find('.sidebar-toggle');
        const body = document.body;

        body.clientWidth = 600;
        expect(body.classList.contains('sidebar-open')).toBeFalsy();
        sidebarToggler.simulate('click',Proxy);
        expect(body.classList.contains('sidebar-open')).toBeTruthy();


        body.clientWidth = 800;
        expect(body.classList.contains('sidebar-collapse')).toBeFalsy();
        sidebarToggler.simulate('click',Proxy);
        expect(body.classList.contains('sidebar-collapse')).toBeTruthy();
    });

    it('should remove sidebar-collapse class', () => {
        const sidebarToggler = wrapper.find('.sidebar-toggle');
        const body = document.body;
        body.className = '';

        body.clientWidth = 600;
        body.className += ' sidebar-open';
        expect(body.classList.contains('sidebar-open')).toBeTruthy();
        sidebarToggler.simulate('click');
        expect(body.classList.contains('sidebar-open')).toBeFalsy();

        body.clientWidth = 800;
        body.className += ' sidebar-collapse';
        expect(body.classList.contains('sidebar-collapse')).toBeTruthy();
        sidebarToggler.simulate('click');
        expect(body.classList.contains('sidebar-collapse')).toBeFalsy();


    });

    it('should handle user logout', () => {
        const logout = wrapper.find('#logout-link');
        expect(logout.length).toBe(1);

        logout.simulate('click');
        //applyToAll(mockLogout);
        expect(mockLogout).toHaveBeenCalled();
    });
});