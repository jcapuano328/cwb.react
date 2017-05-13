import { combineReducers } from 'redux';
import info from './info';
import toast from './toast';
import current from './current';
import country from './country';
import order from './order';
import brigade from './brigade';
import createFilteredReducer from './createFilteredReducer';

const appReducer = combineReducers({
    current: current,
    usa: country('usa'),//createFilteredReducer(country, action => action.name === 'usa'),
    csa: country('csa'),//createFilteredReducer(country, action => action.name === 'csa'),
    order: order,    
    brigade: brigade,
    info: info,
    toast: toast
});

export default function rootReducer(state,action) {
    if (action.type === 'RESET') {
        state = undefined;
    }
    return appReducer(state,action);
}
