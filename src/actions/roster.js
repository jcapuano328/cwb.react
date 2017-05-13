import types from '../constants/actionTypes';

export const updateBrigade = (c, a, b) => (dispatch) => {
    dispatch({name: c.toLowerCase(), type: types.UPDATE_BRIGADE, value: {army: a, unit: b}});
}
