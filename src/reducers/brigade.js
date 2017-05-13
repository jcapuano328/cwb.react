import {REHYDRATE} from 'react-native-nub';
import types from '../constants/actionTypes';

const defaultState =  {};

module.exports = (state = defaultState, action) => {
    switch (action.type) {
    case REHYDRATE:                
        if (action.payload.brigade) {
            return {
                ...state,
                ...action.payload.brigade
            };        	
        }
        return {...state};
        
    case types.UPDATE_BRIGADE:    
        return {
            ...state,
            ...action.value.unit
        };

    default:
        return state;
    }
}
