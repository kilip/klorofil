import React from 'react';
import { mount } from 'enzyme';
import Box from './box';

function getComponent(props){
    return mount(
        <Box {...props}>
            Children Content
        </Box>
    );
}

describe('<Box/>', () => {

    let props = {
        theme: 'primary',
        loading: false,
        footer: <div>Footer Content</div>,
        title: 'Hello World'
    };

    it('should rendered properly', () => {
        const wrapper = getComponent(props);
        const html = wrapper.html();

        expect(html).toContain(props.title);
        expect(html).toContain('Footer Content');
        expect(html).toContain('Children Content');
        expect(wrapper.find('.overlay').length).not.toBe(1);
    });

    it('should add handle loading state', () => {
        props.loading = true;
        const wrapper = getComponent(props);
        expect(wrapper.find('.overlay').length).toBe(1);
    });

});