import React from 'react';
import { mount } from 'enzyme';
import FlashMessageList from './flash-message-list';
import { Provider } from 'react-redux';

function getComponent(state,removeFlashMessage=jest.fn()){
    return mount(
        <Provider store={mockStore(state)}>
            <FlashMessageList removeFlashMessage={removeFlashMessage}/>
        </Provider>
    );
}

describe('<FlashMessageList/>', () => {
    const state = {
        flash: [
            { id: 1, message: "message 1", type: "info"},
            { id: 2, message: "message 2", type: "error"},
        ]
    };
    it('should render flash messages', () => {
        const wrapper = getComponent(state);
        const elements = wrapper.find('FlashMessage');
        expect(elements.length).toBe(2);
    });
});