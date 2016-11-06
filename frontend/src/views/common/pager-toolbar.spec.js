import React from 'react';
import { mount } from 'enzyme';
import Pager from '../../components/util/pager';
import PagerToolbar from './pager-toolbar';
import _ from 'lodash';

function getComponent(pager,loadData = jest.fn()){
    return  mount(
        <PagerToolbar pager={pager} loadData={loadData}/>
    );
}

describe('<PagerToolbar/>', () => {
    let pager;

    beforeEach(() => {
        pager = new Pager();
    });

    it('should render properly', () => {
        const wrapper = getComponent(pager);

        expect(wrapper.text()).toContain('Page 1 of 1');
        expect(wrapper.find('#btnPagerFirst').length).toBe(1);
        expect(wrapper.find('#btnPagerPrev').length).toBe(1);
        expect(wrapper.find('#btnPagerNext').length).toBe(1);
        expect(wrapper.find('#btnPagerLast').length).toBe(1);
    });

    it('should enable or disable buttons', () => {
        pager.page = 1;
        pager.pages = 100;

        var wrapper = getComponent(pager);
        expect(wrapper.find('#btnPagerFirst[disabled=true]').length).toBe(1);
        expect(wrapper.find('#btnPagerPrev[disabled=true]').length).toBe(1);
        expect(wrapper.find('#btnPagerNext[disabled=false]').length).toBe(1);
        expect(wrapper.find('#btnPagerLast[disabled=false]').length).toBe(1);

        pager.page = 100;
        wrapper = getComponent(pager);
        expect(wrapper.find('#btnPagerFirst[disabled=false]').length).toBe(1);
        expect(wrapper.find('#btnPagerPrev[disabled=false]').length).toBe(1);
        expect(wrapper.find('#btnPagerNext[disabled=true]').length).toBe(1);
        expect(wrapper.find('#btnPagerLast[disabled=true]').length).toBe(1);
    });

    it('should handle onclick navigator buttons', () => {

        pager.page = 5;
        pager.pages = 100;
        pager.links = {
            first: '/first',
            next: '/next',
            previous: '/previous',
            last: '/last'
        };

        const mockLoadData = jest.fn();
        const wrapper = getComponent(pager,mockLoadData);
        var buttons = ['First','Prev','Next','Last'];

        _.forEach(buttons,function(value){
            var htmlId = '#btnPager'+value;
            var button = wrapper.find(htmlId);
            button.simulate('click');
        });

        expect(mockLoadData).toHaveBeenCalledWith({url: '/first'});
        expect(mockLoadData).toHaveBeenCalledWith({url: '/next'});
        expect(mockLoadData).toHaveBeenCalledWith({url: '/previous'});
        expect(mockLoadData).toHaveBeenCalledWith({url: '/last'});
    });
});