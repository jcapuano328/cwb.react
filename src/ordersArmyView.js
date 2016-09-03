'use strict';

var React = require('react');
import { View, TouchableOpacity, Text, Image, ListView } from 'react-native';
var OrdersItemView = require('./ordersItemView');
var IconButton = require('./widgets/iconButton');
var icons = require('./widgets/icons');
var Current = require('./services/current');

var OrdersArmyView = React.createClass({
    getInitialState() {
        return {expanded: false};
    },
    onPress() {
        this.setState({expanded: !this.state.expanded});
    },
    render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={{flex: 1}}>
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
                        <Image style={{width: 28, height: 96, resizeMode: 'contain'}}
                            source={this.state.expanded ? icons['arrow-down'] : icons['arrow-right']} />
                        <Image style={{
                            //flex: 1,
                            //width: null,
                            //height: null,
                            width: 96,
                            height: 96,
                            resizeMode: 'contain',
                            //backgroundColor: 'transparent',
                        }} source={icons[this.props.army.country]} />
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <Text style={{flex: 1, fontSize: 20,textAlign: 'center',margin: 10}}>{this.props.army.name}</Text>
                            <Text style={{flex: 1, fontSize: 15,textAlign: 'center',margin: 10}}>{this.props.army.commander}</Text>
                        </View>
                        <IconButton image={'add'} onPress={this.props.onAdd} />
                    </View>
                    {this.state.expanded
                        ? Current.orders(this.props.army.country, this.props.army.name).map((order,i) => {
                            return (
                                <OrdersItemView key={i} order={order} />
                            );
                        })
                        : <Text/>
                    }
                </View>
            </TouchableOpacity>
        );
    }
});

module.exports = OrdersArmyView;
