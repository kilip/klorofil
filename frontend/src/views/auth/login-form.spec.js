import React from 'react';
import { shallow } from 'enzyme';
import { LoginFormComponent } from './LoginForm';

import chai,{ expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());

describe('<LoginFormComponent/>', () => {
    let login;
    let handleSubmit, error, touched;

    beforeEach( () => {
        login = sinon.stub().returns(Promise.resolve());
        handleSubmit = fn => fn;
    });

    const buildSubject = () => {
        const props = {
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
        return shallow(<LoginFormComponent {...props}/>);
    };
    it('should handle submit', () => {
        const wrapper = buildSubject();
        const form = wrapper.find('form');
        const username = wrapper.find('input#username');
        const password = wrapper.find('input#password');
        form.simulate('submit');
        expect(login.callCount).to.equal(1);
    });
});