'use strict'

var React = require('react');
import { View, ScrollView } from 'react-native';
var RosterListArmyView = require('./rosterListArmyView');
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
                            <RosterListArmyView key={i} army={army} />
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
});

module.exports = RosterListView;
