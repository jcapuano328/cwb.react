'use strict';

var React = require('react');
import { View, Text, Image } from 'react-native';
var icons = require('./widgets/icons');
var RosterBoxes = require('./rosterBoxes');
var Roster = require('./services/roster');

var RosterListBrigadeView = React.createClass({
    render() {
        return (
            <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'flex-start',
                            margin: 5,padding: 5,backgroundColor: '#eaeaea',//backgroundColor: 'gray',
                            borderColor: 'gray',borderStyle: 'solid',borderWidth: 1,borderRadius: 10}}>

                <View style={{flex: 1,flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center'}}>
                    <Image style={{width: 32, height: 32, resizeMode: 'contain'}} source={icons[this.getImage()]} />
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Text style={{flex: 1, fontSize: 20,textAlign: 'center',margin: 10}}>{this.props.brigade.name}</Text>
                        <Text style={{flex: 1, fontSize: 15,textAlign: 'center',margin: 10}}>{this.props.brigade.commander}</Text>
                        <Text style={{flex: 1, fontSize: 15,textAlign: 'center',margin: 10}}>{this.props.brigade.moraleLevel}</Text>
                        <Text style={{flex: 1, fontSize: 15,textAlign: 'center',margin: 10}}>{Roster.getFireLevel(this.props.brigade.totalStrength-this.props.brigade.losses-this.props.brigade.stragglers).level}</Text>
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <RosterBoxes total={this.props.brigade.totalStrength}
                        casualties={this.props.brigade.losses}
                        stragglers={this.props.brigade.stragglers}
                        wreckLosses={this.props.brigade.wreckLosses}
                        displayLevel={true}
                    />
                </View>
            </View>
        );
    },
    getImage() {
        let image = this.props.country.toLowerCase()+'-brigade';
        if (Roster.isDestroyed(this.props.brigade)) {
            image += '-destroyed';
        }
        else if (Roster.isWrecked(this.props.brigade)) {
            image += '-wrecked';
        }
        return image;
    }
});

module.exports = RosterListBrigadeView;
