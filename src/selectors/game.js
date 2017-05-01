import { createSelector } from 'reselect';
import Battles from '../services/battles';

const getBattle = (state) => state.current.battle;
const getScenario = (state) => state.current.scenario;

export default createSelector(
    [getBattle, getScenario],
    (battleid, scenarioid) => {        
        let battle = Battles.battle(battleid);
        let scenario = Battles.scenario(battle, scenarioid);        
        if (battle && scenario) {
            let details = Battles.scenariodetails(battle, scenarioid);
            return {
                id: battle.id,
                name: battle.name,
                image: battle.image,
                armies: details.armies,
                scenario: {
                    id: scenario.id,                    
                    name: scenario.name,
                    startDateTime: scenario.startDateTime,
                    endDateTime: scenario.endDateTime,
                    firstPlayer: details.firstPlayer,
                    csaAmmo: details.csaAmmo,
                    csaCasualty: details.csaCasualty,
                    usaAmmo: details.usaAmmo,
                    usaCasualty: details.usaCasualty,
                    defaultOrders: details.defaultOrders                    
                },
                dayTimeIncr: battle.dayTimeIncr,
        		nightTimeIncr: battle.nightTimeIncr,
        		dawnTime: battle.dawnTime,
        		duskTime: battle.duskTime,
        		randomEvents: battle.randomEvents
            };
        }        
    }    
);