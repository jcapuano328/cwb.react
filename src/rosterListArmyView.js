'use strict';

var React = require('react');
import { View, TouchableOpacity, Text, Image } from 'react-native';
var RosterListCorpsView = require('./rosterListCorpsView');
var RosterListDivisionView = require('./rosterListDivisionView');
var RosterListBrigadeView = require('./rosterListBrigadeView');
var icons = require('./widgets/icons');
var Current = require('./services/current');

var RosterListArmyView = React.createClass({
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
                    <View style={{flex: 1,flexDirection: 'row',justifyContent: 'flex-start', alignItems: 'center',
                                    margin: 5,padding: 5,borderRadius: 3}}>
                        <Image style={{width: 28, height: 96, resizeMode: 'contain'}}
                            source={this.state.expanded ? icons['arrow-down'] : icons['arrow-right']} />
                        <Image style={{width: 96,height: 96,resizeMode: 'contain'}} source={icons[this.props.army.country]} />
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <Text style={{flex: 1, fontSize: 20,textAlign: 'center',margin: 10}}>{this.props.army.name}</Text>
                            <Text style={{flex: 1, fontSize: 15,textAlign: 'center',margin: 10}}>{this.props.army.commander}</Text>
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
        let roster = Current.roster(this.props.army.country, this.props.army.name).roster;
        return (
            <View style={{marginLeft: 20}}>
                {(roster.corps||[]).map((c,i) => {
                    return (
                        <RosterListCorpsView key={i} country={this.props.army.country} corps={c} />
                    );
                })}
                {(roster.divisions||[]).map((d,i) => {
                    return (
                        <RosterListDivisionView key={i} country={this.props.army.country} division={d} />
                    );
                })}
                {(roster.independents||[]).map((b,i) => {
                    return (
                        <RosterListBrigadeView key={i} country={this.props.army.country} brigade={b} />
                    );
                })}
            </View>
        );
    }
});

module.exports = RosterListArmyView;
