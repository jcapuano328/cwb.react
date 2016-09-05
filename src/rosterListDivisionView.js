'use strict';

var React = require('react');
import { View, TouchableOpacity, Text, Image } from 'react-native';
var RosterListBrigadeView = require('./rosterListBrigadeView');
var RosterBoxes = require('./rosterBoxes');
var icons = require('./widgets/icons');
var Roster = require('./services/roster');

var RosterListDivisionView = React.createClass({
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
                        <Image style={{width: 32, height: 32, resizeMode: 'contain'}} source={icons[this.getImage()]} />
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <Text style={{flex: 1, fontSize: 20,textAlign: 'center',margin: 10}}>{this.props.division.name}</Text>
                            <Text style={{flex: 1, fontSize: 15,textAlign: 'center',margin: 10}}>{this.props.division.commander}</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <RosterBoxes total={this.props.division.brigades.length}
                                casualties={Roster.wreckedBrigades(this.props.division)}
                                wreckLosses={this.props.division.wreckLosses}
                            />
                        </View>
                    </View>
                    {this.renderSubordinates()}
                </View>
            </TouchableOpacity>
        );
    },
    getImage() {
        let image = this.props.country.toLowerCase()+'-division';
        if (Roster.destroyedBrigades(this.props.division) >= this.props.division.brigades.length) {
            image += '-destroyed';
        }
        else if (Roster.wreckedBrigades(this.props.division) >= this.props.division.wreckLosses) {
            image += '-wrecked';
        }
        return image;
    },
    renderSubordinates() {
        if (!this.state.expanded) {
            return (<Text />);
        }

        return (
            <View style={{marginLeft: 20}}>
                {this.props.division.brigades.map((b,i) => {
                    return (
                        <RosterListBrigadeView key={i} country={this.props.country} brigade={b} />
                    );
                })}
            </View>
        );
    }
});

module.exports = RosterListDivisionView;
