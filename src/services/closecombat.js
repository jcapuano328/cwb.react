const levels = [
	{
		code: 'AA',
		points: 6
	},
	{
		code: 'AB',
		points: 5
	},
	{
		code: 'A',
		points: 4
	},
	{
		code:'B',
		points: 2
	},
	{
		code: 'C',
		points: 1
	},
	{
		code: 'Arty',
		points: 1
	}
];

const results = [
	{
		odds: -2,
		results: ['Defender', 'Defender', 'Defender', 'Defender', 'Defender', 'Attacker']
	},
	{
		odds: 1,
		results: ['Defender', 'Defender',   'Defender',   'Defender',   '1/2', 'Attacker']
	},
	{
		odds: 2,
		results: ['Defender', 'Defender',   'Defender',   '1/2', 'Attacker',   'Attacker']
	},
	{
		odds: 3,
		results: ['Defender', 'Defender',   '1/2', 'Attacker',   'Attacker',   'Attacker']
	},
	{
		odds: 4,
		results: ['Defender', '1/2', '1/2', 'Attacker',   'Attacker',   'Attacker']
	}
];

const ccPoints = (lvls) => {
	let pts = lvls.reduce((p, lvl) => {
		var l = levels.find((level) => level.code == lvl) || {points: 0};
		return p + l.points;
	}, 0);
	return Math.min(pts, 6);
}

const getCCPoints = (attacklevels, defendlevels, defendtrench) => {
	let attackpts = ccPoints(attacklevels);
	let defendpts = ccPoints(defendlevels);

	if (defendtrench) {
		defendpts *= 2;
	}
	return {
		attacker: attackpts,
		defender: defendpts
	};
}

const calcOdds = (attacklevels, defendlevels, defendtrench) => {
	let pts = getCCPoints(attacklevels, defendlevels, defendtrench);

	let odds = (pts.attacker >= pts.defender)
		? Math.ceil(pts.attacker / pts.defender)
		: Math.ceil(pts.defender / pts.attacker) * -1;

	if (odds < -2) {
		odds = -2;
	}
	else if (odds > 4) {
		odds = 4;
	}

	return {
		odds: odds,
		text: odds < 0
			? ('1:' + (-1*odds))
			: odds + ':1'
	};
}

module.exports = {
	levels: levels,
	defaultLevel: levels[0],
	attackModifiers: [
		'Wrecked Bde'
	],
	defendModifiers: [
		'Trench',
		'Wrecked Bde',
		'Wrecked Div'
	],
	resolve(ccdie, tiebreakerdie, attacklevels, attackwreckedbde, defendlevels, defendtrench, defendwreckedbde, defendwreckeddiv) {
		let result = '???';
		let odds = calcOdds(attacklevels, defendlevels, defendtrench);
		let ccr = results.find((r) => r.odds == odds.odds);
		if (ccr) {
			if (defendwreckeddiv) {
				ccdie += 2;
			}
			else if (defendwreckeddiv) {
				ccdie += 1;
			}
			if (attackwreckedbde) {
				ccdie -= 2;
			}
			ccdie--; // index-ize it

			if (ccdie < 0) {
				ccdie = 0;
			}
			else if (ccdie >= ccr.results.length) {
				ccdie = ccr.results.length - 1;
			}

			result = ccr.results[ccdie];
			if (result == '1/2') {
				result = (tiebreakerdie < 4) ? 'Defender' : 'Attacker';
			}
		}
		return result;
	}
};
