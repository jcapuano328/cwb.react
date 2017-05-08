import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {RadioButtonGroup,Style} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Icons from '../res';
import Orders from '../services/orders';

var OrderInitiativeView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'}
    ],    
    getInitialState() {
        return {            
            leader: 0,
            anti: 0,

            die1: 1,
            die2: 1,
            result: ''            
        };
    },
    onChangeLeader(v) {
        this.state.leader = v;        
        this.onResolve();
    },
    onChangeAnitInitiative(v) {
        this.state.anti = v;        
        this.onResolve();        
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.onResolve();
    },    
    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.onResolve();
    },
    onResolve() {      
        this.state.result = Orders.initiative(this.state.die1 + this.state.die2, this.state.leader, this.state.anti)
        this.setState(this.state);        
    },    
    render() {           
             
        return (
            <View style={{flex: 1, marginTop: Style.Scaling.scale(44), 
                            marginLeft: 10, marginRight: 10, marginBottom: 10}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{flex: 1,marginRight: 15, width: 64,height: 64,resizeMode: 'contain'}} source={Icons[this.props.country]} />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{marginTop: 25, fontSize: Style.Font.large(), fontWeight: 'bold'}}>{this.props.army}</Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection:'row', marginTop: 5, backgroundColor: 'whitesmoke'}}>
                    <View style={{flex:4, justifyContent: 'center', alignItems:'center'}}>
                        <Text style={{fontSize: Style.Font.mediumlarge(), fontWeight: 'bold'}}>{this.state.result}</Text>
                        {/*<Image style={{flex: 1,marginRight: 15, width: 64,height: 64,resizeMode: 'contain'}} source={Icons[this.state.result]} />*/}
                    </View>
                    <View style={{flex:3}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                            onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <RadioButtonGroup title={'Leader'} direction={'horizontal'}
                            buttons={[0,1,2,3,4].map((t) => {return {label:t.toString(),value:t};})}
                            state={this.state.leader}
                            onSelected={this.onChangeLeader}/>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <RadioButtonGroup title={'Anti-Initiative'} direction={'horizontal'}
                            buttons={[0,1,2,3,4].map((t) => {return {label:t.toString(),value:t};})}
                            state={this.state.anti}
                            onSelected={this.onChangeAnitInitiative}/>                        
                    </View>
                </View>

                <View style={{flex: 8}}/>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({    
    country: state.order.country,
    army: state.order.army
});

module.exports = connect(
  mapStateToProps
)(OrderInitiativeView);
