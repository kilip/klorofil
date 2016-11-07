import React from 'react';
import Dashboard from './dashboard';
import { shallow } from 'enzyme';

describe("Dashboard",() => {
    it('renders without crashing',() => {
        shallow(<Dashboard/>);
    });

    it('should render properly',() => {
        const props = {children: (<div><span>Hello World</span></div>)};
        const dashboard = shallow(<Dashboard {...props} />);
        expect(dashboard.find('span').length).toBe(1);
        expect(dashboard.find('div.dashboard-wrapper').length).toBe(1);
    });
});