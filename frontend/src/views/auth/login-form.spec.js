import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import LoginForm, { LoginFormClass } from './LoginForm';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import configureMockStore from 'redux-mock-store';

import { expect } from 'chai';
import sinon from 'sinon';

function getComponent(props, state){
    const store = createStore(combineReducers({form: formReducer }));
    return mount(
        <Provider store={store}>
            <LoginForm {...props}/>
        </Provider>
    );
}

describe('<LoginForm/>', () => {

    let state;
    let props;
    let login;
    let handleSubmit, error, touched;

    beforeEach( () => {

        login = sinon.stub().returns(Promise.resolve());
        handleSubmit = fn => fn;
        state = {
            ...defaultState
        };

        props = {
            login,
            handleSubmit,
            submitting: false,
            fields: {
                username: {
                    value: 'admin',
                    touched: touched,
                    error: error
                },
                password: {
                    value: 'admin',
                    touched: touched,
                    error: error
                }
            }
        };
    });

    it('should handle submit', () => {
        const wrapper = shallow(<LoginForm handleSubmit={handleSubmit} login={login}/>);
        const form = wrapper.find('form');
        const username = wrapper.find('input#username');
        const password = wrapper.find('input#password');
        form.simulate('submit');
        expect(login.callCount).to.equal(1);
    });
});