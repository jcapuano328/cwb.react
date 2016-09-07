'use strict'

var React = require('react');
import { View, Text, TouchableOpacity, Image } from 'react-native';
var Button = require('apsl-react-native-button');
var Dice = require('../services/dice');
var Images = require('./dieImages');

var DieButton = React.createClass({
    shouldComponentUpdate(nextProps, nextState) {
      return true;
    },
    onPress() {
        this.props.onPress && this.props.onPress(this.props.die);
    },
    render() {
        let image = Images(this.props.image);
        return (
            <TouchableOpacity onPress={this.onPress} >
                <Image source={image} />
            </TouchableOpacity>
        );
    }
});

var DiceRoll = React.createClass({
    dice: null,
    onRoll(e) {
      this.dice.roll();
      this.props.onRoll && this.props.onRoll(this.dice.dice());
    },
    onDie(e) {
      let die = this.dice.dieEx(e);
      die.increment(true);
      this.props.onDie && this.props.onDie(e, die.value());
    },
    render() {
        this.dice = new Dice.Dice(this.props.dice);
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                {this.dice.map((die, i) => {
                    if (i<this.props.values.length) {
                        die.value(this.props.values[i]);
                    }
                    return (
                        <View key={i} style={{flex:1}}>
                            <DieButton die={i+1} image={die.image()} onPress={this.onDie} />
                        </View>
                    );
                })}
                <View style={{flex:1}}>
                    <Button
                        style={{width: this.props.buttonWidth || 96,height: this.props.buttonHeight || 64,
                                marginTop: 5,
                                backgroundColor: this.props.buttonBackgroundColor || '#3F51B5'}}
                        textStyle={{fontSize: 18,color: this.props.buttonColor || '#FFF'}} onPress={this.onRoll}>
                        Roll
                    </Button>
                </View>
            </View>
        );
    }
});

module.exports = DiceRoll;
