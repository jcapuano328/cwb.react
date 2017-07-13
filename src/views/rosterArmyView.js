import React from 'react';
import { View,ScrollView } from 'react-native';
import RosterCorpsView from './rosterCorpsView';
import RosterDivisionView from './rosterDivisionView';
import RosterBrigadeView from './rosterBrigadeView';
import Icons from '../res';

var RosterArmyView = React.createClass({
    render() {
        return (
            <View style={{flex: 1/*, backgroundColor:this.getBackground()*/}}>
                <ScrollView                    
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}>
                        {this.renderSubordinates()}                        
                </ScrollView>                                
            </View>            
        );
    },
    renderSubordinates() {
        let roster = this.props.army.roster || {};
        return (
            <View style={{}}>
                {(roster.corps||[]).map((c,i) => {
                    return (
                        <RosterCorpsView key={i} country={this.props.army.country} army={this.props.army.name} corps={c} />
                    );
                })}
                {(roster.divisions||[]).map((d,i) => {
                    return (
                        <RosterDivisionView key={i} country={this.props.army.country} army={this.props.army.name} division={d} />
                    );
                })}
                {(roster.independents||[]).map((b,i) => {
                    return (
                        <RosterBrigadeView key={i} country={this.props.army.country} army={this.props.army.name} brigade={b} />
                    );
                })}
            </View>
        );
    },
    getBackground() {
        return this.props.army.country.toLowerCase() == 'usa' ? 'rgba(0,0,139,0.5)' : 'darkgray';
    }    
});

module.exports = RosterArmyView;
