import {REHYDRATE} from 'react-native-nub';
import types from '../constants/actionTypes';

const defaultState =  {
    roster: [],
    orders: [],
    ammo: 0,
    vp: 0
};

module.exports = (state = defaultState, action) => {
    switch (action.type) {
    case REHYDRATE:        
        if (action.payload.current) {
            return {
                ...state,
                ...action.payload.current
            };        	
        }
        return {...state};
        
    case types.SET_COUNTRY:
        return {
            ...action.value
        };

    case types.SET_ARTYAMMO:
        return {
            ...state,
            ammo: action.value
        };
    case types.SET_VP:
        return {
            vp: action.value
        };

    case types.SET_ORDERS:    
        return {
            ...state,
            orders: [...action.value]            
        };

    case types.ADD_ORDER:
        return {
            ...state,
            orders: [...state.orders, {...action.value, id: state.orders.length+1}]
        };
    case types.UPDATE_ORDER:
        let l = [...state.orders];
        let a = l.find((o) => o.country == action.value.country && o.army == action.value.army);
        if (a) {
            let i = a.orders.findIndex((o) => o.id === action.value.id);        
            if (i > -1) {
                a.orders[i] = {...action.value};
            }
        }    
        return {
            ...state,
            orders: l
        };        

    case types.REMOVE_ORDER:
        country = action.value.country.toLowerCase();
        return {
            ...state,
            orders: state.orders.filter((o) => o.id !== action.value.id)
        };

    default:
        return state;
    }
}
