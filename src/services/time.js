import moment from 'moment';

let isNight = (dt, battle) => {
	var now = moment(dt);

	var dawn = moment(now.format('YYYY-MM-DD') + 'T' + battle.dawnTime);
	var dusk = moment(now.format('YYYY-MM-DD') + 'T' + battle.duskTime);

	return ((now.isSame(dusk) || now.isAfter(dusk)) && now.isBefore(dawn));
}

export const getTimeIncrement = (dt, battle) => {
	return isNight(dt, battle) ? battle.nightTimeIncr : battle.dayTimeIncr;
}
