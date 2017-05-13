import React from 'react';
import { View, Image, Text, Picker } from 'react-native';
import {SpinNumeric, MultiSelectList, SelectDropdown} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Icons from '../res';
import Morale from '../services/morale';

let MoraleView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor: 'white'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor: 'black'}
    ],
    getInitialState() {
        return {
            moralelevel: Morale.levels[1],
            moralestate: Morale.states[1].desc,
            leader: '1',
            mod: '0',
            mods: {},

            morale: '',
            stragglers: 0,
            retreat: 0,

            die1: 1,
            die2: 1
        };
    },
    onChangeMoraleLevel(v) {
        this.state.moralelevel = v;
        this.resolve();
    },
    onChangeMoraleState(v) {
        this.state.moralestate = v;
        this.resolve();
    },
    onChangeLeader(v) {
        this.state.defendleader = v;
        this.resolve();
    },
    onChangeLeaderSpecialMod(v) {
        this.state.mod = v;
        this.resolve();
    },
    onChangeMod(m) {
        this.state.mods[m.name] = m.selected;
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
    getModifiers() {
        let mods = [];
        Object.keys(this.state.mods).forEach((k) => {
            if (this.state.mods[k]) {
                mods.push(k);
            }
        });
        return mods;
    },
    resolve() {
        let mods = this.getModifiers();
        let results = Morale.check(this.state.die1*10+this.state.die2,
    			this.state.moralelevel,+this.state.leader,mods['Leader Loss'],this.state.moralestate,
                mods['w/Unlimb Arty'],mods['Wrecked Bde'],mods['Wrecked Div'],mods['Trench'],
                mods['Night'],mods['Col/Limb/Flank'],mods['Low Ammo'],mods['CC Defend'],mods['CC Attack'],mods['CC Attack Special'],
                +this.state.mod);
        this.state.morale = results.morale;
        this.state.stragglers = results.stragglers;
        this.state.retreat = results.retreat;

        this.setState(this.state);
    },
    render() {
        let stragglers = 'straggler-'+this.state.stragglers;
        let morale = this.state.morale;
        let retreat = 'retreat-'+this.state.retreat;

        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginTop:5, backgroundColor: 'whitesmoke', justifyContent:'flex-start'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        {Icons[stragglers]
                            ? <Image style={{height: 64, width: 64, resizeMode: 'stretch'}} source={Icons[stragglers]} />
                            : <Text/>
                        }
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        {Icons[morale]
                            ? <Image style={{height: 64, width: 64, resizeMode: 'stretch'}} source={Icons[morale]} />
                            : <Text/>
                        }
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        {Icons[retreat]
                            ? <Image style={{height: 64, width: 64, resizeMode: 'stretch'}} source={Icons[retreat]} />
                            : <Text/>
                        }
                    </View>
                    <View style={{flex: 2}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                            onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                    </View>
                </View>
                
                <View style={{flex: 6, flexDirection: 'row'}}>
                    <View style={{flex:1, justifyContent: 'flex-start', alignItems: 'center'}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <SelectDropdown label={'Morale'} values={Morale.levels} value={this.state.moralelevel} onSelected={this.onChangeMoraleLevel} />
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <SelectDropdown label={'State'} values={Morale.states.map((s) => s.desc)} value={this.state.moralestate} onSelected={this.onChangeMoraleState} />
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: 10, marginTop: 20}}>
                                <Text>Leader</Text>
                            </View>
                            <View style={{flex: 3}}>
                                <SpinNumeric value={this.state.leader} min={0} max={4} onChanged={this.onChangeLeader} />
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: 10, marginTop: 20}}>
                                <Text>Mod</Text>
                            </View>
                            <View style={{flex: 3}}>
                                <SpinNumeric value={this.state.mod} min={0} max={2} onChanged={this.onChangeLeaderSpecialMod} />
                            </View>
                        </View>
                        <View style={{flex: 4}} />
                    </View>
                    <View style={{flex:1}}>
                        <MultiSelectList title={'Modifiers'} items={Morale.modifiers.map((m) => {return {name: m, selected: this.state.mods[m]};})} onChanged={this.onChangeMod}/>
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = MoraleView;
