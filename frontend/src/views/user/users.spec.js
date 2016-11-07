import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Users from './users';

const state = {
    flash: [],
    me: {
        isGranted: function(){return true;}
    }
};
const component = (
    <Provider store={mockStore(state)}>
        <Users/>
    </Provider>
); 
describe('<Users/>', () => {

    it('should rendered properly', () =>  {
        const wrapper = mount(component);

        const html = wrapper.html();
        expect(html).toContain('Manage User');
    });

});