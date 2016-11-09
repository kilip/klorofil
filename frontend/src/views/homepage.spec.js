import 'rxjs';
import React from 'react';
import Homepage from './homepage';
import { shallow, mount } from 'enzyme';

describe('Homepage View', () => {
    it('renders without crashing',() =>{
        shallow(<Homepage/>);
    });

    it('should render properly',() => {
        //const wrapper = shallow(<Homepage store={mockStore}/>);
        //expect(wrapper.find(MainContainer).length).toBe(1);
    });
});

