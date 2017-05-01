import { createSelector } from 'reselect';
import moment from 'moment';
import getGame from './game';
import {getTimeIncrement} from '../services/time';

export default createSelector(
    [getGame],
    (game) => {
        if (!game || !game.scenario) {
            return '';
        }
		let st = moment(new Date(game.scenario.startDateTime));
		let et = moment(new Date(game.scenario.endDateTime));		
        var maxturns = 1;
        while (st.isSameOrBefore(et)) {
            maxturns++;			
			st.add(getTimeIncrement(st,game), 'minutes');
		}        
        return maxturns;
    }    
);
