import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Login from './login';
import sinon from 'sinon';

function getComponent(props ={}, state){
    return mount(
        <Provider store={mockStore(state)}>
        <Login {...props}/>
        </Provider>
    );
}

describe('<Login/>', () => {

    let props, state;
    beforeEach(() => {
        props = {
        };
        state = {
            flash: [],
            me: {
                isGranted: () => { return true;}
            }
        };
    });
    it('should rendered properly', () => {
        const wrapper = getComponent(props,state);
        expect(wrapper.text()).toContain('Hello');
    });
});