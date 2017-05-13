import React from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import {SpinNumeric,MultiSelectList,SelectDropdown,RadioButtonGroup,Style} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Icons from '../res';
import FireCombat from '../services/firecombat';
import Morale from '../services/morale';
import getGame from '../selectors/game';
import {setCsaArtyAmmo,setUsaArtyAmmo} from '../actions/current';

let FireCombatView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor: 'white'},
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor: 'white'},
        {num: 1, low: 1, high: 6, diecolor: 'yellow', dotcolor: 'black'},
        {num: 1, low: 1, high: 6, diecolor: 'green', dotcolor: 'white'},
        {num: 1, low: 1, high: 6, diecolor: 'black', dotcolor: 'red'},
        {num: 1, low: 1, high: 6, diecolor: 'black', dotcolor: 'white'},
        {num: 1, low: 1, high: 6, diecolor: 'blue', dotcolor: 'white'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor: 'black'}
    ],
    getInitialState() {
        return {
            attackstrength: FireCombat.defaultPoints.code,
            attackmods: {},

            defendmoralelevel: Morale.levels[1],
            defendmoralestate: Morale.states[1].code,
            defendleader: '1',
            defendmods: {},

            casualties: 0,
            stragglers: 0,
            morale: '',
            retreat: '',
            lowammo: false,
            leaderloss: false,

            die1: 1,
            die2: 1,
            die3: 1,
            die4: 1,
            die5: 1,
            die6: 1,
            die7: 1,
            die8: 1
        };
    },
    onChangeAttackStrength(v) {
        this.state.attackstrength = v;
        this.resolve();
    },
    onChangeUSAArtyAmmo(v) {
        this.props.setUsaArtyAmmo(v);
    },
    onChangeCSAArtyAmmo(v) {
        this.props.setCsaArtyAmmo(v);
    },
    onChangeAttackMod(m) {
        this.state.attackmods[m.name] = m.selected;
        this.resolve();
    },
    onChangeDefendMoraleLevel(v) {
        this.state.defendmoralelevel = v;
        this.resolve();
    },
    onChangeDefendMoraleState(v) {
        this.state.defendmoralestate = v;
        this.resolve();
    },
    onChangeDefendLeader(v) {
        this.state.defendleader = v;
        this.resolve();
    },
    onChangeDefendMod(m) {
        this.state.defendmods[m.name] = m.selected;
        this.resolve();
    },

    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.state.die3 = d[2].value;
        this.state.die4 = d[3].value;
        this.state.die5 = d[4].value;
        this.state.die6 = d[5].value;
        this.state.die7 = d[6].value;
        this.state.die8 = d[7].value;

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
        let results = FireCombat.resolve(this.state.die1+this.state.die2,this.state.die3,this.state.die4,this.state.die5*10+this.state.die6,this.state.die7+this.state.die8,
    			this.state.attackstrength,attackmods['Up Slope'],attackmods['Low Ammo'],attackmods['DG'],attackmods['CC Flank'],attackmods['Swamp'],attackmods['Night'],
    			this.state.defendmoralelevel,+this.state.defendleader,this.state.defendmoralestate,
                defendmods['Low Ammo'],defendmods['Trench'],defendmods['Mounted'],defendmods['Col/Limb/Flank'],defendmods['w/Unlimb Arty'],
                defendmods['Wrecked Bde'],defendmods['Wrecked Div'],defendmods['CC Attack'],defendmods['CC Defend'],defendmods['CC Attack Special']);

        this.state.casualties = results.casualty;
        this.state.stragglers = results.straggler;
        this.state.morale = results.morale;
        this.state.retreat = results.retreat;
        this.state.lowammo = results.lowammo;
        this.state.leaderloss = results.leaderloss;
        this.setState(this.state);
    },
    render() {
        let casualties = 'casualty-'+this.state.casualties;
        let stragglers = 'straggler-'+this.state.stragglers;
        let morale = this.state.morale;
        let retreat = 'retreat-'+this.state.retreat;
        let lowammo = this.state.lowammo ? 'lowammo' : '';
        let leaderloss = this.state.leaderloss ? 'leaderloss' : '';
        let iconsize = Style.Scaling.scale(40);

        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1.5, backgroundColor: 'whitesmoke', justifyContent:'flex-start'}}>
                    <View style={{flex: .75, flexDirection: 'row', alignItems: 'center', marginTop:5}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3,this.state.die4,this.state.die5,this.state.die6,this.state.die7,this.state.die8]}
                            onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            {Icons[casualties]
                                ? <Image style={{height: iconsize, width: iconsize, resizeMode: 'stretch'}} source={Icons[casualties]} />
                                : <Text/>
                            }
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            {Icons[stragglers]
                                ? <Image style={{height: iconsize, width: iconsize, resizeMode: 'stretch'}} source={Icons[stragglers]} />
                                : <Text/>
                            }
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            {Icons[morale]
                                ? <Image style={{height: iconsize, width: iconsize, resizeMode: 'stretch'}} source={Icons[morale]} />
                                : <Text/>
                            }
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            {Icons[retreat]
                                ? <Image style={{height: iconsize, width: iconsize, resizeMode: 'stretch'}} source={Icons[retreat]} />
                                : <Text/>
                            }
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            {Icons[leaderloss]
                                ? <Image style={{height: iconsize, width: iconsize, resizeMode: 'stretch'}} source={Icons[leaderloss]} />
                                : <Text/>
                            }
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            {Icons[lowammo]
                                ? <Image style={{height: iconsize, width: iconsize, resizeMode: 'stretch'}} source={Icons[lowammo]} />
                                : <Text/>
                            }
                        </View>
                    </View>                    
                </View>
                {/* fire */}
                <View style={{flex: 3, flexDirection: 'row'}}>
                    {/* attack */}
                    <View style={{flex:1,borderRightColor: 'gray', borderRightWidth: 1}}>
                        <View style={{flex: .25, alignItems: 'center'}}>
                            <Text style={{fontSize: Style.Font.medium(), fontWeight:'bold'}}>Attack</Text>                            
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <View style={{flex:2}}>
                                <RadioButtonGroup title={'Points'} direction={'vertical'}
                                    buttons={FireCombat.points.map((v) => ({label:v.code,value:v.code}))}
                                    state={this.state.attackstrength}
                                    onSelected={this.onChangeAttackStrength}/>                                
                            </View>
                            <View style={{flex:3, justifyContent:'flex-start'}}>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize: Style.Font.medium(), backgroundColor: 'silver', textAlign: 'center'}}>Arty Ammo</Text>                                    
                                </View>                                
                                <View style={{flex: 1, flexDirection:'row', alignItems:'center', marginRight: 10}}>
                                    <View style={{flex: 1}}>
                                        <Text>USA</Text>
                                    </View>
                                    <View style={{flex: 2}}>
                                        <SpinNumeric value={this.props.usa.ammo.toString()} min={0} max={this.props.battle.scenario.usaAmmo} onChanged={this.onChangeUSAArtyAmmo} />
                                    </View>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', alignItems:'center', marginRight: 10}}>
                                    <View style={{flex: 1}}>
                                        <Text>CSA</Text>
                                    </View>
                                    <View style={{flex: 2}}>
                                        <SpinNumeric value={this.props.csa.ammo.toString()} min={0} max={this.props.battle.scenario.csaAmmo} onChanged={this.onChangeCSAArtyAmmo} />
                                    </View>
                                </View>  
                                <View style={{flex:3}}/>
                            </View>                            
                        </View>                        
                    </View>
                    {/* defend */}
                    <View style={{flex:1}}>
                        <View style={{flex: .25, alignItems: 'center'}}>
                            <Text style={{fontSize: Style.Font.medium(), fontWeight:'bold'}}>Defend</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <View style={{flex:1}}>
                                <RadioButtonGroup title={'Morale'} direction={'vertical'}
                                    buttons={Morale.levels.map((v) => ({label:v,value:v}))}
                                    state={this.state.defendmoralelevel}
                                    onSelected={this.onChangeDefendMoraleLevel}/>
                            </View>
                            <View style={{flex:2}}>                            
                                <RadioButtonGroup title={'State'} direction={'vertical'}
                                    buttons={Morale.states.map((v) => ({label:v.desc,value:v.code}))}
                                    state={this.state.defendmoralestate}
                                    onSelected={this.onChangeDefendMoraleState}/>
                            </View>
                            <View style={{flex:1}}>
                                <RadioButtonGroup title={'Leader'} direction={'vertical'}
                                    buttons={[0,1,2,3,4].map((v) => ({label:v.toString(),value:v}))}
                                    state={this.state.defendleader}
                                    onSelected={this.onChangeDefendLeader}/>
                            </View>
                        </View>                        
                    </View>
                </View>
                {/* modifiers */}
                <View style={{flex: 2, flexDirection: 'row'}}>
                    {/* attack */}                    
                    <View style={{flex:1,borderRightColor: 'gray', borderRightWidth: 1}}>
                        <MultiSelectList title={'Modifiers'} 
                            items={FireCombat.attackModifiers.map((m) => ({name: m.name, selected: this.state.attackmods[m.name]}))} 
                            onChanged={this.onChangeAttackMod}/>
                    </View>
                    {/* defend */}
                    <View style={{flex:1}}>
                        <MultiSelectList title={'Modifiers'} 
                            items={FireCombat.defendModifiers.map((m) => ({name: m.name, selected: this.state.defendmods[m.name]}))} 
                            onChanged={this.onChangeDefendMod}/>
                    </View>                    
                </View>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    battle: getGame(state),
    csa: state.csa,
    usa: state.usa
});

module.exports = connect(
  mapStateToProps,
  {setCsaArtyAmmo,setUsaArtyAmmo}
)(FireCombatView);
