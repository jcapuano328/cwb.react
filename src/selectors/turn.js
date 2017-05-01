import { createSelector } from 'reselect';
import moment from 'moment';
import getGame from './game';
import {getTimeIncrement} from '../services/time';

const getTurn = (state) => state.current.turn;

export default createSelector(
    [getTurn, getGame],
    (turn, game) => {
        if (!game || !game.scenario) {
            return '';
        }
		let st = moment(new Date(game.scenario.startDateTime));
		let et = moment(new Date(game.scenario.endDateTime));
		let dt = moment(st);
		for (var ctr=1; ctr<turn && dt.isSameOrBefore(et); ctr++) {
			let incr = getTimeIncrement(dt,game);
			dt.add(incr, 'minutes');
		}        
        return dt.format("MMM DD, YYYY HH:mm");
    }    
);
