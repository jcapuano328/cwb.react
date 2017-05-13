import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Arrow,IconButton,Style} from 'react-native-nub';
import Icons from '../res';
import getTurn from '../selectors/turn';
import {select,create} from '../actions/order';
import Orders from '../services/orders';
import CollapsibleHeader from '../components/collapsibleHeader';
import OrdersItemView from './ordersItemView';

var OrdersArmyView = React.createClass({
    getInitialState() {
        return {
            expanded: false,
        };
    },
    onToggle() {
        this.setState({expanded: !this.state.expanded});
    },
    onInitiative() {
        this.props.select({country: this.props.army.country, army: this.props.army.name});
        Actions.orderinitiative({title: 'Order Initiative', subtitle: this.props.army.country + ' - ' + this.props.army.name});
    },            
    onAdd() {
        this.props.create(this.props.army.country,this.props.army.name,this.props.turn);
        Actions.order({title: 'Order', subtitle: this.props.army.name + ' - New'});
    },        
    render() {        
        return (
            <View style={{flex: 1}}>
                <CollapsibleHeader image={this.props.army.country} title={this.props.army.name} subtitle={this.props.army.commander.name} expanded={this.state.expanded} onPress={this.onToggle}>
                    <IconButton image={Icons['orderinitiative']} onPress={this.onInitiative} />
                    <IconButton image={Icons['orderadd']} onPress={this.onAdd} />                            
                </CollapsibleHeader>                
                {this.renderOrders()}
            </View>            
        );
    },
    renderOrders() {
        if (this.state.expanded) {
            let orders = this.props[this.props.army.country.toLowerCase()][this.props.army.name] || [];
            return (
                <View>
                    {orders.map((o,i) => <OrdersItemView key={i} army={this.props.army} order={o} />)}
                </View>
            );

        }
        return null;        
    }
});

const mapStateToProps = (state) => ({
    usa: state.usa.orders,
    csa: state.csa.orders,
    turn: getTurn(state)    
});

module.exports = connect(
  mapStateToProps,
  {select,create}
)(OrdersArmyView);
