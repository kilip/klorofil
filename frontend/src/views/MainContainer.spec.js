import React from 'react';
import { shallow } from 'enzyme';
import MainContainer,{ LAYOUT_LOGIN} from './MainContainer';
import { NavMain } from './NavMain';
import FlashMessageList from './common/flash-message-list';
import Sidebar from './Sidebar';

function removeFlashMessage(){}

const store = mockStore();
describe('MainContainer View', () => {
    it('should render default layout',()=>{
        const body = document.body;
        body.className = '';
        const wrapper = shallow(
            <MainContainer
                title="Test"
                subtitle="Subtitle"
                removeFlashMessage={removeFlashMessage}
                store={store}
            />
        ).shallow();

        //expect(wrapper.find('.content-header h1').text()).toEqual('Test Subtitle');
        expect(wrapper.contains(<NavMain/>)).toBeTruthy();
        expect(wrapper.contains(<Sidebar/>)).toBeTruthy();
        expect(wrapper.find(FlashMessageList).length).toBe(1);
        expect(body.classList.contains('sidebar-mini')).toBeTruthy();
    });

    it('should render login layout', () => {
        const wrapper = shallow(
            <MainContainer
                title="Test"
                subtitle="Subtitle"
                removeFlashMessage={removeFlashMessage}
                store={store}
                layout={LAYOUT_LOGIN}
            />
        ).shallow();
        expect(wrapper.find('div.login-box').text()).toContain('klorofil');
    });
});