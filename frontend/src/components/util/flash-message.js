import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

export const ADD       = 'flash.add';
export const REMOVE    = 'flash.remove';

export function addFlashMessage(type,message){
    return {
        type: ADD,
        payload: {
            type: type,
            text: message
        }
    }
}

export function removeFlashMessage(id){
    return {
        type: REMOVE,
        payload: {
            id: id
        }
    }
}

export default (state = [], action = {}) => {
    switch(action.type) {
        case ADD: {
            return [
                ...state,
                {
                    id: shortid.generate(),
                    type: action.payload.type,
                    text: action.payload.text
                }
            ];
        }
        case REMOVE: {
            const index = findIndex(state, { id: action.payload.id });
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];
            }else{
                return state;
            }
        }
        default: {
            return state;
        }
    }
}