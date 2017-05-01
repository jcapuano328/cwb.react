import types from '../constants/actionTypes';
import getGame from '../selectors/game';
import getMaxTurns from '../selectors/maxturns';

export const reset = (e) => (dispatch,getState) => {
    const {current} = getState();        
    e = e || {battle: current.battle, scenario: current.scenario};
    const game = getGame({current: {battle: e.battle, scenario: e.scenario}});
    let data = {
        "battle": e.battle,
        "scenario": e.scenario,
        "turn": 1,
        "phase": 0,
        "player": "first",
        "usa": {
            "roster": game.armies.filter((a) => a.country == 'USA').map((a,i) => {
                return {...a, id: i};
            }),
            "orders": game.scenario.defaultOrders.filter((o) => o.country == 'USA').map((o,i) => {
                return {...o, id: i};
            }),
            "ammo": game.scenario.usaAmmo,
            "vp": 0
        },
        "csa": {
            "roster": game.armies.filter((a) => a.country == 'CSA').map((a,i) => {
                return {...a, id: i};
            }),
            "orders": game.scenario.defaultOrders.filter((o) => o.country == 'CSA').map((o,i) => {
                return {...o, id: i};
            }),
            "ammo": game.scenario.csaAmmo,
            "vp": 0
        }
    }    
    dispatch({type: types.SET_CURRENT, value: data});
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
    dispatch({type: types.SET_CSA_ARTYAMMO, value: v});
}
export const setCsaVp = (v) => (dispatch) => {    
    dispatch({type: types.SET_CSA_VP, value: v});
}
export const addCsaOrder = (o) => (dispatch) => {    
    dispatch({type: types.ADD_CSA_ORDER, value: v});
}
export const updateCsaOrder = (o) => (dispatch) => {    
    dispatch({type: types.UPDATE_CSA_ORDER, value: v});
}
export const removeCsaOrder = (o) => (dispatch) => {    
    dispatch({type: types.REMOVE_CSA_ORDER, value: v});
}


export const setUsaArtyAmmo = (v) => (dispatch) => {    
    dispatch({type: types.SET_USA_ARTYAMMO, value: v});
}
export const setUsaVp = (v) => (dispatch) => {    
    dispatch({type: types.SET_USA_VP, value: v});
}
export const addUsaOrder = (o) => (dispatch) => {    
    dispatch({type: types.ADD_USA_ORDER, value: v});
}
export const updateUsaOrder = (o) => (dispatch) => {    
    dispatch({type: types.UPDATE_USA_ORDER, value: v});
}
export const removeUsaOrder = (o) => (dispatch) => {    
    dispatch({type: types.REMOVE_USA_ORDER, value: v});
}
