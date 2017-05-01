import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import TurnView from './turnView';
import OrdersView from './ordersView';
import Icons from '../res';
import getGame from '../selectors/game';

var BattleView = React.createClass({
    getInitialState() {
        return {
            initialPage: 0
        };
    },
    render() {        
        return (
            <View style={{flex: 1, marginTop: Style.Scaling.scale(44),backgroundColor: 'rgba(0,0,0,0.01)'}}>            
                <TurnView logo={Icons[this.props.battle.image]} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    tabBarTextStyle={{fontSize: Style.Font.medium()}}
                    initialPage={this.state.initialPage}                    
                >
                    <OrdersView tabLabel="Orders" />
                    <View tabLabel="Roster" />
                    <View tabLabel="Fire" />
                    <View tabLabel="Morale" />
                    <View tabLabel="Close Combat" />
                    <View tabLabel="Victory" />
                </ScrollableTabView>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    battle: getGame(state)
});

module.exports = connect(
  mapStateToProps
)(BattleView);
