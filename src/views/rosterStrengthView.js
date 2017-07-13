import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {Style,SpinNumeric} from 'react-native-nub';
import Icons from '../res';

var RosterStrengthView = React.createClass({
    onChangeKIA(v) {
        this.props.onChange && this.props.onChange('kia', +v);
    },
    onChangeWIA(v) {
        this.props.onChange && this.props.onChange('wia', +v);
    },
    render() {
        const towreck = this.props.wreckLosses - (this.props.casualties + this.props.stragglers);
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{width: 24, height: 24, resizeMode: 'contain'}} source={Icons['casualty']} />    
                    </View>
                    <View style={{flex: 3}}>
                        <SpinNumeric value={this.props.casualties.toString()} min={0} max={this.props.total} onChanged={this.onChangeKIA} />
                    </View>                    
                </View>
                <View style={{flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{width: 24, height: 24, resizeMode: 'contain'}} source={Icons['straggler']} />    
                    </View>
                    <View style={{flex: 3}}>
                        <SpinNumeric value={this.props.stragglers.toString()} min={0} max={this.props.total} onChanged={this.onChangeWIA} />
                    </View>                    
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    {towreck > 0
                    ? <Text>{towreck.toString() + ' to wreck'}</Text>
                    : null
                    }                    
                </View>
            </View>
        );
    }
});

module.exports = RosterStrengthView;
