'use strict'

var Store = require('../stores/current');
var Battles = require('./battles');
var Phases = require('./phases');
var log = require('./log');
var moment = require('moment');

var _current = {};

let getTimeIncrement = (dt, battle) => {
	return isNight(dt, battle) ? battle.nightTimeIncr : battle.dayTimeIncr;
}

let isNight = (dt, battle) => {
	var now = moment(dt);

	var dawn = moment(now.format('YYYY-MM-DD') + 'T' + battle.dawnTime);
	var dusk = moment(now.format('YYYY-MM-DD') + 'T' + battle.duskTime);

	return ((now.isSame(dusk) || now.isAfter(dusk)) && now.isBefore(dawn));
}

module.exports = {
	load() {
		return Store.load()
		.then((current) => {
        	_current = current;
            return _current;
		});
	},
	save() {
		return Store.save(_current);
	},
	remove() {
		return Store.remove()
		.then(() => {
			_current = null;
		});
	},
	reset(data) {
		return Store.reset(data)
		.then((current) => {
			_current = current;
			return _current;
		});
	},
	battle() {
		return Battles.get(_current.scenario) || {};
	},
	turn() {
		let battle = this.battle();
		let st = moment(new Date(battle.scenario.startDateTime));
		let et = moment(new Date(battle.scenario.endDateTime));
		let dt = moment(st);
		for (var ctr=1; ctr<_current.turn && dt.isSameOrBefore(et); ctr++) {
			let incr = getTimeIncrement(dt,battle);
			dt.add(incr, 'minutes');
		}
		return dt;
	},
	prevTurn(dosave) {
		log.debug('prev turn: ' + _current.turn);
		if (--_current.turn < 1) {
			_current.turn = 1;
		}
        let turn = this.turn();
		if (dosave) {
        	return this.save()
            .then(() => {
            	return turn;
			});
		}
        return new Promise((resolve, reject) => {
        	resolve(turn);
        });
	},
	nextTurn(dosave) {
		log.debug('next turn: ' + _current.turn);
		let battle = this.battle();
		let et = moment(new Date(battle.scenario.endDateTime));
		_current.turn++;
		let now = this.turn();
		if (now.isAfter(et)) {
			_current.turn--;
		}
        let turn = this.turn();
		if (dosave) {
        	return this.save()
            .then(() => {
            	return turn;
			});
		}
        return new Promise((resolve, reject) => {
        	resolve(turn);
        });
	},
	phase() {
		let phase = Phases.get(_current.phase);
		log.debug('phase: ' + phase);
		return phase;
	},
	prevPhase() {
		let battle = this.battle();
		if (--_current.phase < 0) {
			_current.phase = Phases.count - 1;
			if (_current.player == 'first') {
				this.prevTurn(false);
				_current.player = 'second';
			} else {
				_current.player = 'first';
			}
		}
    	return this.save()
        .then(() => {
        	return this.phase();
		});
	},
	nextPhase() {
		if (++_current.phase >= Phases.count) {
			_current.phase = 0;
			log.debug('nextPhase: ' + _current.player);
			if (_current.player == 'second') {
				this.nextTurn(false);
				_current.player = 'first';
			} else {
				_current.player = 'second';
			}
		}
    	return this.save()
        .then(() => {
        	return this.phase();
		});
	},
	nextPlayer() {
		if (_current.player == 'second') {
			_current.player = 'first';
		} else {
			_current.player = 'second';
		}
		return this.save()
        .then(() => {
        	return this.player();
		});
	},
	player() {
		let battle = this.battle();
		let player = '';
		if (_current.player == 'first') {
			player = battle.scenario.firstPlayer;
		} else {
			// second
			player = (battle.scenario.firstPlayer == 'USA') ? 'CSA' : 'USA';
		}
		log.debug('current player: ' + _current.player + '/' + player);
		return player;
	}
};
