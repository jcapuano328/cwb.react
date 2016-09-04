'use strict'

var React = require('react');
import { View, ScrollView, Text } from 'react-native';
var OrderListArmyView = require('./orderListArmyView');
var log = require('./services/log');

var OrderListView = React.createClass({
    render() {
        return (
            <View style={{flex: 1,justifyContent: 'flex-start'}}>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}>
                    {(this.props.armies||[]).map((army, i) => {
                        return (
                            <OrderListArmyView key={i} army={army}
                                onSelect={this.props.onSelect}
                                onAdd={this.props.onAdd}
                                onRemove={this.props.onRemove}
                                events={this.props.events}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
});

module.exports = OrderListView;
