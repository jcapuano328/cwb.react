'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var TurnView = require('./turnView');
var Current = require('./services/current');
var icons = require('./widgets/icons');
var OrdersView = require('./ordersView');
var RosterView = require('./rosterView');

var BattleView = React.createClass({
    getInitialState() {
        return {
            battle: this.props.battle,
            initialPage: 1
        };
    },
    componentWillMount: function() {
        this.props.events.addListener('menureset', this.onReset);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },
    onReset() {
        Current.reset(this.props.battle)
        .then((current) => {
            this.props.events.emit('reset');
        })
        .done();
    },
    onChangeTab({i, ref}) {
    },
    render() {
        let battle = this.state.battle || {};
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
                <TurnView logo={icons[battle.image]} events={this.props.events} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    onChangeTab={this.onChangeTab}
                    initialPage={this.state.initialPage}
                >
                    <OrdersView tabLabel="Orders" events={this.props.events} />
                    <RosterView tabLabel="Roster" events={this.props.events} />
                    <Text tabLabel="Fire" events={this.props.events} />
                    <Text tabLabel="Close Combat" events={this.props.events} />
                    <Text tabLabel="Morale" events={this.props.events} />
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = BattleView;
