import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {Arrow,IconButton,Style} from 'react-native-nub';
import Icons from '../res';
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
                    <Text style={{flex: 1, fontSize: Style.Font.medium(),textAlign: 'center',margin: 10}}>{this.props.army.commander}</Text>
                </View>
                <IconButton image={'add'} onPress={this.props.onAdd} />
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
    render() {        
        let orders = this.state.expanded ? 
            ((this.props[this.props.army.country.toLowerCase()] || []).find((o) => o.army == this.props.army.name) || {orders:[]}).orders
            : [];
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={{flex: 1}}>
                    <OrdersArmyHeader army={this.props.army} expanded={this.state.expanded} onAdd={this.onAdd} />
                    {this.state.expanded
                        ? orders.map((o,i) => <OrdersItemView key={i} army={this.props.army} order={o} />)
                        : <Text/>
                    }
                </View>
            </TouchableOpacity>
        );
    }
});

const mapStateToProps = (state) => ({
    usa: state.current.usa.orders,
    csa: state.current.csa.orders
});

module.exports = connect(
  mapStateToProps
)(OrdersArmyView);
