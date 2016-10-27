import _ from 'lodash';

/**
 * Remove all css class from an element
 * and change it with the passed css class
 * @param element
 * @param css
 */
export function replaceCssClass(element,css){
    element.setAttribute('class','');

    if(_.isArray(css)){
        css = _.join(css,' ');
    }
    element.setAttribute('class',css);
}