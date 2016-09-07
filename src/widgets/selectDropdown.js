'use strict'

var React = require('react');
import { View, Text, Picker } from 'react-native';
var Icons = require('./icons');

let SelectDropdown = React.createClass({
    render() {
        return (
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                {this.props.label ? (
                    <View style={{flex:1, marginTop: 15}}>
                        <Text style={{marginLeft: 10}}>{this.props.label}</Text>
                    </View>
                ) : null
                }
                <View style={{flex:2, marginRight: 15}}>
                    <Picker
                        selectedValue={this.props.value} onValueChange={this.props.onSelected}>
                        {this.props.values.map((o,i) =>
                            <Picker.Item key={i} label={o} value={o} />
                        )}
                    </Picker>
                </View>
            </View>
        );
        //
    }
});


module.exports = SelectDropdown;
