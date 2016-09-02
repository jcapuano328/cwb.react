var phases = [
	"Phase 1",
	"Phase 2",
	"Phase 3",
	"Phase 4",
	"Phase 5",
	"Phase 6"
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
