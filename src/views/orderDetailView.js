import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {RadioButtonGroup,SpinSelect,SelectDropdown,SelectList,IconButton,Style} from 'react-native-nub';
import Icons from '../res';
import moment from 'moment';
import getGame from '../selectors/game';
import Orders from '../services/orders';
import Roster from '../services/roster';
import {setSender,setReceiver,setDateTime,setType,setMethod,setForce,setText,setStatus,adjustDate,adjustTime} from '../actions/order';

var OrderDetailView = React.createClass({
    onNextStatus() {
        this.props.setStatus(Orders.nextStatus(this.props.order.status));
    },
    onChangeSender(v) {
        this.props.setSender(v);
    },
    onChangeReceiver(v) {
        this.props.setReceiver(v);
    },
    onChangeDate(mod) {
        return () => {
            this.props.adjustDate(this.props.order.dateTime,mod);
        }
    },
    onChangeTime(mod) {
        return () => {
            this.props.adjustTime(this.props.order.dateTime,mod);
        }
    },
    onChangeType(v) {
        this.props.setType(v || this.props.order.type);
    },
    onChangeMethod(v) {
        this.props.setMethod(v || this.props.order.method);        
    },
    onChangeText(v) {
        this.props.setText(v);
    },
    render() {        
        let superiors = Roster.getSuperiorLeaders(this.props.battle,this.props.order.country,this.props.order.army);
        let subordinates = //Roster.getSubordinateLeaders(this.props.battle,this.props.order.country,this.props.order.army);
            Roster.getSubordinatesForLeader(this.props.battle,this.props.order.country,this.props.order.army,this.props.order.sender);
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
                    <View style={{flex: 1, marginTop: 15, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={this.onNextStatus} >
                            <Image style={{width: 48,height: 48,resizeMode: 'stretch'}} source={Icons[this.props.order.status]}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        {/*
                        <SelectDropdown label={'Sender'} value={this.props.order.sender} values={[''].concat(Roster.getSuperiorLeaders(this.props.battle,this.props.order.country,this.props.order.army).map((c) => c.name))}
                            onSelected={this.onChangeSender}/>                        
                        <SelectList title={'Sender'} titleonly={true} items={Roster.getSuperiorLeaders(this.props.battle,this.props.order.country,this.props.order.army).map((c) => c.name)} selected={this.props.order.sender} onChanged={this.onChangeSender}/>                        
                        */}
                        <RadioButtonGroup title={'Sender'} direction={'vertical'}
                            buttons={superiors.map((c) => {return {label:c.name,value:c.name};})}
                            state={this.props.order.sender}
                            onSelected={this.onChangeSender}/>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        {/*
                        <SelectDropdown label={'Receiver'} value={this.props.order.receiver} values={[''].concat(Roster.getSubordinateLeaders(this.props.battle,this.props.order.country,this.props.order.army).map((c) => c.name))}
                            onSelected={this.onChangeReceiver}/>
                        */}
                        <SelectList title={'Receiver'} titleonly={true} 
                            items={subordinates.map((c) => c.name)} 
                            selected={this.props.order.receiver} 
                            onChanged={this.onChangeReceiver}/>                            
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flex:1}}>
                        <Text style={{marginLeft: 10}}>Arrival</Text>
                    </View>
                    <View style={{flex:2, marginTop: 15}}>
                        <SpinSelect value={moment(this.props.order.dateTime).format('MMM DD, YYYY')} onPrev={this.onChangeDate(-1)} onNext={this.onChangeDate(1)} />
                    </View>
                    <View style={{flex:2, marginTop: 15}}>
                        <SpinSelect value={moment(this.props.order.dateTime).format('HH:mm')} onPrev={this.onChangeTime(-1)} onNext={this.onChangeTime(1)} />
                    </View>
                </View>

                <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        {/*
                        <SelectDropdown label={'Type'} value={Orders.getType(this.props.order.type).desc} values={[''].concat(Orders.types.map((t) => t.desc))}
                            onSelected={this.onChangeType}/>
                        <SelectList title={'Type'} titleonly={true} items={Orders.types.map((t) => t.desc)} selected={Orders.getType(this.props.order.type).desc} onChanged={this.onChangeType}/>                        
                        */}
                        <RadioButtonGroup title={'Type'} direction={'vertical'}
                            buttons={Orders.types.map((t) => {return {label:t.desc,value:t.type};})}
                            state={this.props.order.type}
                            onSelected={this.onChangeType}/>                                                        
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        {/*
                        <SelectDropdown label={'Method'} value={Orders.getMethod(this.props.order.method).desc} values={[''].concat(Orders.methods.map((m) => m.desc))}
                            onSelected={this.onChangeMethod}/>
                        <SelectList title={'Method'} titleonly={true} items={Orders.methods.map((m) => m.desc)} selected={Orders.getMethod(this.props.order.method).desc} onChanged={this.onChangeMethod}/>
                        */}
                        <RadioButtonGroup title={'Method'} direction={'vertical'}
                            buttons={Orders.methods.map((m) => {return {label:m.desc,value:m.method};})}
                            state={this.props.order.method}
                            onSelected={this.onChangeMethod}/>
                    </View>
                </View>

                <View style={{flex: 4}}>
                    <TextInput style={{margin: 10, fontSize: Style.Font.medium()}} placeholder={'Instructions'} multiline={true} onChangeText={this.onChangeText}>{this.props.order.text}</TextInput>
                </View>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    order: state.order,
    battle: getGame(state)
});

module.exports = connect(
  mapStateToProps,
  {setSender,setReceiver,setDateTime,setType,setMethod,setForce,setText,setStatus}
)(OrderDetailView);
