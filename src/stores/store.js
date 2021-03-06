import { Store } from 'react-native-nub';
import rootReducer from '../reducers';
/*  the "store" will look like so:
    {
        info: {
            version: string,
            releasedate: datetime
        },
        toast: {
            active: bool,
            message: string,
            duration: integer
        },
        current: {
            battle: integer,
            scenario: integer,
            turn: integer,
            phase: integer,
            player: string
        },
        usa: {
            roster: {
                "army": {name, commander, roster},
                "army": {name, commander, roster},
                ...
            },
            orders: {
                "army": [{sender,receiver,...},...],
                "army": [{sender,receiver,...},...],
                ...
            },
            ammo: integer,
            vp: integer
        },
        csa: {
            roster: {
                "army": {name, commander, roster},
                "army": {name, commander, roster},
                ...
            },
            orders: {
                "army": [{sender,receiver,...},...],
                "army": [{sender,receiver,...},...],
                ...
            },
            ammo: integer,
            vp: integer
        },        
        order: {
            id: int,
            country: string,
            army: string,
            sender: string,
            receiver: string,
            dateTime: datetime,
            type: string,
            method: string,
            force: string,
            text: string,
            status: string
        }
    }
*/
const store = Store(rootReducer, null, {
    nologging: true//,
    //predicate: (getState, action) => !action.type.toLowerCase().includes('rehydrate') 
        //&& !action.type.toLowerCase().includes('roster')    
});
export default store;