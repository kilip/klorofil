import React from 'react';
import { shallow,mount } from 'enzyme';
import Login from './Login';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

function getComponent(state = {}, mockFn = jest.fn()){
    var isGranted = new mockFn();
    var router = new mockFn();
    state = {
        flash: [],
        me: {
            isGranted
        }
    };
    return mount(
        <Provider store={mockStore(state)}>
            <Login/>
        </Provider>,
        {
            context: {
                router
            }
        }
    );
}

describe('<Login/>', () => {

    it('should rendered properly', () => {

        const wrapper = getComponent();

        expect(wrapper.text()).toContain('Hello');
    });
});