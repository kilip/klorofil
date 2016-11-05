import React from 'react';
import { replaceCssClass } from './dom';
import { mount } from 'enzyme';

describe('replaceCssClass', () => {

    beforeEach( () => {
        document.body.className = '';
    });

    it('should replace css class from element', () => {
        replaceCssClass(document.body,'replaced');
        expect(document.body.className).toBe('replaced');
    });

    it('should accept css parameter as an array', () => {
        replaceCssClass(document.body,['replaced1','replaced2']);
        expect(document.body.className).toBe('replaced1 replaced2');
    });

    it('should convert string css parameter into array', () => {
        replaceCssClass(document.body,'replaced1 replaced2');
        expect(document.body.className).toBe('replaced1 replaced2');
    });

});