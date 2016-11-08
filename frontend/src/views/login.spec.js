import React from 'react';
import { mount } from 'enzyme';
import Login from './login';
import { Provider } from 'react-redux';

function getComponent(props ={},state = {}, context = {}){
    return mount(
        <Provider store={mockStore(state)}>
            <Login {...props} />
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
});