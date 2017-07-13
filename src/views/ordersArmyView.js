import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import OrdersItemView from './ordersItemView';

var OrdersArmyView = React.createClass({
    render() {        
        let orders = this.props[this.props.army.country.toLowerCase()][this.props.army.name] || [];
        return (
            <View style={{flex: 1}}>
                <ScrollView                    
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}>
                        {orders.map((o,i) => <OrdersItemView key={i} army={this.props.army} order={o} />)}
                </ScrollView>                
            </View>            
        );
    }
});

const mapStateToProps = (state) => ({
    usa: state.usa.orders,
    csa: state.csa.orders   
});

module.exports = connect(
  mapStateToProps
)(OrdersArmyView);
