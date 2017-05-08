import {REHYDRATE} from 'react-native-nub';
import types from '../constants/actionTypes';

const defaultState =  {
    battle: -1,
    scenario: -1,
    turn: 1,
    phase: 0,
    player: "first"
};

const prevTurn = (t) => {    
    if (--t < 1) { t = 1; }
    return t;    
}
const nextTurn = (t,m) => {    
    if (++t > m) { t = m; }
    return t;    
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

    default:
        return state;
    }
}
