'use strict'

var acceptances = [
	{
    	acceptance: -3,
        statuses: [4,4,3,3,3,3,2,3,4,4,4]
    },
	{
    	acceptance: -1,
        statuses: [4,4,3,3,3,2,2,3,3,4,4]
    },
	{
    	acceptance: 1,
        statuses: [4,4,3,3,3,2,2,2,3,3,4]
    },
	{
    	acceptance: 3,
        statuses: [4,4,3,3,1,2,2,2,3,3,3]
    },
	{
    	acceptance: 5,
        statuses: [4,3,2,1,2,2,3,1,2,2,3]
    },
	{
    	acceptance: 7,
        statuses: [4,3,1,1,2,2,2,1,1,3,3]
    },
	{
    	acceptance: 999,
        statuses: [4,3,1,1,1,2,2,1,2,3,3]
    }
];

var stoppage = [
	{
    	leader: 0,
        stoppage: [4, 7, 10, 12]
	},
	{
    	leader: 2,
        stoppage: [3, 6, 9, 11]
	},
	{
    	leader: 4,
        stoppage: [3, 5, 8, 10]
	}
];
var stoppagePoints = [
	{
    	totdivs: 1,
        pts: [1,3,4]
    },
	{
    	totdivs: 2,
        pts: [1,2,3,4]
    },
	{
    	totdivs: 3,
        pts: [1, 2, 2, 3, 4]
    },
	{
    	totdivs: 4,
        pts: [1, 2, 2, 2, 3, 4]
    },
	{
    	totdivs: 5,
        pts: [1, 1, 2, 2, 3, 3, 4]
    },
	{
    	totdivs: 6,
        pts: [1, 1, 2, 2, 2, 3, 3, 4]
    },
	{
    	totdivs: 7,
        pts: [1, 1, 2, 2, 2, 2, 3, 3, 4]
    },
	{
    	totdivs: 8,
        pts: [1, 1, 2, 2, 2, 2, 2, 3, 3, 4]
    },
	{
    	totdivs: 9,
        pts: [1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4]
    },
	{
    	totdivs: 10,
        pts: [1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4]
    }
];

var methods = [
    {
      method: "AO",
      desc: 'Aide Oral',
      acceptance: -1,
      cost: 2
    },
    {
      method: "AW",
      desc: 'Aide Written',
      acceptance: 0,
      cost: 5
    },
    {
      method: "IPV",
      desc: 'In Person Verbal',
      acceptance: 2,
      cost: 2
    },
    {
      method: "Init",
      desc: 'Initiative',
      acceptance: 0,
      cost: 0
    }
];

var types = [
	{
	  type: "Simple",
	  desc: "Simple",
	  acceptance: 0,
	  cost: 1
	},
	{
	  type: "Complex",
	  desc: "Complex",
	  acceptance: -2,
	  cost: 3
	}
];

var statuses = [
	{
	  type: "InTransit",
	  desc: "In Transit",
	  delayreduction: 0
	},
	{
	  type: "Accepted",
	  desc: "Accepted",
	  delayreduction: 0
	},
	{
	  type: "Delay1",
	  desc: "Delay 1",
	  delayreduction: 2
	},
	{
	  type: "Delay2",
	  desc: "Delay 2",
	  delayreduction: 1
	},
	{
	  type: "Distorted",
	  desc: "Distorted",
	  delayreduction: 0
	},
	{
	  type: "Stopped",
	  desc: "Stopped",
	  delayreduction: 0
	}
];

module.exports = {
	methods: methods,
    getMethod(method) {
    	return methods.find((m) => m.method == method) || {};
    },
	getMethodByDesc(desc) {
    	return methods.find((m) => m.desc == desc) || {};
    },
	types: types,
    getType(type) {
    	return types.find((t) => t.type == type) || {};
    },
	getTypeByDesc(desc) {
    	return types.find((t) => t.desc == desc) || {};
    },
	statuses: statuses,
    getStatus(status) {
    	return statuses.find((s) => s.type == status) || {};
    },
	nextStatus(status) {
		let idx = statuses.findIndex((s) => s.type == status);
		if (++idx >= statuses.length) { idx = 0;}
		return statuses[idx].type;
	},
	cost(order) {
        let method = this.getMethod(order.method);
        let type = this.getType(order.type);

		return (method ? method.cost : 0) + (type ? type.cost : 0);
	},
	initiative(dice, initiative, antiinitiative) {
		if (dice == 2) {
			return "Loose Cannon";
		}

		let initpts = initiative - antiinitiative;
        let init = 0;
		if (initpts <= 0) {
			init = 12;
		} else if (initpts <= 2) {
			init = 11;
		} else if (initpts <= 3) {
			init = 10;
		} else if (initpts <= 4) {
			init = 9;
		} else {
			init = 12;
		}

		return (dice >= init) ? 'Initiative' : 'Indecision';
	},
    accept(dice, sender, receiver, currentorders, method, type) {
		method = this.getMethod(order.method);
        type = this.getType(order.type);

    	let accept = sender + receiver + method.acceptance + type.acceptance + (currentorders ? -1 : 0);
        let oa = acceptances.find((a) => accept <= a.acceptance);

        // turn into an index
        dice -= 2;

        return statuses[oa.statuses[dice]];
    },
    delayReduction(die, status) {
    	var os = this.getStatus(status);
        if (os && die <= os.delayreduction) {
        	return statuses[1];	// accepted
        }
        return os;	// original status
    },
    stop(dice, totaldiv, wreckeddiv, leader, leaderlost, defensiveorder, night) {
		if (leaderlost) { wreckeddiv++; }
		if (night) { dice -= 3; }
		if (defensiveorder) { dice++; }

		var osp = stoppagePoints.find((osp) => osp.totdivs <= totaldiv);
        if (wreckeddiv >= osp.pts.length) {
        	wreckeddiv = osp.pts.length - 1;
        }
        var stop = osp.pts[wreckeddiv] - 1;	// index-ify
        var os = stoppage.find((os) => os.leader <= leader);

		if (dice < os.stoppage[stop])
        	return statuses[5];	// stopped
		return statuses[1];	// still accepted
    }
};
