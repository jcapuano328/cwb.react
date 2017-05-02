import {REHYDRATE} from 'react-native-nub';
import types from '../constants/actionTypes';

const defaultState =  {
    battle: -1,
    scenario: -1,
    turn: 1,
    phase: 0,
    player: "first",
    usa: {
        roster: [],
        orders: [],
        ammo: 0,
        vp: 0
    },
    csa: {
        roster: [],
        orders: [],                
        ammo: 0,
        vp: 0
    }
};


const prevTurn = (t) => {    
    if (--t < 1) { t = 1; }
    return t;    
}
const nextTurn = (t,m) => {    
    if (++t > m) { t = m; }
    return t;    
}

const update = (_l, v) => {
    let l = [..._l];
    let i = l.findIndex((o) => o.id === v.id);
    if (i > -1) {
        l[i] = {...v};
    }
    return l;
}

const remove = (l, v) => {
    return l.filter((o) => o.id !== v.id);
}

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
        
    case types.SET_CURRENT:
        return {
            ...action.value
        };

    case types.PREV_TURN:        
        return {
            ...state,
            turn: prevTurn(state.turn)
        };

    case types.NEXT_TURN:
        return {
            ...state,
            turn: nextTurn(state.turn, action.value)
        };
    
    case types.PREV_PHASE:
        let phase = state.phase - 1;
        let player = state.player;
        let turn = state.turn;
		if (phase < 0) {
			phase = action.value.maxphases - 1;
            if (player == 'first') {
				turn = prevTurn(state.turn);
                player = 'second';
            }
		}
        return {
            ...state,
            turn: turn,
            phase: phase,
            player: player
        };           

    case types.NEXT_PHASE:
        phase = state.phase + 1;
        player = state.player;
        turn = state.turn;
		if (phase >= action.value.maxphases) {
			phase =  0;
			if (player == 'second') {
				turn = nextTurn(turn, action.value.maxturns);
                player = 'first'
            }
		}
        return {
            ...state,
            turn: turn,
            phase: phase,
            player: player
        };
        
    case types.NEXT_PLAYER:
        return {
            ...state,
            player: state.player == 'second' ? 'first' : 'second'
        };

    case types.SET_PLAYER:
        return {
            ...state,
            player: action.value
        };

    case types.SET_CSA_ARTYAMMO:
        return {
            ...state,
            csa: {
                ...state.csa,
                ammo: action.value
            }            
        };
    case types.SET_CSA_VP:
        return {
            ...state,
            csa: {
                ...state.csa,
                vp: action.value
            }
        };

    case types.SET_USA_ARTYAMMO:
        return {
            ...state,
            usa: {
                ...state.usa,
                ammo: action.value
            }            
        };
    case types.SET_USA_VP:
        return {
            ...state,
            usa: {
                ...state.usa,
                vp: action.value
            }
        };

    case types.ADD_ORDER:
        let country = action.value.country.toLowerCase();         
        return {
            ...state,
            [country]: {
                ...state[country],
                orders: [...state[country].orders, action.value]
            }
        };
    case types.UPDATE_ORDER:
        country = action.value.country.toLowerCase();
        return {
            ...state,
            [country]: {
                ...state[country],
                orders: update(state[country].orders, action.value)
            }
        };
    case types.REMOVE_ORDER:
        country = action.value.country.toLowerCase();
        return {
            ...state,
            [country]: {
                ...state[country],
                orders: remove(state[country].orders, action.value)
            }
        };

    default:
        return state;
    }
}
