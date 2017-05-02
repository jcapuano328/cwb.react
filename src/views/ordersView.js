import React from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import OrdersArmyView from './ordersArmyView';
import getGame from '../selectors/game';

var OrdersView = React.createClass({
    render() {
        return (
            <View style={{flex: 1,justifyContent: 'flex-start'}}>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}>
                    {(this.props.armies||[]).map((army, i) => {
                        return (
                            <OrdersArmyView key={i} army={army} />
                        );
                    })}
                </ScrollView>
            </View>
        );        
    }
});

const mapStateToProps = (state) => ({
    armies: getGame(state).armies
});

module.exports = connect(
  mapStateToProps
)(OrdersView);