import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import FlashMessage from './flash-message';

function getComponent(message,removeFlashMessage=jest.fn()){
    return mount(
        <FlashMessage message={message} removeFlashMessage={removeFlashMessage}/>
    );
}

describe('<FlashMessage/>', () => {

    let successMessage = {
        id: 1,
        text: 'success message',
        type: 'success'
    };

    let errorMessage = {
        id: 2,
        text: 'error message',
        type: 'error'
    };

    it('should render success flash message', () => {
        var wrapper = getComponent(successMessage);
        expect(wrapper.find('.alert-success').length).toBe(1);
        expect(wrapper.text()).toContain('success message');
        expect(wrapper.find('button.close').length).toBe(1);

        wrapper = getComponent(errorMessage);
        expect(wrapper.find('.alert-danger').length).toBe(1);
        expect(wrapper.text()).toContain('error message');
    });

    it('should handle remove flash message button', () => {
        const mockRemove = jest.fn();
        var wrapper = getComponent(successMessage,mockRemove);
        var button = wrapper.find('#btnFlashRemove-1');
        button.simulate('click');
        expect(mockRemove).toBeCalledWith(1);

        wrapper = getComponent(errorMessage,mockRemove);
        button = wrapper.find('#btnFlashRemove-2');
        button.simulate('click');
        expect(mockRemove).toBeCalledWith(2);
    });

});