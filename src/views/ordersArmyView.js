import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Arrow,IconButton,Style} from 'react-native-nub';
import Icons from '../res';
import getTurn from '../selectors/turn';
import {select,create} from '../actions/order';
import Orders from '../services/orders';
import OrdersItemView from './ordersItemView';

var OrdersArmyHeader = React.createClass({
    render() {
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                flex: 1,
                flexDirection: 'row',
                margin: 5,
                padding: 5,
                //backgroundColor: '#eaeaea',
                borderRadius: 3
            }}>
                <View style={{marginTop: 0, marginRight: 5}}>
                    <Arrow size={18} direction={this.props.expanded ? 'down' : 'right'} />
                </View>
                <Image style={{
                    //flex: 1,
                    //width: null,
                    //height: null,
                    width: 96,
                    height: 96,
                    resizeMode: 'contain',
                    //backgroundColor: 'transparent',
                }} source={Icons[this.props.army.country]} />
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Text style={{flex: 1, fontSize: Style.Font.large(),textAlign: 'center',margin: 10}}>{this.props.army.name}</Text>
                    <Text style={{flex: 1, fontSize: Style.Font.medium(),textAlign: 'center',margin: 10}}>{this.props.army.commander.name}</Text>
                </View>
                <IconButton image={Icons['orderinitiative']} onPress={this.props.onInitiative} />
                <IconButton image={Icons['orderadd']} onPress={this.props.onAdd} />                
            </View>            
        );
    }
});

var OrdersArmyView = React.createClass({
    getInitialState() {
        return {
            expanded: false,
        };
    },
    onPress() {
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
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={this.onPress}>                
                        <OrdersArmyHeader army={this.props.army} expanded={this.state.expanded} onAdd={this.onAdd} onInitiative={this.onInitiative} />
                    </TouchableOpacity>
                </View>
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
