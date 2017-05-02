import types from '../constants/actionTypes';
import getGame from '../selectors/game';
import {getTimeIncrement} from '../services/time';

export const select = (item) => (dispatch) => {
    dispatch({type: types.SELECT_ORDER, value: item});
}

export const create = (country,army,dt,type,method,status) => (dispatch) => {
    select({
        id: null,
        country: country,
        army: army,
        sender: '',
        receiver: '',
        dateTime: dt,
        type: type,
        method: method,
        force: '',
        text: '',
        status: status
    })(dispatch);
}

export const accept = () => (dispatch,getState) => {
    const {order} = getState();
    dispatch({type: order.id ? types.UPDATE_ORDER : types.ADD_ORDER, value: order});
}

export const remove = (v) => (dispatch,getState) => {    
    dispatch({type: types.REMOVE_ORDER, value: v});
}

export const setSender = (v) => (dispatch) => {
    dispatch({type: types.UPDATE_SELECTED_ORDER, value: {field: 'sender', value: v}});
}

export const setReceiver = (v) => (dispatch) => {
    dispatch({type: types.UPDATE_SELECTED_ORDER, value: {field: 'receiver', value: v}});
}

export const setDateTime = (v) => (dispatch) => {
    dispatch({type: types.UPDATE_SELECTED_ORDER, value: {field: 'dateTime', value: v}});
}

export const setType = (v) => (dispatch) => {
    dispatch({type: types.UPDATE_SELECTED_ORDER, value: {field: 'type', value: v}});
}

export const setMethod = (v) => (dispatch) => {
    dispatch({type: types.UPDATE_SELECTED_ORDER, value: {field: 'method', value: v}});
}

export const setForce = (v) => (dispatch) => {
    dispatch({type: types.UPDATE_SELECTED_ORDER, value: {field: 'force', value: v}});
}

export const setText = (v) => (dispatch) => {
    dispatch({type: types.UPDATE_SELECTED_ORDER, value: {field: 'text', value: v}});
}

export const setStatus = (v) => (dispatch) => {
    dispatch({type: types.UPDATE_SELECTED_ORDER, value: {field: 'status', value: v}});
}


export const adjustDate = (d,a) => (dispatch) => {
    const game = getGame(getState());

    let st = moment(game.scenario.startDateTime);
    let et = moment(game.scenario.endDateTime);
    let dt = moment(d);
    dt.add(a,'days');
    if (dt.isBefore(st)) {
        dt = st;
    } else if (dt.isAfter(et)) {
        dt = et;
    }
    dispatch({type: types.UPDATE_SELECTED_ORDER, value: {field: 'dateTime', value: dt.toDate()}});
}

export const adjustTime = (d,a) => (dispatch) => {
    const game = getGame(getState());

    let st = moment(game.scenario.startDateTime);
    let et = moment(game.scenario.endDateTime);
    let dt = moment(this.props.order.dateTime);
    let incr = getTimeIncrement(dt,game);
    dt.add(a*incr,'minutes');
    if (dt.isBefore(st)) {
        dt = st;
    } else if (dt.isAfter(et)) {
        dt = et;
    }
    dispatch({type: types.UPDATE_SELECTED_ORDER, value: {field: 'dateTime', value: dt.toDate()}});
}
