'use strict'

var React = require('react');
import { View, ScrollView } from 'react-native';
var RosterListArmyView = require('./rosterListArmyView');
var RosterListBrigadeView = require('./rosterListBrigadeView');
var log = require('./services/log');

var RosterListView = React.createClass({
    render() {
        return (
            <View style={{flex: 1,justifyContent: 'flex-start'}}>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}>
                    {(this.props.armies||[]).map((army, i) => {
                        return (
                            <RosterListArmyView key={i} army={army} events={this.props.events} />
                        );
                    })}
                    {/*<RosterListBrigadeView country={'USA'} army={'APot'} brigade={{
                        id: 570,
                        name: '2-3-9',
                        commander: 'Humphrey',
                        moraleLevel: 'C',
                        totalStrength: 23,
                        losses: 0,
                        stragglers: 0,
                        wreckLosses: 10
                    }} events={this.props.events} />*/}
                    {/*<RosterListBrigadeView country={'USA'} army={'APot'} brigade={{
                        id: 512,
                        name: '1-1-2',
                        commander: 'Miles',
                        moraleLevel: 'B',
                        totalStrength: 11,
                        losses: 0,
                        stragglers: 0,
                        wreckLosses: 5
                    }} events={this.props.events} />*/}

                </ScrollView>
            </View>
        );
    }
});

module.exports = RosterListView;
