import React from 'react';

import { mount } from 'enzyme';
import { Sidebar } from './sidebar';

function getComponent(initialState={}) {
    return mount(<Sidebar store={mockStore(initialState)}/>);
}

describe('<Sidebar/>', () => {

    it('should show user menu', () => {
        var isGranted = jest.fn();
        isGranted.mockReturnValue(false);
        var initialState = {
            me: {
                isGranted
            }
        };
        var wrapper = getComponent(initialState);

        expect(isGranted).toBeCalledWith('ROLE_ADMIN');
        expect(wrapper.text()).toContain('Main Navigation');
        expect(wrapper.find('#sidebarAdminMenu').length).toBe(0);
    });

    it('should show admin menu', () => {
        var isGranted = jest.fn();
        isGranted.mockReturnValue(true);
        var initialState = {
            me: {
                isGranted
            }
        };
        var wrapper = getComponent(initialState);

        expect(isGranted).toBeCalledWith('ROLE_ADMIN');
        expect(wrapper.text()).toContain('Admin Menu');
        expect(wrapper.find('#sidebarAdminMenu').length).toBe(1);
    });
});