'use strict';

var React = require('react');
import { View, TouchableOpacity, Text, Image } from 'react-native';
var RosterListDivisionView = require('./rosterListDivisionView');
var RosterListBrigadeView = require('./rosterListBrigadeView');
var RosterBoxes = require('./rosterBoxes');
var icons = require('./widgets/icons');
var Roster = require('./services/roster');

var RosterListCorpsView = React.createClass({
    getInitialState() {
        return {
            expanded: false
        };
    },
    onPress() {
        this.setState({expanded: !this.state.expanded});
    },
    render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1,flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',
                                    margin: 5,padding: 5,borderRadius: 3}}>
                        <Image style={{width: 28, height: 32, resizeMode: 'contain'}}
                            source={this.state.expanded ? icons['arrow-down'] : icons['arrow-right']} />
                        <Image style={{width: 32, height: 32, resizeMode: 'contain'}} source={icons[this.props.country.toLowerCase()+'-corps']} />
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <Text style={{flex: 1, fontSize: 20,textAlign: 'center',margin: 10}}>{this.props.corps.name}</Text>
                            <Text style={{flex: 1, fontSize: 15,textAlign: 'center',margin: 10}}>{this.props.corps.commander}</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <RosterBoxes total={this.props.corps.divisions.length} casualties={Roster.wreckedDivisions(this.props.corps)} />
                        </View>
                    </View>
                    {this.renderSubordinates()}
                </View>
            </TouchableOpacity>
        );
    },
    renderSubordinates() {
        if (!this.state.expanded) {
            return (<Text />);
        }

        return (
            <View style={{marginLeft: 20}}>
                {(this.props.corps.divisions||[]).map((d,i) => {
                    return (
                        <RosterListDivisionView key={i} country={this.props.country} army={this.props.army} division={d} events={this.props.events} />
                    );
                })}
                {(this.props.corps.independents||[]).map((b,i) => {
                    return (
                        <RosterListBrigadeView key={i} country={this.props.country} army={this.props.army} brigade={b} events={this.props.events} />
                    );
                })}
            </View>
        );
    }
});

module.exports = RosterListCorpsView;
