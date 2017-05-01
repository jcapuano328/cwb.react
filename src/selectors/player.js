import { createSelector } from 'reselect';
import getGame from './game';

const getPlayer = (state) => state.current.player;

export default createSelector(
    [getPlayer, getGame],
    (player, game) => {      
        if (!game.scenario) {
            return '';
        }
        if (player == 'first') {
            return game.scenario.firstPlayer;
        }
        return game.scenario.firstPlayer == 'USA' ? 'CSA' : 'USA';
    }    
);
