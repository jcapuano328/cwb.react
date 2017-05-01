import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import OrderListArmyView from './orderListArmyView';

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
                            />
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
});

module.exports = OrderListView;
