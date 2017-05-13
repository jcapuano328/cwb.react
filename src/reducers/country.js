import {REHYDRATE} from 'react-native-nub';
import types from '../constants/actionTypes';
import Roster from '../services/roster';

const defaultState =  {
    roster: {},
    orders: {},
    ammo: 0,
    vp: 0
};

const updateBrigade = (roster, brigade) => {
    let b = Roster.getBrigade(roster, brigade);
    if (b) {
        b.losses = brigade.losses;
        b.stragglers = brigade.stragglers;
    }
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
                orders: {...action.value}
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

        case types.SET_ROSTER:    
            return {
                ...state,
                roster: {...action.value}
            };

        case types.UPDATE_BRIGADE:    
            updateBrigade(state.roster[action.value.army].roster, action.value.unit);
            return {
                ...state,
                roster: {
                    ...state.roster,
                    [action.value.army]: {
                        ...state.roster[action.value.army]
                    }                    
                }
            };

        default:
            return state;
        }
    }
}
