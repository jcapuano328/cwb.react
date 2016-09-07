'use strict'

var React = require('react');
import { View, Image, Text, Picker } from 'react-native';
var SelectList = require('./widgets/selectList');
var MultiSelectList = require('./widgets/multiSelectList');
var DiceRoll = require('./widgets/diceRoll');
var Dice = require('./services/dice');
var Icons = require('./widgets/icons');
var CloseCombat = require('./services/closecombat');

let CloseCombatView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red'},
        {num: 1, low: 1, high: 6, color: 'yellow'}
    ],
    getInitialState() {
        return {
            attackstrength: CloseCombat.defaultLevel.code,
            attackmods: {},
            defendstrength: {},
            defendmods: {},

            result: '',
            die1: 1,
            die2: 1
        };
    },
    onChangeAttackStrength(v) {
        this.state.attackstrength = v;
        this.resolve();
    },
    onChangeAttackMod(m) {
        this.state.attackmods[m.name] = m.selected;
        this.resolve();
    },
    onChangeDefendStrength(m) {
        this.state.defendstrength[m.name] = m.selected;
        this.resolve();
    },
    onChangeDefendMod(m) {
        this.state.defendmods[m.name] = m.selected;
        this.resolve();
    },

    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.resolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve();
    },
    getModifiers(modifiers) {
        let mods = [];
        Object.keys(modifiers).forEach((k) => {
            if (modifiers[k]) {
                mods.push(k);
            }
        });
        return mods;
    },
    resolve() {
        let attackmods = this.getModifiers(this.state.attackmods);
        let defendmods = this.getModifiers(this.state.defendmods);

        this.state.results = CloseCombat.resolve(this.state.die1, this.state.die2,
            [this.state.attackstrength],attackmods['Wrecked Bde'],
            this.getModifiers(this.state.defendstrength),defendmods['Trench'],defendmods['Wrecked Bde'],defendmods['Wrecked Div']);
console.log(this.state);
        this.setState(this.state);
    },
    render() {
        let result = 'cc-'+this.state.results;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 2, flexDirection: 'row'}}>
                    <View style={{flex:1, justifyContent: 'flex-start', alignItems: 'center',
                                    borderRightColor: 'gray', borderRightWidth: 1}}>
                        <View style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <SelectList title={'Attacker'} titleonly={true} items={CloseCombat.levels.map((l) => l.code)} selected={this.state.attackstrength} onChanged={this.onChangeAttackStrength}/>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <MultiSelectList title={'Modifiers'} items={CloseCombat.attackModifiers.map((m) => {return {name: m, selected: this.state.attackmods[m]};})} onChanged={this.onChangeAttackMod}/>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        <View style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <MultiSelectList title={'Defender'} items={CloseCombat.levels.map((m) => {return {name: m.code, selected: this.state.defendstrength[m.code]};})} onChanged={this.onChangeDefendStrength}/>
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}}>
                            <MultiSelectList title={'Modifiers'} items={CloseCombat.defendModifiers.map((m) => {return {name: m, selected: this.state.defendmods[m]};})} onChanged={this.onChangeDefendMod}/>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        {Icons[result]
                            ? <Image style={{height: 64, width: 64, resizeMode: 'stretch'}} source={Icons[result]} />
                            : <Text>{this.state.results}</Text>
                        }
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                        <DiceRoll dice={this.dice} values={this.dice.map((d,i) => this.state['die'+(i+1)])}
                            onRoll={this.onDiceRoll}
                            onDie={this.onDieChanged} />
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = CloseCombatView;
