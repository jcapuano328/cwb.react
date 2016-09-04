'use strict';

var React = require('react');
import { View, TouchableOpacity, Text, Image } from 'react-native';
var IconButton = require('./widgets/iconButton');
var Icons = require('./widgets/icons');
var moment = require('moment');

var OrderListItemView = React.createClass({
    onSelect() {
        this.props.onSelect && this.props.onSelect(this.props.order);
    },
    onRemove() {
        this.props.onRemove && this.props.onRemove(this.props.order);
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
                            <Text style={{fontSize: 24,fontWeight: 'bold',textAlign: 'left'}}>{this.props.order.receiver}</Text>
                            <Text style={{fontSize: 15,textAlign: 'left'}}>{moment(this.props.order.dateTime).format('MMM DD, YYYY HH:mm')}</Text>
                            <Text style={{fontSize: 15,textAlign: 'left'}}>{this.props.order.method}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 15,textAlign: 'left'}}>{this.props.order.text}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <IconButton image={'select'} onPress={this.onSelect} />
                <IconButton image={'remove'} onPress={this.onRemove} />
            </View>
        );
    }
});

module.exports = OrderListItemView;
