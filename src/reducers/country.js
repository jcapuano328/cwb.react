import {REHYDRATE} from 'react-native-nub';
import types from '../constants/actionTypes';

const defaultState =  {
    roster: [],
    orders: [],
    ammo: 0,
    vp: 0
};

const add = (orders, order) => {
    //{...action.value, id: state.orders.length+1}    
    let l = [...orders];
    let a = l.find((o) => o.country == order.country && o.army == order.army);
    if (a) {
        a.orders.push({...order});
    }    
    return l;    
}

module.exports = (name) => {
    return (state = defaultState, action) => {
        let type = action.type;
        if (action.name !== name && action.type != REHYDRATE) {
            type = '';
        }

        switch (type) {
        case REHYDRATE:                
            if (action.payload[name]) {
                return {
                    ...state,
                    ...action.payload[name]
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
                orders: {
                    ...state.orders, 
                    [action.value.army]: [
                        ...state.orders[action.value.army],
                        {...action.value, id: state.orders[action.value.army][state.orders[action.value.army].length-1].id+1}
                    ]
                }                    
            };

        case types.UPDATE_ORDER:
            let l = [...state.orders[action.value.army]];
            let i = l.findIndex((o) => o.id === action.value.id);        
            if (i > -1) {
                l[i] = {...action.value};
                return {
                    ...state,
                    orders: {
                        ...state.orders,
                        [action.value.army]: [
                            ...l
                        ]                    
                    }
                };        
                
            }
            return state;

        case types.REMOVE_ORDER:
            return {
                ...state,
                orders: {
                    ...state.orders,
                    [action.value.army]: state.orders[action.value.army].filter((o) => o.id !== action.value.id)
                }
            };

        default:
            return state;
        }
    }
}
