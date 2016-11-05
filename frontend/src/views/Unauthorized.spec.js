import React from 'react';
import Unauthorized from './Unauthorized';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

describe('<Unauthorized/>', () => {

    it('should rendered properly', () => {
        const isGranted = jest.fn();
        const state = {
            flash: [],
            me: {
                isGranted
            }
        };
        const wrapper = mount(
            <Provider store={mockStore(state)}>
                <Unauthorized store={mockStore()}/>
            </Provider>
        );
        expect(wrapper.text()).toContain('Unauthorized');
    });

});
