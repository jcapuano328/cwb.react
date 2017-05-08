import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {Checkbox,Style} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Icons from '../res';
import getGame from '../selectors/game';
import getTurn from '../selectors/turn';
import Orders from '../services/orders';
import Roster from '../services/roster';
import {isNight} from '../services/time';

import {updateStatus} from '../actions/order';

var OrderStoppageView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'}
    ],    
    getInitialState() {
        return {            
            leaderlost: false,
            defensive: false,

            die1: 1,
            die2: 1,
            result: ''            
        };
    },
    onChangeLeaderLost(v) {
        this.state.leaderlost = v;        
        this.onResolve();
    },
    onChangeDefensive(v) {
        this.state.defensive = v;        
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
        let orders = ((this.props[this.props.order.country.toLowerCase()] || []).find((o) => o.army == this.props.order.army) || {orders:[]}).orders;

        let status = Orders.stop(this.state.die1 + this.state.die2, 
            this.state.total, 
            this.state.wrecked, 
            this.state.receiver, 
            this.state.leaderlost, 
            this.state.defensive, 
            isNight(this.props.turn, this.props.battle));

        this.state.result = status.type;
        this.setState(this.state);

        this.props.updateStatus(this.props.order, status.type);
    },    
    render() {           
        let formation = Roster.getFormationForLeaderWreckStatus(this.props.battle, this.props.order.country, this.props.order.army, this.props.order.receiver);
        this.state.receiver = Roster.getLeader(this.props.battle, this.props.order.country, this.props.order.army, this.props.order.receiver).rating;
        this.state.total = formation.total;
        this.state.wrecked = formation.wrecked;
             
        return (
            <View style={{flex: 1, marginTop: Style.Scaling.scale(44), 
                            marginLeft: 10, marginRight: 10, marginBottom: 10}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{flex: 1,marginRight: 15, width: 64,height: 64,resizeMode: 'contain'}} source={Icons[this.props.order.country]} />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{marginTop: 25, fontSize: Style.Font.large(), fontWeight: 'bold'}}>{this.props.order.army}</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{marginTop: 25, fontSize: Style.Font.large(), fontWeight: 'bold'}}>{this.props.order.receiver}</Text>
                    </View>                    
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{marginTop: 25, fontSize: Style.Font.large(), fontWeight: 'bold'}}>{formation.name}</Text>
                    </View>                    
                </View>
                <View style={{flex: 1, flexDirection:'row', marginTop: 5, backgroundColor: 'whitesmoke'}}>
                    <View style={{flex:4, justifyContent: 'center', alignItems:'center'}}>
                        {/*<Text style={{fontSize: Style.Font.mediumlarge(), fontWeight: 'bold'}}>{this.state.result}</Text>*/}
                        <Image style={{flex: 1,marginRight: 15, width: 64,height: 64,resizeMode: 'contain'}} source={Icons[this.state.result]} />                        
                    </View>
                    <View style={{flex:3}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                            onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                    </View>
                </View>

                <View style={{flex: 1, justifyContent: 'flex-start', alignItems:'flex-start'}}>
                    <Checkbox label={'Leader Lost'} selected={this.state.leaderlost} onSelected={this.onChangeLeaderLost}/>
                    <Checkbox label={'Defensive Orders'} selected={this.state.defensive} onSelected={this.onChangeDefensive}/>
                </View>                

                <View style={{flex: 8}}/>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({    
    battle: getGame(state),
    turn: getTurn(state),
    order: state.order,    
    usa: state.usa.orders,
    csa: state.csa.orders    
});

module.exports = connect(
  mapStateToProps,
  {updateStatus}
)(OrderStoppageView);
