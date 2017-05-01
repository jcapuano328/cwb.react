import { createSelector } from 'reselect';
import Phases from '../services/phases';

const getPhase = (state) => state.current.phase;

export default createSelector(
    [getPhase],
    (phase) => {
        return Phases.get(phase);
    }    
);
