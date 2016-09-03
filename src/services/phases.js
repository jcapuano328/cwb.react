var phases = [
	'Order Issue',
	'Corps Attack Stoppage Check',
	'Initiative Order Determination',
	'Delay Reduction',
	'New Order Acceptance',
	'Straggler Recovery Placement',
	'Movement / Close Combat',
	'Ammo Resupply',
	'Defensive Fire',
	'Offensive Fire',
	'Straggler Recovery',
	'Rally'
];

module.exports = {
	count: phases.length,
	all: function() {
    	return phases;
    },
    get: function(idx) {
    	if (idx > -1 && idx < phases.length) {
        	return phases[idx];
        }
    }
};
