import React from 'react';
import { View } from 'react-native';
import CollapsibleHeader from '../components/collapsibleHeader';
import RosterCorpsView from './rosterCorpsView';
import RosterDivisionView from './rosterDivisionView';
import RosterBrigadeView from './rosterBrigadeView';
import Icons from '../res';

var RosterArmyView = React.createClass({
    getInitialState() {
        return {
            expanded: false
        };
    },
    onToggle() {
        this.setState({expanded: !this.state.expanded});
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <CollapsibleHeader image={this.props.army.country} title={this.props.army.name} subtitle={this.props.army.commander.name} expanded={this.state.expanded} onPress={this.onToggle} />
                {this.renderSubordinates()}
            </View>            
        );
    },
    renderSubordinates() {
        if (!this.state.expanded) {
            return null;
        }

        let roster = this.props.army.roster || {};
        return (
            <View style={{marginLeft: 20}}>
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
    }
});

module.exports = RosterArmyView;
