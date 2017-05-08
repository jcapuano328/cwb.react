import React from 'react';
import { View, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {IconButton,Style} from 'react-native-nub';
import {Dice} from 'react-native-dice';
import Icons from '../res';
import moment from 'moment';
import getGame from '../selectors/game';
import {select,remove,updateStatus} from '../actions/order';
import Orders from '../services/orders';
import Roster from '../services/roster';

var OrdersItemView = React.createClass({
    dice: new Dice([
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor: 'white'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor: 'black'}
    ]),    
    onSelect() {
        this.props.select(this.props.order);        
        Actions.order({title: 'Order', subtitle: this.props.army.name + ' - ' + this.props.order.sender + ' to ' + this.props.order.receiver});
    },
    onAccept() {
        //this.props.select(this.props.order);
        //Actions.orderaccept({title: 'Accept Order', subtitle: this.props.army.name + ' - ' + this.props.order.sender + ' to ' + this.props.order.receiver});
        let orders = ((this.props[this.props.order.country.toLowerCase()] || []).find((o) => o.army == this.props.order.army) || {orders:[]}).orders;
        this.dice.roll();
        let status = Orders.accept(this.dice.die(1) + this.dice.die(2), 
            Roster.getLeader(this.props.battle, this.props.order.country, this.props.order.army, this.props.order.sender).rating, 
            Roster.getLeader(this.props.battle, this.props.order.country, this.props.order.army, this.props.order.receiver).rating,            
            Orders.hasCurrent(orders, this.props.order.receiver), 
            this.props.order.method, 
            this.props.order.type);
        this.props.updateStatus(this.props.order, status.type);
        /*Alert.alert('Accept Order', 'Order status ' + status.desc, [
            {text: 'OK', style: 'cancel'}
        ]);*/
    },
    onReduce() {
        this.dice.roll();
        let status = Orders.delayReduction(this.dice.die(1), this.props.order.status);
        this.props.updateStatus(this.props.order, status.type);
        /*(Alert.alert('Delay Reduction', 'Order status ' + status.desc, [
            {text: 'OK', style: 'cancel'}
        ]);*/
    },
    onStop() {
        this.props.select(this.props.order);
        Actions.orderstop({title: 'Order Stoppage', subtitle: this.props.army.name + ' - ' + this.props.order.sender + ' to ' + this.props.order.receiver});        
    },
    onRemove() {
        Alert.alert('Remove order from ' + this.props.order.sender + ' to ' + this.props.order.receiver + '?', 'The order will be permanently removed', [
            {text: 'No', style: 'cancel'},
            {text: 'Yes', onPress: () => this.props.remove(this.props.order)}
        ]);        
    },
    render() {
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                flex: 1,
                flexDirection: 'row',
                margin: 5,
                padding: 5,
                backgroundColor: '#eaeaea',
                //backgroundColor: 'gray',
                borderColor: 'gray',
                borderStyle: 'solid',
                borderWidth: 1,
                borderRadius: 10
            }}>
                <Image style={{width: 32,height: 32,resizeMode: 'contain'}} source={Icons[this.props.order.status]} />
                <TouchableOpacity style={{flex: 2}} onPress={this.onSelect}>
                    <View style={{flex: 1, paddingLeft: 5, paddingRight: 5}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{fontSize: Style.Font.large(),fontWeight: 'bold',textAlign: 'left'}}>{this.props.order.receiver}</Text>
                            <Text style={{fontSize: Style.Font.medium(),textAlign: 'left'}}>{moment(this.props.order.dateTime).format('MMM DD, YYYY HH:mm')}</Text>
                            <Text style={{fontSize: Style.Font.medium(),textAlign: 'left'}}>{this.props.order.method}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: Style.Font.medium(),textAlign: 'left'}}>{this.props.order.text}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {/*<IconButton image={'select'} onPress={this.onSelect} />*/}
                {Orders.isPending(this.props.order)
                ? <IconButton image={Icons['orderaccept']} onPress={this.onAccept} />
                : null}
                {Orders.isDelayed(this.props.order)
                ? <IconButton image={Icons['orderreduce']} onPress={this.onReduce} />
                : null}                
                {Orders.isAccepted(this.props.order)
                ? <IconButton image={Icons['orderstop']} onPress={this.onStop} />
                : null}                                
                <IconButton image={Icons['orderremove']} onPress={this.onRemove} />
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    battle: getGame(state)
});

module.exports = connect(
  mapStateToProps,
  {select,remove,updateStatus}
)(OrdersItemView);
