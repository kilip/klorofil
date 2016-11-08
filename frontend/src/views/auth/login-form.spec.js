import React from 'react';
import { shallow } from 'enzyme';
import { LoginFormComponent } from './login-form';

import chai,{ expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());

describe('<LoginFormComponent/>', () => {
    let doLogin;
    let handleSubmit, error, touched, props;

    beforeEach( () => {
        doLogin = sinon.stub().returns(Promise.resolve());
        handleSubmit = fn => fn;
        props = {
            doLogin,
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

    const buildSubject = () => {

        return shallow(<LoginFormComponent {...props}/>);
    };

    it('should handle submit', () => {
        const wrapper = buildSubject();
        const form = wrapper.find('form');
        const username = wrapper.find('input#username');
        const password = wrapper.find('input#password');
        form.simulate('submit');
        expect(doLogin.callCount).to.equal(1);
    });

    it('should render error message', () => {
        props.authError = 'Test Error Message';
        const subject = buildSubject();
        expect(subject.text()).to.contains(props.authError);
    });
});