import React from 'react';
import { shallow } from 'enzyme';
import MainContainer,{ LAYOUT_LOGIN} from './main-container';
import { NavMain } from './nav-main';
import FlashMessageList from './common/flash-message-list';
import Sidebar from './sidebar';

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

    it('should not add sidebar-mini css class when it\'s already exists in body', () => {
        const body = document.body;
        body.className = 'sidebar-mini skin-blue some-css';

        const wrapper = shallow(
            <MainContainer
                title="Test"
                subtitle="Subtitle"
                removeFlashMessage={removeFlashMessage}
                store={store}
            />
        ).shallow();

        expect(body.classList.contains('sidebar-mini')).toBeTruthy();
        expect(body.classList.contains('some-css')).toBeTruthy();
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