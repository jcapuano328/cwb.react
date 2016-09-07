'use strict'
var cStateBloodLust = 'BL';
var cStateNormal = 'N';
var cStateShaken = 'SH';
var cStateDisorganized = 'DG';
var cStateRouted = 'R';

var states = [
	{
    	code: cStateBloodLust,
        desc: 'Blood Lust'
	},
	{
    	code: cStateNormal,
        desc: 'Normal'
	},
	{
    	code: cStateShaken,
        desc: 'Shaken'
	},
	{
    	code: cStateDisorganized,
        desc: 'Disorganized'
	},
	{
    	code: cStateRouted,
        desc: 'Routed'
	}
];

var levels = ['A','B','C','D','E'];

/*
var cResultBloodLust = states[0].desc;//cStateBloodLust;
var cResultNormal = states[1].desc;//cStateNormal;
var cResultShaken = states[2].desc;//cStateShaken;
var cResultShakenBack1 = states[2].desc + ' b1 *';//cStateShaken + ' b1 *';
var cResultDisorganizedBack1 = states[3].desc + ' b1 *';//cStateDisorganized + ' b1 *';
var cResultDisorganizedBack2 = states[3].desc + ' b2 s1 **';//cStateDisorganized + ' b2 s1 **';
var cResultRouted = states[4].desc + ' b2 s3 **';//cStateRouted + ' b2 s3 **';
*/
var cResultNE = {morale: 'NE',retreat: 0, stragglers: 0};
var cResultRemoveBloodLust = {morale: 'Remove ' + cStateBloodLust,retreat: 0, stragglers: 0};
var cResultBloodLust = {morale: states[0].code, retreat: 0, stragglers: 0};
var cResultNormal = {morale: states[1].code, retreat: 0, stragglers: 0};
var cResultShaken = {morale: states[2].code, retreat: 0, stragglers: 0};
var cResultShakenBack1 = {morale: states[2].code, retreat: 1, stragglers: 0};
var cResultDisorganizedBack1 = {morale: states[3].code, retreat: 1, stragglers: 0};
var cResultDisorganizedBack2 = {morale: states[3].code, retreat: 2, stragglers: 1};
var cResultRouted = {morale: states[4].code, retreat: 2, stragglers: 3};
var cResultRemainRouted = {morale: states[4].code,retreat: 0, stragglers: 0};

var results = [
	{
    	level: 'A+',
        results: [
        	{result: cResultBloodLust, low: 11, high: 16},
            {result: cResultNormal, low: 21, high: 54},
            {result: cResultShaken, low: 55, high: 62},
            {result: cResultShakenBack1, low: 63, high: 64},
            {result: cResultDisorganizedBack1, low: 65, high: 65},
            {result: cResultDisorganizedBack2, low: 66, high: 66},
            {result: cResultRouted, low: 0, high: 0}
        ]
	},
    {
    	level: 'A',
        results: [
        	{result: cResultBloodLust, low: 11, high: 15},
            {result: cResultNormal, low: 16, high: 53},
            {result: cResultShaken, low: 54, high: 62},
            {result: cResultShakenBack1, low: 63, high: 64},
            {result: cResultDisorganizedBack1, low: 65, high: 65},
            {result: cResultDisorganizedBack2, low: 66, high: 66},
            {result: cResultRouted, low: 0, high: 0}
		]
    },

    {
    	level: 'B+',
        results: [
        	{result: cResultBloodLust, low: 11, high: 14},
            {result: cResultNormal, low: 15, high: 53},
            {result: cResultShaken, low: 54, high: 62},
            {result: cResultShakenBack1, low: 63, high: 64},
            {result: cResultDisorganizedBack1, low: 65, high: 65},
            {result: cResultDisorganizedBack2, low: 66, high: 66},
            {result: cResultRouted, low: 0, high: 0  }
		]
	},
    {
    	level: 'B',
        results: [
        	{result: cResultBloodLust, low: 11, high: 13},
            {result: cResultNormal, low: 14, high: 46},
            {result: cResultShaken, low: 51, high: 55},
            {result: cResultShakenBack1, low: 56, high: 62},
            {result: cResultDisorganizedBack1, low: 63, high: 64},
            {result: cResultDisorganizedBack2, low: 65, high: 65},
            {result: cResultRouted, low: 66, high: 66}
        ]
    },
    {
    	level: 'C+',
        results: [
            {result: cResultBloodLust, low: 11, high: 12},
            {result: cResultNormal, low: 13, high: 45},
            {result: cResultShaken, low: 46, high: 55},
            {result: cResultShakenBack1, low: 56, high: 62},
            {result: cResultDisorganizedBack1, low: 63, high: 64},
            {result: cResultDisorganizedBack2, low: 65, high: 65},
            {result: cResultRouted, low: 66, high: 66}
        ]
	},
    {
    	level: 'C',
        results: [
        	{result: cResultBloodLust, low: 11, high: 12},
            {result: cResultNormal, low: 13, high: 42},
            {result: cResultShaken, low: 43, high: 53},
            {result: cResultShakenBack1, low: 54, high: 61},
            {result: cResultDisorganizedBack1, low: 62, high: 63},
            {result: cResultDisorganizedBack2, low: 64, high: 65},
            {result: cResultRouted, low: 66, high: 66}
        ]
    },
    {
    	level: 'D+',
        results: [
        	{result: cResultBloodLust, low: 11, high: 11},
            {result: cResultNormal, low: 12, high: 33},
            {result: cResultShaken, low: 34, high: 45},
            {result: cResultShakenBack1, low: 46, high: 55},
            {result: cResultDisorganizedBack1, low: 56, high: 62},
            {result: cResultDisorganizedBack2, low: 63, high: 64},
            {result: cResultRouted, low: 65, high: 66}
		]
    },
    {
    	level: 'D',
        results: [
        	{result: cResultBloodLust, low: 11, high: 11},
            {result: cResultNormal, low: 12, high: 26},
            {result: cResultShaken, low: 31, high: 44},
            {result: cResultShakenBack1, low: 45, high: 55},
            {result: cResultDisorganizedBack1, low: 56, high: 62},
            {result: cResultDisorganizedBack2, low: 63, high: 64},
            {result: cResultRouted, low: 65, high: 66}
		]
    },
    {
    	level: 'E+',
        results: [
        	{result: cResultBloodLust, low: 11, high: 11},
            {result: cResultNormal, low: 12, high: 25},
            {result: cResultShaken, low: 26, high: 43},
            {result: cResultShakenBack1, low: 44, high: 54},
            {result: cResultDisorganizedBack1, low: 55, high: 62},
            {result: cResultDisorganizedBack2, low: 63, high: 64},
            {result: cResultRouted, low: 65, high: 66}
		]
    },
    {
    	level: 'E',
        results: [
        	{result: cResultBloodLust, low: 0, high: 0},
            {result: cResultNormal, low: 11, high: 21},
            {result: cResultShaken, low: 22, high: 36},
            {result: cResultShakenBack1, low: 41, high: 52},
            {result: cResultDisorganizedBack1, low: 53, high: 56},
            {result: cResultDisorganizedBack2, low: 61, high: 63},
            {result: cResultRouted, low: 64, high: 66}
		]
    },
    {
    	level: 'F+',
        results: [
        	{result: cResultBloodLust, low: 0, high: 0},
            {result: cResultNormal, low: 11, high: 14},
            {result: cResultShaken, low: 15, high: 34},
            {result: cResultShakenBack1, low: 35, high: 51},
            {result: cResultDisorganizedBack1, low: 52, high: 56},
            {result: cResultDisorganizedBack2, low: 61, high: 63},
            {result: cResultRouted, low: 64, high: 66}
        ]
    },
    {
    	level: 'F',
        results: [
        	{result: cResultBloodLust, low: 0, high: 0},
            {result: cResultNormal, low: 11, high: 13},
            {result: cResultShaken, low: 14, high: 33},
            {result: cResultShakenBack1, low: 34, high: 46},
            {result: cResultDisorganizedBack1, low: 51, high: 55},
            {result: cResultDisorganizedBack2, low: 56, high: 63},
            {result: cResultRouted, low: 64, high: 66}
        ]
    },
    {
    	level: 'G+',
        results: [
        	{result: cResultBloodLust, low: 0, high: 0},
            {result: cResultNormal, low: 0, high: 0},
            {result: cResultShaken, low: 11, high: 31},
            {result: cResultShakenBack1, low: 32, high: 44},
            {result: cResultDisorganizedBack1, low: 45, high: 54},
            {result: cResultDisorganizedBack2, low: 55, high: 62},
            {result: cResultRouted, low: 63, high: 66}
		]
    },
    {
    	level: 'G',
        results: [
        	{result: cResultBloodLust, low: 0, high: 0},
            {result: cResultNormal, low: 0, high: 0},
            {result: cResultShaken, low: 11, high: 24},
            {result: cResultShakenBack1, low: 25, high: 42},
            {result: cResultDisorganizedBack1, low: 43, high: 52},
            {result: cResultDisorganizedBack2, low: 53, high: 61},
            {result: cResultRouted, low: 62, high: 66}
		]
    },
    {
    	level: 'H+',
        results: [
        	{result: cResultBloodLust, low: 0, high: 0},
            {result: cResultNormal, low: 0, high: 0},
            {result: cResultShaken, low: 11, high: 22},
            {result: cResultShakenBack1, low: 23, high: 36},
            {result: cResultDisorganizedBack1, low: 41, high: 46},
            {result: cResultDisorganizedBack2, low: 51, high: 56},
            {result: cResultRouted, low: 61, high: 66}
		]
    }
];

var modifiers = [
	'Low Ammo',
	'w/Unlimb Arty',
	'Trench',
	'Col/Limb/Flank',
	'Night',
	'Wrecked Bde',
	'Wrecked Div',
	'CC Attack',
	'CC Attack Special',
	'CC Defend',
	'Leader Loss'
];

module.exports = {
	levels: levels,
	modifiers: modifiers,
	states: states,
	getState(code) {
		return states.find((s) => s.code == code) || {};
	},
	getStateByDesc(desc) {
		return states.find((s) => s.desc == desc) || {};
	},
	isBloodLust(state) {
		return state == cStateBloodLust;
	},
	isNormal(state) {
		return state == cStateNormal;
	},
	isShaken(state) {
		return state == cStateShaken;
	},
	isDisorganized(state) {
		return state == cStateDisorganized;
	},
	isRouted(state) {
		return state == cStateRouted;
	},
	noResult: cResultNE,
	check(dice, level, leaderrating, leaderloss, state, unlimbarty, wreckedbde, wreckeddiv, trench,
			night, column, lowammo, ccdefender, ccattacker, ccattackerspecial, mod) {
		let result = cResultNE;

		if (this.isRouted(state)) {
			result = cResultRemainRouted;
		}
		else if (this.isBloodLust(state)) {
			if (dice >= 44) {
				result = cResultRemoveBloodLust;
			}
			else {//if (dice >= 11 && dice <= 43)
				result = cResultBloodLust;
			}
		}
		else {
			let ilevel = results.findIndex((mr) => mr.level == level);
			if (ilevel < 0)
				ilevel = results.length - 1;

			// modify level
			// these modifications are sign-opposite to those on the game table:
			//      in computer land, - is up the table and + is down the table...
			ilevel -= mod;

			if (trench) {
				ilevel -= 3;
			}
			if (unlimbarty) {
				ilevel--;
			}
			leaderrating--;
			if (leaderloss) {
				leaderrating *= -1;
			}

			ilevel -= leaderrating;

			if (lowammo) {
				ilevel++;
			}
			if (night) {
				ilevel += 3;
			}
			if (column) {
				ilevel += 6;
			}
			if (wreckedbde) {
				ilevel += 4;
			}
			else if (wreckeddiv) {
				ilevel += 6;
			}
			if (ccdefender) {
				ilevel += 4;
			}
			if (ccattackerspecial) {
				ilevel += 8;
			}
			else if (ccattacker) {
				ilevel += 6;
			}

			if (this.isShaken(state)) {
				ilevel++;
			}
			else if (this.isDisorganized(state)) {
				ilevel += 3;
			}
			else if (this.isRouted(state)) {
				ilevel += 6;
			}

			if (ilevel < 0) {
				ilevel = 0;
			}
			else if (ilevel >= results.length) {
				ilevel = results.length - 1;
			}

			let mr = results[ilevel].results.find((m) => (dice >= m.low && dice <= m.high));
			if (mr) {
				result = mr.result;
			}
		}
		return result;
	},

	rally(die, state, leaderrating) {
		return (this.isRouted(state) && (die - leaderrating <= 2)) ? 'Rally' : 'NE';
	}
}
