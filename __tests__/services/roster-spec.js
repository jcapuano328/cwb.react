
describe('Roster service', () => {
    var env = {};
    beforeEach(() => {
        env = {};
        env.battle = require('../fixtures/roster.json');
        env.Roster = require('../../src/services/roster');        
    });

    describe('getFormationForLeader', () => {
        beforeEach(() => {
            env.formation = env.Roster.getFormationForLeader(env.battle, 'USA', 'AVa', 'Schurz');
        });

        it('should find formation', () => {
            expect(env.formation).toBeDefined();
            expect(env.formation.name).toEqual('3-1 Va');
        });
    });

    describe('getFormationForLeaderWreckStatus', () => {
        beforeEach(() => {
            env.battle.armies[0].roster.corps[0].divisions[1].brigades[0].losses = 4;
            env.battle.armies[0].roster.corps[0].divisions[1].brigades[0].stragglers = 3;

            env.battle.armies[0].roster.corps[0].divisions[1].brigades[2].losses = 2;
            env.battle.armies[0].roster.corps[0].divisions[1].brigades[2].stragglers = 4;
            
            env.formation = env.Roster.getFormationForLeaderWreckStatus(env.battle, 'USA', 'AVa', 'Schurz');
        });

        it('should find formation', () => {
            expect(env.formation).toBeDefined();
            expect(env.formation.name).toEqual('3-1 Va');
            expect(env.formation.total).toEqual(3);
            expect(env.formation.wrecked).toEqual(2);
        });
    });

    describe('getBrigade', () => {
        beforeEach(() => {
            env.formation = env.Roster.getBrigade(env.battle.armies[0].roster, {id: 92});
        });

        it('should find formation', () => {
            expect(env.formation).toBeDefined();
            expect(env.formation.name).toEqual('1-3-1');
        });
    });    
});
