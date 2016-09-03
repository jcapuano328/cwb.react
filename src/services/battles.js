'use strict';

var battles = require('../stores/battles.json');

module.exports = {
    battles: battles,
    get(id) {
        let scenario = null;
        let battle = battles.find((b,i) => {
            scenario = b.scenarios.find((s,j) => {
                return s.id === id;
            });
            return !!scenario;
        });
        if (battle) {
            return {
                id: battle.id,
                name: battle.name,
                image: battle.image,
                armies: battle.armies,
                scenario: scenario,
                dayTimeIncr: battle.dayTimeIncr,
        		nightTimeIncr: battle.nightTimeIncr,
        		dawnTime: battle.dawnTime,
        		duskTime: battle.duskTime,
        		randomEvents: battle.randomEvents
            };
        }
    }
};
