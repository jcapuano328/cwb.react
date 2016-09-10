'use strict'

var Current = require('./current');

var fireLevels = [
  {
    level: "AAA",
    strength: 26,
    range: 5
  },
  {
    level: "AAB",
    strength: 21,
    range: 5
  },
  {
    level: "AA",
    strength: 16,
    range: 5
  },
  {
    level: "AB",
    strength: 11,
    range: 5
  },
  {
    level: "A",
    strength: 6,
    range: 5
  },
  {
    level: "B",
    strength: 3,
    range: 3
  },
  {
    level: "C",
    strength: 0,
    range: 3
  }
];

let getSuperiorCommanders = (roster) => {
    let cmdrs = [];
    let add = (item) => {
        if (cmdrs.indexOf(item.commander) < 0) {
            cmdrs.push(item.commander);
        }
        (item.divisions || []).forEach(add);
    }

    [roster.corps, roster.divisions].forEach((item) => {
        item.forEach(add);
    });

    return cmdrs;
}

let getSubordinateCommanders = (roster) => {
    let cmdrs = [];
    let add = (item) => {
        if (cmdrs.indexOf(item.commander) < 0) {
            cmdrs.push(item.commander);
        }
        (item.divisions || item.brigades || []).forEach(add);
    }

    [roster.corps, roster.divisions, roster.independents].forEach((item) => {
        item.forEach(add);
    });

    return cmdrs;
}

let getCommandersForArmy = (country,army,superiors) => {
    let battle = Current.battle();
    let armies = battle.armies.filter((a) => a.country == country && a.name == army) || [];
    let commanders = superiors ? armies.map((a) => a.commander) : [];
    return commanders.concat(armies.map((a) =>
        superiors ? getSuperiorCommanders(a.roster) : getSubordinateCommanders(a.roster)
    ).reduce((a,b) => a.concat(b),[]));
}

let isWrecked = (item, bycasualty) => {
    if (bycasualty) {
        item.losses >= item.wreckLosses;
    }
    return (item.losses + item.stragglers) >= item.wreckLosses;
}
let isDestroyed = (item, bycasualty) => {
    if (bycasualty) {
        return item.losses >= item.totalStrength;
    }
    return (item.losses + item.stragglers) >= item.totalStrength;
}

let totalWreckedBrigades = (brigades, bycasualty) => {
    return (brigades||[]).reduce((p,c) => {
        return p + isWrecked(c, bycasualty);
    }, 0);
}

let totalWreckedInDivisions = (divisions, bycasualty) => {
    return (divisions||[]).reduce((p,c) => {
        return p + totalWreckedBrigades(c.brigades, bycasualty);
    }, 0);
}

let totalWreckedInCorps = (corps, bycasualty) => {
    return corps.reduce((p,c) => {
        return p + totalWreckedInDivisions(c.divisions, bycasualty) +
            totalWreckedBrigades(c.independents, bycasualty);
    }, 0);
}

let totalWreckedInArmy = (army, bycasualty) => {
    return totalWreckedInCorps(army.roster.corps, bycasualty) +
        totalWreckedInDivisions(army.roster.divisions, bycasualty) +
        totalWreckedBrigades(army.roster.independents);
}

module.exports = {
	getSuperiorLeaders(country,army) {
        return getCommandersForArmy(country,army,true);
    },
    getSubordinateLeaders(country,army) {
		return getCommandersForArmy(country,army);
    },
    totalWrecked(country) {
        let battle = Current.battle();
        let armies = battle.armies.filter((a) => a.country == country) || [];
        return armies.reduce((p,c) => {
            return p + totalWreckedInArmy(c);
        }, 0);
    },
    wreckedDivisions(item) {
        return item.divisions.reduce((p,c) => {
            return p + (this.wreckedBrigades(c)>=c.wreckLosses?1:0);
        }, 0);
    	return (item.losses + item.stragglers) >= item.wreckLosses;
    },
    wreckedBrigades(item) {
        return (item.brigades||item.independents).reduce((p,c) => {
            return p + (isWrecked(c)?1:0);
        }, 0);
    },
    destroyedBrigades(item) {
        return (item.brigades||item.independents).reduce((p,c) => {
            return p + (isDestroyed(c)?1:0);
        }, 0);
    },
    isWrecked: isWrecked,
    isDestroyed: isDestroyed,
    getFireLevels(strength) {
        let idx = fireLevels.findIndex((firelevel) => strength > firelevel.strength);
        return fireLevels.slice(idx);
    },
    getFireLevel(strength) {
    	return fireLevels.find((firelevel) => strength > firelevel.strength);
    }
};
