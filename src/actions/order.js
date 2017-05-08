import types from '../constants/actionTypes';
import getGame from '../selectors/game';
import {getTimeIncrement} from '../services/time';
import Orders from '../services/orders';
import Roster from '../services/roster';

export const select = (item) => (dispatch) => {
    dispatch({type: types.SELECT_ORDER, value: item});
}

export const create = (country,army,dt) => (dispatch,getState) => {
    const game = getGame(getState());    

    select({
        id: null,
        country: country,
        army: army,
        sender: Roster.getArmyLeader(game,country,army).name,
        receiver: '',
        dateTime: dt,
        type: Orders.types[0].type,
        method: Orders.methods[0].method,
        force: '',
        text: '',
        status: Orders.statuses[0].type
    })(dispatch);
}

export const accept = () => (dispatch,getState) => {
    const {order} = getState();
    dispatch({name: order.country.toLowerCase(), type: order.id ? types.UPDATE_ORDER : types.ADD_ORDER, value: order});
    dispatch({type: types.RESET_ORDER});
}

export const remove = (o) => (dispatch,getState) => {    
    dispatch({name: o.country.toLowerCase(), type: types.REMOVE_ORDER, value: o});
}

export const updateStatus = (o,s) => (dispatch) => {
    o.status = s;
    dispatch({name: o.country.toLowerCase(), type: types.UPDATE_ORDER, value: o});
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
