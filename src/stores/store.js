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
            player: string,
            usa: {
                roster: [],
                orders: [],
                ammo: integer,
                vp: integer
            },
            csa: {
                roster: [],
                orders: [],                
                ammo: integer,
                vp: integer
            }
        }
    }
*/
const store = Store(rootReducer);

export default store;