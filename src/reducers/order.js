import {REHYDRATE} from 'react-native-nub';
import types from '../constants/actionTypes';

const defaultState = {
    id: -1,
    country: '',
    army: '',
    sender: '',
    receiver: '',
    dateTime: new Date(),
    type: '',
    method: '',
    force: '',
    text: '',
    status: ''
};

module.exports = (state = {}, action) => {
    switch (action.type) {
    case REHYDRATE:        
        if (action.payload.order) {
            return {
                ...state,
                ...action.payload.order
            };        	
        }
        return {...state};
        
    case types.SELECT_ORDER:
        return {...action.value};

    case types.UPDATE_SELECTED_ORDER:
        return {
            ...state,
            [action.value.field]: action.value.value
        };

    case types.RESET_ORDER:
        return {};

    default:
        return state;
    }
}
