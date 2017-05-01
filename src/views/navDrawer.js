import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {NavDrawer} from 'react-native-nub';
import BattleNavMenuItem from './navDrawerMenuItemBattle';
import Icons from '../res';
import Battles from '../services/battles';
import getGame from '../selectors/game';
import {reset} from '../actions/current';

let NavigationDrawer = React.createClass({    
    onSelect(e) {                
        this.props.reset({battle: e.id, scenario: e.scenario.id});
        let s = getGame({current: {battle: e.id, scenario: e.scenario.id}});
        Actions.battle({title: s.name, subtitle: s.scenario.name});
    },    
    render () {
        return (            
            <NavDrawer menuItem={BattleNavMenuItem} items={Battles.battles} icons={Icons} onSelect={this.onSelect} >
                {this.props.children}
            </NavDrawer>                
        );
    }
});

module.exports = connect(null,{reset})(NavigationDrawer);