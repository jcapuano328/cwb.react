import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, Alert } from 'react-native';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import {Style,IconButton} from 'react-native-nub';
import SelectableHeader from '../components/selectableHeader';
import OrdersArmyView from './ordersArmyView';
import getGame from '../selectors/game';
import getTurn from '../selectors/turn';
import {select,create} from '../actions/order';
import Orders from '../services/orders';
import Icons from '../res';

var OrdersView = React.createClass({
    getInitialState() {
        return {
            selected: null
        };
    },
    onSelectArmy(a) {
        var army = (this.props.armies||[]).find((ia) => ia.name == a.name);
        this.setState({selected:army});
    },    
    onInitiative() {
        if (this.state.selected) {

            this.props.select({country: this.state.selected.country, army: this.state.selected.name});
            Actions.orderinitiative({title: 'Order Initiative', subtitle: this.state.selected.country + ' - ' + this.state.selected.name});
        }
    },            
    onAdd() {
        if (this.state.selected) {
            this.props.create(this.state.selected.country,this.state.selected.name,this.props.turn);
            Actions.order({title: 'Order', subtitle: this.state.selected.name + ' - New'});
        }
    },    
    render() {
        return (
            <View style={{flex: 1}}>
                <SelectableHeader items={(this.props.armies||[]).map((army) => ({name:army.name,image:army.country}))} 
                    selected={this.state.selected} onSelected={this.onSelectArmy} >
                    <View style={{flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <IconButton image={Icons['orderinitiative']} onPress={this.onInitiative} />
                        </View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <IconButton image={Icons['orderadd']} onPress={this.onAdd} />                            
                        </View>
                    </View>                        
                </SelectableHeader>
                <View style={{flex:6}}>
                    {this.renderOrders()}
                </View>
            </View>
        );
    },
    renderOrders() {
        if (this.state.selected) {
            return (                
                <OrdersArmyView army={this.state.selected} />
            );
        }
        return null;
    }
});

const mapStateToProps = (state) => ({
    armies: getGame(state).armies,
    turn: getTurn(state)
});

module.exports = connect(
  mapStateToProps,
  {select,create}
)(OrdersView);