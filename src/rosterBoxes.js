'use strict';

var React = require('react');
import { View, Text, TouchableOpacity, Image } from 'react-native';
var Icons = require('./widgets/icons');
var range = require('./services/range');

var RosterBoxes = React.createClass({
    onSelected(i) {
        this.props.onSelected && this.props.onSelected(i);
    },
    render() {
        let casualties = this.props.casualties || 0;
        let stragglers = this.props.stragglers || 0;
        let wreckLosses = this.props.wreckLosses || 0;
        let total = (this.props.total || 0) + (wreckLosses?1:0);
        return (
            <View>
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}} >
                    {range(0,total).map((i) => {
                        return (
                            <TouchableOpacity key={i} onPress={this.onSelected(i)}>
                                <Image
                                    style={{marginLeft: i>0?2:0,width: 22, height: 22, resizeMode: 'contain'}}
                                    source={Icons[this.getImage(i,casualties,stragglers,wreckLosses)]} />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    },
    getImage(i,c,s,l) {
        if (l > 0 && i == l) {
            return 'checkmark';
        }
        if (c > 0 && i - l < c) {
            return 'casualty';
        }
        if (s > 0 && i - c - l < s) {
            return 'straggler';
        }

        return 'unchecked';
    }
});

module.exports = RosterBoxes;
