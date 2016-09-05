'use strict';

var React = require('react');
import { View, Text, Image } from 'react-native';
var icons = require('./widgets/icons');
var Roster = require('./services/roster');

var RosterListBrigadeView = React.createClass({
    render() {
        console.log(this.props.brigade);
        return (
            <View style={{flex: 1,flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',
                            margin: 5,padding: 5,backgroundColor: '#eaeaea',//backgroundColor: 'gray',
                            borderColor: 'gray',borderStyle: 'solid',borderWidth: 1,borderRadius: 10}}>
                <Image style={{width: 32, height: 32, resizeMode: 'contain'}} source={icons[this.props.country.toLowerCase()+'-brigade']} />
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Text style={{flex: 1, fontSize: 20,textAlign: 'center',margin: 10}}>{this.props.brigade.name}</Text>
                    <Text style={{flex: 1, fontSize: 15,textAlign: 'center',margin: 10}}>{this.props.brigade.commander}</Text>
                    <Text style={{flex: 1, fontSize: 15,textAlign: 'center',margin: 10}}>{this.props.brigade.moraleLevel}</Text>
                    <Text style={{flex: 1, fontSize: 15,textAlign: 'center',margin: 10}}>{Roster.getFireLevel(this.props.brigade.totalStrength-this.props.brigade.losses-this.props.brigade.stragglers).level}</Text>
                </View>
            </View>
        );
    }
});

module.exports = RosterListBrigadeView;
