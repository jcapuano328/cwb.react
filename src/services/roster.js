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

const getSuperiorCommanders = (roster) => {
    let cmdrs = [];
    let add = (item) => {
        if (!cmdrs.find((c) => c.name === item.commander.name)) {
            cmdrs.push(item.commander);
        }
        (item.divisions || []).forEach(add);
    }

    [roster.corps, roster.divisions].forEach((item) => {
        item.forEach(add);
    });

    return cmdrs;
}

const getSubordinateCommanders = (roster) => {
    let cmdrs = [];
    let add = (item) => {
        if (!cmdrs.find((c) => c.name === item.commander.name)) {
            cmdrs.push(item.commander);
        }
        (item.divisions || item.brigades || []).forEach(add);
    }

    [roster.corps||[], roster.divisions||[], roster.brigades||[], roster.independents||[]].forEach((item) => {
        item.forEach(add);
    });

    return cmdrs;
}

const getCommandersForArmy = (battle,country,army,superiors) => {    
    let armies = battle.armies.filter((a) => a.country == country && a.name == army) || [];
    let commanders = superiors ? armies.map((a) => a.commander) : [];
    return commanders.concat(armies.map((a) =>
        superiors ? getSuperiorCommanders(a.roster) : getSubordinateCommanders(a.roster)
    ).reduce((a,b) => a.concat(b),[]));
}

const isWrecked = (item, bycasualty) => {
    if (bycasualty) {
        item.losses >= item.wreckLosses;
    }
    return (item.losses + item.stragglers) >= item.wreckLosses;
}
const isDestroyed = (item, bycasualty) => {
    if (bycasualty) {
        return item.losses >= item.totalStrength;
    }
    return (item.losses + item.stragglers) >= item.totalStrength;
}

const totalWreckedBrigades = (brigades, bycasualty) => {
    return (brigades||[]).reduce((p,c) => {
        return p + isWrecked(c, bycasualty);
    }, 0);
}

const totalWreckedInDivisions = (divisions, bycasualty) => {
    return (divisions||[]).reduce((p,c) => {
        return p + totalWreckedBrigades(c.brigades, bycasualty);
    }, 0);
}

const totalWreckedInCorps = (corps, bycasualty) => {
    return corps.reduce((p,c) => {
        return p + totalWreckedInDivisions(c.divisions, bycasualty) +
            totalWreckedBrigades(c.independents, bycasualty);
    }, 0);
}

const totalWreckedInArmy = (army, bycasualty) => {
    return totalWreckedInCorps(army.roster.corps, bycasualty) +
        totalWreckedInDivisions(army.roster.divisions, bycasualty) +
        totalWreckedBrigades(army.roster.independents);
}

module.exports = {
    getArmyLeader(battle,country,army) {
        //let c = this.getSuperiorLeaders(battle,country,army);
        let armies = battle.armies.filter((a) => a.country == country && a.name == army) || [];
        let commanders = armies.map((a) => a.commander);
        return commanders && commanders.length > 0 ? commanders[0] : {};        
    },
	getSuperiorLeaders(battle,country,army) {
        return getCommandersForArmy(battle,country,army,true);
    },
    getSubordinateLeaders(battle,country,army) {
        return getCommandersForArmy(battle,country,army);        
    },
    getSubordinatesForLeader(battle,country,army,name) {
        let formation = this.getFormationForLeader(battle,country,army,name);        
        return formation
            ? [formation.commander].concat(getSubordinateCommanders(formation))
            : this.getSubordinateLeaders(battle,country,army);        
    },
    getLeader(battle,country,army,name) {
        let l = getCommandersForArmy(battle,country,army,true);
        return l.find((c) => c.name === name) || {name: name, rating: 1};
    },
    getFormationForLeader(battle,country,army,name) {
        let armies = battle.armies.filter((a) => a.country == country && a.name == army) || [];
        let formation = null;

        armies.find((a) => {            
            let find = (item) => {
                if (item.commander && item.commander.name === name) {
                    formation = item;
                } else {
                    formation = (item.divisions || item.brigades || []).find(find);
                }
                return formation;
            }
            
            [a.roster.corps||[], a.roster.divisions||[],a.roster.independents||[]].find((item) => {                
                item.find(find);
                return formation;
            });                

            return formation;
        });
        return formation;        
    },
    getFormationForLeaderWreckStatus(battle,country,army,name) {
        let formation = this.getFormationForLeader(battle,country,army,name);
        if (formation) {
            if (formation.brigades || formation.independents) {
                return {
                    name: formation.name,
                    total: (formation.brigades||[]).length + (formation.independents||[]).length,
                    wrecked: this.wreckedBrigades(formation)
                };
            }

            if (formation.divisions) {
                return {
                    name: formation.name,
                    total: formation.divisions.length,
                    wrecked: this.wreckedDivisions(formation)
                };
            }            
        }        
        return {name: '', total: 0, wrecked: 0};
    },
    getBrigade(roster, brigade) {
        let formation = null;
        const find = (item) => {
            if (item.id === brigade.id) {
                formation = item;
            } else {
                [item.divisions||[], item.brigades||[], item.independents||[]].find((iitem) => iitem.find(find));
            }
            return formation;
        }    
        [roster.corps||[], roster.divisions||[], roster.brigades||[], roster.independents||[]].find((item) => {
            item.find(find);
            return formation;
        });        
        return formation;    
    },
    totalWrecked(battle,country,bycasualty) {
        let armies = battle.armies.filter((a) => a.country == country) || [];
        return armies.reduce((p,c) => {
            return p + totalWreckedInArmy(c,bycasualty);
        }, 0);
    },
    wreckedDivisions(item) {
        return item.divisions.reduce((p,c) => {
            return p + (this.wreckedBrigades(c)>=c.wreckLosses?1:0);
        }, 0);    	
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
