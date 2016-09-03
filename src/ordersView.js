'use strict'

var React = require('react');
import { View, ScrollView, Text } from 'react-native';
var OrdersArmyView = require('./ordersArmyView');
var Current = require('./services/current');
var log = require('./services/log');

var OrdersView = React.createClass({
    getInitialState() {
        return {
            armies: Current.armies()
        };
    },
    componentDidMount() {
        this.props.events.addListener('reset', this.onReset);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },
    onReset() {
        this.setState({armies: Current.armies()});
    },
    render() {
        return (
            <View style={{flex: 1,justifyContent: 'flex-start'}}>
                {this.state.armies.length > 0
                    ? (
                        <ScrollView
                            automaticallyAdjustContentInsets={false}
                            scrollEventThrottle={200}>
                            {this.state.armies.map((army, i) => {
                                return (
                                    <OrdersArmyView key={i} army={army} />
                                );
                            })}
                        </ScrollView>
                    )
                    : (
                        <View style={{flex:1, marginTop: 250, alignItems: 'center'}}>
                            <Text style={{fontSize: 28, fontWeight: 'bold'}}>No Armies</Text>
                        </View>
                    )
                }
            </View>
        );
    }
});

module.exports = OrdersView;
