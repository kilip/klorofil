import React from 'react';
import { mount } from 'enzyme';
import Login from './login';
import { Provider } from 'react-redux';

function getComponent(props ={},state = {}, context = {}){
    return mount(
        <Provider {...props} store={mockStore(state)}>
            <Login/>
        </Provider>, {context}
    );
}

describe('<Login/>', () => {
    var mockFn = jest.fn();
    var isGranted = new mockFn();
    const isTokenExpired = jest.fn();
    var mcLogin = new mockFn();
    var props = {
        login: mcLogin
    };

    const state = {
        flash: [],
        me: {
            authenticated: true,
            isGranted,
            isTokenExpired
        }
    };

    it('should rendered properly', () => {
        const wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('Hello');
    });

    it('should handle login properly', () => {
        const wrapper = getComponent(props,state);
        const btnLogin = wrapper.find('#login-form');
        expect(btnLogin.length).toBe(1);
        btnLogin.simulate('submit');
        expect(mockFn).toBeCalled();
    });
});