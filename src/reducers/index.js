import { combineReducers } from 'redux';
import info from './info';
import toast from './toast';
import current from './current';
import order from './order';

module.exports = combineReducers({
    current: current,
    order: order,
    info: info,
    toast: toast
});
