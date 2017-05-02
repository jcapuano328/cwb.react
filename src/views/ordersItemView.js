import React from 'react';
import { View, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import {IconButton,Style} from 'react-native-nub';
import Icons from '../res';
import moment from 'moment';
import getTurn from '../selectors/turn';
import {select,create,remove} from '../actions/order';
import Orders from './services/orders';


var OrdersItemView = React.createClass({
    onSelect() {
        this.props.select(this.props.order);
    },
    onAdd() {
        this.props.create(this.props.army.country,this.props.army.name,this.props.turn,Orders.types[0].type,Orders.methods[0].method,Orders.statuses[0].type);
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
                <Image source={Icons[this.props.order.status]} />
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
                <IconButton image={'select'} onPress={this.onSelect} />
                <IconButton image={'remove'} onPress={this.onRemove} />
            </View>
        );
    }
});

const mapStateToProps = (state) => ({    
    turn: getTurn(state)
});

module.exports = connect(
  mapStateToProps,
  {select,create,remove}
)(OrdersItemView);
