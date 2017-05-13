import Morale from './morale';
import Stragglers from './stragglers';

const firePoints = [
	{
		code: '< 1',
		points: 0.5
	},
	{
		code: '1',
		points: 1
	},
	{
		code: '2',
		points: 2
	},
	{
		code: '3-4',
		points: 3
	},
	{
		code: '5-6',
		points: 5
	},
	{
		code: '7-8',
		points: 7
	},
	{
		code: '9-11',
		points: 9
	},
	{
		code: '12-14',
		points: 12
	},
	{
		code: '15-17',
		points: 15
	},
	{
		code: '18-20',
		points: 18
	},
	{
		code: '21+',
		points: 21
	}
];

const attackModifiers = [
	{name: 'Up Slope', type: 'shift', value: -1},
	{name: 'Low Ammo', type: 'shift', value: -1},
	{name: 'DG', type: 'mult', value: 0.5},
	{name: 'CC Flank', type: 'shift', value: -3},
	{name: 'Swamp', type: 'shift', value: -1},
	{name: 'Night', type: 'shift', value: -2}
];

const defendModifiers = [
	{name: 'Low Ammo', type: 'drm', value: -1},
	{name: 'w/Unlimb Arty', type: 'drm', value: 1},
	{name: 'Trench', type: 'shift', value: -1},
	{name: 'Col/Limb/Flank', type: 'shift', value: +2},
	{name: 'Mounted', type: 'shift', value: +3},
	{name: 'Wrecked Bde', type: 'shift', value: +3},
	{name: 'Wrecked Div', type: 'shift', value: +3},
	{name: 'CC Attack', type: 'drm', value: -1},
	{name: 'CC Attack Special', type: 'drm', value: -2},
	{name: 'CC Defend', type: 'drm', value: -2}
];

const results = [
	{
		low: -999,
		high: 0,
		results: ['0', '0', '0', '0', '0', '0', 'm-2', 'm-1', 'm', '.5', '.5', '.5']
	},
	{
		low: 1,
		high: 1,
		results: ['0', '0', '0', '0', 'm-2', 'm-1', 'm', '.5', '1', '1', '1']
	},
	{
		low: 2,
		high: 2,
		results: ['0', 'm-2', 'm-2', 'm-1', 'm', '.5', '1', '1', '1', '1', '1.5']
	},
	{
		low: 3,
		high: 4,
		results: ['m-1', 'm', '.5', '.5', '.5', '1', '1', '1', '1.5', '1.5', '2']
	},
	{
		low: 5,
		high: 6,
		results: ['.5', '.5', '.5', '1', '1', '1', '1.5', '1.5', '1.5', '2', '2']
	},
	{
		low: 7,
		high: 8,
		results: ['.5', '1', '1', '1', '1', '1.5', '1.5', '1.5', '2', '2', '2.5']
	},
	{
		low: 9,
		high: 11,
		results: ['1', '1', '1', '1', '1.5', '1.5', '1.5', '2', '2', '2.5', '2.5']
	},
	{
		low: 12,
		high: 14,
		results: ['1', '1', '1', '1.5', '1.5', '1.5', '2', '2', '2.5', '2.5', '3']
	},
	{
		low: 15,
		high: 17,
		results: ['1', '1', '1.5', '1.5', '1.5', '2', '2', '2.5', '2.5', '3', '3.5']
	},
	{
		low: 18,
		high: 20,
		results: ['1', '1.5', '1.5', '1.5', '2', '2', '2.5', '2.5', '3', '3.5', '3.5']
	},
	{
		low: 21,
		high: 999,
		results: ['1.5', '1.5', '1.5', '2', '2', '2.5', '2.5', '3', '3.5', '3.5', '4']
	}
];

const findResult = (firepoints, attackupslope, attacknight, attacklowammo, attackdg, attackccflank, attackswamp,
						defendtrench, defendcolumn, defendmounted, defendmoralestate) => {
	if (attackdg) {
		firepoints /= 2;
	}

	let index = results.findIndex((r) => firepoints >= r.low && firepoints <= r.high);
	if (index == -1) {return null;}

	// shifts
	if (attackupslope) {
		index--;
	}
	if (attacknight) {
		index -= 2;
	}
	if (attacklowammo) {
		index--;
	}
	if (attackccflank) {
		index -= 3;
	}
	if (attackswamp) {
		index--;
	}
	if (defendtrench) {
		index--;
	}
	if (defendcolumn ||
		Morale.isDisorganized(Morale.getStateByDesc(defendmoralestate).code) || Morale.isRouted(Morale.getStateByDesc(defendmoralestate).code)) {
		index += 2;
	}
	if (defendmounted) {
		index += 3;
	}

	if (index < 0) {
		index = 0;
	}
	else if (index >= results.length) {
		index = results.length - 1;
	}

	return results[index];
}

const isMoraleResult = (result) => {
	return result && result.length > 0 && result.charAt(0) == 'm';
}

const moraleMod = (result) => {
	return result && result.length > 2 ? parseInt(result.charAt(2)) : 0;
}

module.exports = {
	points: firePoints,
	defaultPoints: firePoints[3],
	attackModifiers: attackModifiers,
	defendModifiers: defendModifiers,
	resolve(firedice,lossdie,stragglerdie,moraledice,leaderlossdice,
			attackpoints,attackupslope,attacklowammo,attackdg,attackccflank,attackswamp,attacknight,
			defendmoralelevel,defendleaderrating,defendmoralestate,defendlowammo,defendtrench,defendmounted,
			defendcolumn,defendunlimbarty,defendwreckedbde,defendwreckeddiv,defendccdefend,defendccattack,defendccattackspecial) {
		let casualty = 0;
		let straggler = 0;
		let morale = Morale.noResult;
		let leaderloss = false;
		let lowammo = (firedice >= 11);

		let firepoints = firePoints.find((fp) => fp.code == attackpoints) || {points:0};
		let fr = findResult(firepoints.points, attackupslope, attacknight, attacklowammo, attackdg, attackccflank, attackswamp,
								defendtrench, defendcolumn, defendmounted, defendmoralestate);
		if (fr != null) {
			let moralecheck = false;
			let moralemod = 0;

			firedice -= 2;	// index-ize

			let result = fr.results[firedice];
			if (isMoraleResult(result)) {
				moralecheck = true;
				moralemod = moraleMod(result);
			}
			else {
				let losses = parseFloat(result);
				if (losses > 0 && lossdie > 3) {
					losses += 0.5;
				}
				if (losses > 0) {
					straggler = Stragglers.losses(stragglerdie, losses,
												defendmoralelevel, defendmoralestate.code, defendcolumn, defendmounted,
												attacknight, defendwreckedbde || defendwreckeddiv);
					moralecheck = true;
					// check for leader casualty...
					casualty = Math.floor(losses);
					if (casualty > 0) {
						leaderloss = (leaderlossdice <= 2 || leaderlossdice >= 11);
					}
				}
			}
			if (moralecheck) {
				morale = Morale.check(moraledice,
							defendmoralelevel, defendleaderrating, leaderloss, defendmoralestate.code,
							defendunlimbarty, defendwreckedbde, defendwreckeddiv,
							defendtrench, attacknight, defendcolumn, defendlowammo,
							defendccdefend, defendccattack, defendccattackspecial, moralemod);
				straggler += morale.stragglers;
			}
		}

		return {
			casualty: casualty,
			straggler: straggler,
			morale: morale.morale,
			retreat: morale.retreat,
			leaderloss: leaderloss,
			lowammo: lowammo
		};
	}
};
