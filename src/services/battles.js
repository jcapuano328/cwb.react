var battles = require('../data/battles.json');
var battledetails = {
    "intheirquietfields": require('../data/intheirquietfields.json'),
    "augustfury": require('../data/augustfury.json'),
    "aprilsharvest": require('../data/aprilsharvest.json'),
    "championhill": require('../data/championhill.json'),
    "nobetterplacetodie": require('../data/nobetterplacetodie.json'),
    "sevenpines": require('../data/sevenpines.json'),
    "sevendays": require('../data/sevendays.json'),
    "strikethemablow": require('../data/strikethemablow.json'),
    "threebattlesofmanassas": require('../data/threebattlesofmanassas.json')
};

module.exports = {
    battles: battles,
    battle(battleid) {
        return battles.find((b,i) => b.id == battleid) || {scenarios:[]};
    },
    scenario(battle, scenarioid) {
        return battle.scenarios.find((s) => s.id === scenarioid) || {};
    },
    scenariodetails(battle, scenarioid) {
        let details = (battle && battle.image && battledetails[battle.image]) ? battledetails[battle.image] : null;        
        if (details) {
            let scenario = details.scenarios.find((s) => s.id === scenarioid);
            return {
                armies: details.armies,
                firstPlayer: scenario.firstPlayer,
                csaAmmo: scenario.csaAmmo,
                csaCasualty: scenario.csaCasualty,
                usaAmmo: scenario.usaAmmo,
                usaCasualty: scenario.usaCasualty,
                defaultOrders: scenario.defaultOrders                    
            };
        }
        return {};
    }
};
