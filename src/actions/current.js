import types from '../constants/actionTypes';
import Phases from '../services/phases';
import getGame from '../selectors/game';
import getMaxTurns from '../selectors/maxturns';

const make = (game, country) => {
    let d = {
        "roster": {},
        "orders": {},
        "ammo": game.scenario.usaAmmo,
        "vp": 0        
    };

    game.armies.filter((a) => a.country == country).forEach((a,i) => {
        d.roster[a.name] = {...a, id: i};
    });

    game.scenario.defaultOrders.filter((a) => a.country == country).forEach((a) => {        
        if (!d.orders[a.army]) {
            d.orders[a.army] = [];
        }        
        d.orders[a.army] = d.orders[a.army].concat(a.orders.map((o,i) => ({...o, id: i})));
    });    

    return d;
}

export const reset = (e) => (dispatch,getState) => {
    const {current} = getState();        
    e = e || {battle: current.battle, scenario: current.scenario};
    const game = getGame({current: {battle: e.battle, scenario: e.scenario}});

    dispatch({type: types.RESET});

    dispatch({type: types.SET_CURRENT, value: {
        "battle": e.battle,
        "scenario": e.scenario,
        "turn": 1,
        "phase": 0,
        "player": "first"
    }});
    dispatch({name: 'usa', type: types.SET_COUNTRY, value: make(game, 'USA')});
    dispatch({name: 'csa', type: types.SET_COUNTRY, value: make(game, 'CSA')});
}

export const prevTurn = () => (dispatch) => {    
    dispatch({type: types.PREV_TURN});
}
export const nextTurn = () => (dispatch,getState) => {    
    const maxturns = getMaxTurns(getState());
    dispatch({type: types.NEXT_TURN, value: maxturns});
}

export const prevPhase = () => (dispatch,getState) => {    
    const {current} = getState();
    dispatch({type: types.PREV_PHASE, value: Phases.count});
}
export const nextPhase = () => (dispatch,getState) => {    
    const {current} = getState();
    const maxturns = getMaxTurns(getState());
    dispatch({type: types.NEXT_PHASE, value: {maxphases: Phases.count, maxturns: maxturns}});
}

export const nextPlayer = () => (dispatch) => {    
    dispatch({type: types.NEXT_PLAYER});
}

export const setCsaArtyAmmo = (v) => (dispatch) => {    
    dispatch({name: 'csa', type: types.SET_ARTYAMMO, value: v});
}
export const setCsaVp = (v) => (dispatch) => {    
    dispatch({name: 'csa', type: types.SET_VP, value: v});
}
export const addCsaOrder = (o) => (dispatch) => {    
    dispatch({name: 'csa', type: types.ADD_ORDER, value: v});
}
export const updateCsaOrder = (o) => (dispatch) => {    
    dispatch({name: 'csa', type: types.UPDATE_ORDER, value: v});
}
export const removeCsaOrder = (o) => (dispatch) => {    
    dispatch({name: 'csa', type: types.REMOVE_ORDER, value: v});
}

export const setUsaArtyAmmo = (v) => (dispatch) => {    
    dispatch({name: 'usa', type: types.SET_ARTYAMMO, value: v});
}
export const setUsaVp = (v) => (dispatch) => {    
    dispatch({name: 'usa', type: types.SET_VP, value: v});
}
export const addUsaOrder = (o) => (dispatch) => {    
    dispatch({name: 'usa', type: types.ADD_ORDER, value: v});
}
export const updateUsaOrder = (o) => (dispatch) => {    
    dispatch({name: 'usa', type: types.UPDATE_ORDER, value: v});
}
export const removeUsaOrder = (o) => (dispatch) => {    
    dispatch({name: 'usa', type: types.REMOVE_ORDER, value: v});
}
