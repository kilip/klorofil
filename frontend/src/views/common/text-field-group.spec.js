import React from 'react';
import { mount } from 'enzyme';
import TextFieldGroup from './text-field-group';

function getComponent(props){
    return mount(<TextFieldGroup {...props}/>);
}

describe('<TextFieldGroup/>', () => {

    let props;

    beforeEach(() => {
        props = {
            input: {
                name: 'inputName',
            },
            label: 'input label',
            meta: {
                touched: false,
                error: false,
                warning: false
            }
        }
    });

    it('should rendered properly', () => {
        props.meta.touched = true;
        const wrapper = getComponent(props);
        const html = wrapper.html();

        expect(html).toContain('input label');
        expect(html).toContain('id="inputName"');
        expect(html).toContain('name="inputName"');
        expect(html).toContain('for="inputName"');
        expect(html).toContain('type="text"');

        expect(html).not.toContain('has-error');
        expect(html).not.toContain('has-warning');
    });

    it('should render password type', () => {
        props.type = 'password';
        const wrapper = getComponent(props);
        const html = wrapper.html();
        expect(html).toContain('type="password"');
    });

    it('should render warning message', () => {

        props.meta.touched = true;

        props.meta.warning = 'warning message';

        const wrapper = getComponent(props);
        const html = wrapper.html();
        expect(wrapper.find('.has-warning').length).toBe(1);
        expect(html).toContain('warning message');
    });

    it('should render error message', () => {

        props.meta.touched = true;
        props.meta.error = 'error message';

        const wrapper = getComponent(props);
        const html = wrapper.html();
        expect(wrapper.find('.has-error').length).toBe(1);
        expect(wrapper.find('.fa-times-circle-o').length).toBe(1);
        expect(html).toContain('error message');
    });

});