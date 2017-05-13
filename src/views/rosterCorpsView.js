import React from 'react';
import { View } from 'react-native';
import CollapsibleHeader from '../components/collapsibleHeader';
import RosterDivisionView from './rosterDivisionView';
import RosterBrigadeView from './rosterBrigadeView';
import RosterBoxes from './rosterBoxes';
import Icons from '../res';
import Roster from '../services/roster';

var RosterCorpsView = React.createClass({
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
                <View style={{flex: 1,flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',
                                margin: 5,padding: 5,borderRadius: 3}}>                
                    <View style={{flex: 3}}>
                        <CollapsibleHeader image={this.props.country.toLowerCase()+'-corps'} imagesize={64}
                            title={this.props.corps.name} subtitle={this.props.corps.commander.name} 
                            expanded={this.state.expanded} onPress={this.onToggle} />
                    </View>
                    <View style={{flex: 2, alignItems: 'flex-end'}}>
                        <RosterBoxes total={this.props.corps.divisions.length} casualties={Roster.wreckedDivisions(this.props.corps)} />
                    </View>
                </View>                        
                {this.renderSubordinates()}
            </View>            
        );
    },
    renderSubordinates() {
        if (!this.state.expanded) {
            return null;
        }

        return (
            <View style={{marginLeft: 20}}>
                {(this.props.corps.divisions||[]).map((d,i) => {
                    return (
                        <RosterDivisionView key={i} country={this.props.country} army={this.props.army} division={d} />
                    );
                })}
                {(this.props.corps.independents||[]).map((b,i) => {
                    return (
                        <RosterBrigadeView key={i} country={this.props.country} army={this.props.army} brigade={b} />
                    );
                })}
            </View>
        );
    }
});

module.exports = RosterCorpsView;
