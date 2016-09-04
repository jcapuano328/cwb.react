'use strict'

var React = require('react');
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
var SpinSelect = require('./widgets/spinSelect');
var SelectDropdown = require('./widgets/selectDropdown');
var IconButton = require('./widgets/iconButton');
var Button = require('apsl-react-native-button');
var Icons = require('./widgets/icons');
var Current = require('./services/current');
var Orders = require('./services/orders');
var Roster = require('./services/roster');
var moment = require('moment');
var log = require('./services/log');

var OrderDetailView = React.createClass({
    getInitialState() {
        let order = this.props.order || {};
        return {
            id: order.id,
            country: order.country || this.props.country,
            army: order.army || this.props.army,
            sender: order.sender || '',
            receiver: order.receiver || '',
            dateTime: moment(order.dateTime || Current.turn()),
            type: order.type || Orders.types[0].type,
            method: order.method || Orders.methods[0].method,
            //force: order.force,
            status: order.status || Orders.statuses[0].type,
            text: order.text
        };
    },
    onNextStatus() {
        this.setState({status: Orders.nextStatus(this.state.status)});
    },
    onChangeSender(v) {
        this.setState({sender: v});
    },
    onChangeReceiver(v) {
        this.setState({receiver: v});
    },
    onChangeDate(mod) {
        return () => {
            let battle = Current.battle();
            let st = moment(battle.scenario.startDateTime);
            let et = moment(battle.scenario.endDateTime);
            let dt = moment(this.state.dateTime);
            dt.add(mod,'days');
            if (dt.isBefore(st)) {
                dt = st;
            } else if (dt.isAfter(et)) {
                dt = et;
            }
            let now = {
                year: dt.year(),
                month: dt.month(),
                day: dt.date(),
                hour: dt.hour(),
                minute: dt.minute()
            };
            this.setState({dateTime: moment(now)});
        }
    },
    onChangeTime(mod) {
        return () => {
            let battle = Current.battle();
            let st = moment(battle.scenario.startDateTime);
            let et = moment(battle.scenario.endDateTime);
            let dt = moment(this.state.dateTime);
            let incr = Current.getTimeIncrement(dt,battle);
            dt.add(mod*incr,'minutes');
            if (dt.isBefore(st)) {
                dt = st;
            } else if (dt.isAfter(et)) {
                dt = et;
            }
            let now = {
                year: dt.year(),
                month: dt.month(),
                day: dt.date(),
                hour: dt.hour(),
                minute: dt.minute()
            };
            this.setState({dateTime: moment(now)});
        }
    },
    onChangedType(v) {
        this.setState({type: Orders.getTypeByDesc(v).type || this.state.type});
    },
    onChangeMethod(v) {
        this.setState({method: Orders.getMethodByDesc(v).method || this.state.method});
    },
    onChangeText(v) {
        this.setState({text: v});
    },
    onAccept() {
        this.props.onAccept({
            id: this.state.id,
            country: this.state.country,
            army: this.state.army,
            sender: this.state.sender,
            receiver: this.state.receiver,
            dateTime: this.state.dateTime,
            type: this.state.type,
            method: this.state.method,
            //force: this.state.force,
            status: this.state.status,
            text: this.state.text
        });
    },
    isValid() {
        return (this.state.sender &&
            this.state.receiver &&
            this.state.dateTime &&
            this.state.type &&
            this.state.method &&
            //this.state.force &&
            this.state.status &&
            this.state.text);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{flex: 1,marginRight: 15, width: 64,height: 64,resizeMode: 'contain'}} source={Icons[this.props.country]} />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{marginTop: 25, fontSize: 24, fontWeight: 'bold'}}>{this.props.army}</Text>
                    </View>
                    <View style={{flex: 1, marginTop: 15, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={this.onNextStatus} >
                            <Image style={{width: 48,height: 48,resizeMode: 'stretch'}} source={Icons[this.state.status]}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <SelectDropdown label={'Sender'} value={this.state.sender} values={[''].concat(Roster.getSuperiorLeaders(this.props.country,this.props.army))}
                            onSelected={this.onChangeSender}/>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <SelectDropdown label={'Receiver'} value={this.state.receiver} values={[''].concat(Roster.getSubordinateLeaders(this.props.country,this.props.army))}
                            onSelected={this.onChangeReceiver}/>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flex:1}}>
                        <Text style={{marginLeft: 10}}>Arrival</Text>
                    </View>
                    <View style={{flex:2, marginTop: 15}}>
                        <SpinSelect value={this.state.dateTime.format('MMM DD, YYYY')} onPrev={this.onChangeDate(-1)} onNext={this.onChangeDate(1)} />
                    </View>
                    <View style={{flex:2, marginTop: 15}}>
                        <SpinSelect value={this.state.dateTime.format('HH:mm')} onPrev={this.onChangeTime(-1)} onNext={this.onChangeTime(1)} />
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <SelectDropdown label={'Type'} value={Orders.getType(this.state.type).desc} values={[''].concat(Orders.types.map((t) => t.desc))}
                            onSelected={this.onChangeType}/>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <SelectDropdown label={'Method'} value={Orders.getMethod(this.state.method).desc} values={[''].concat(Orders.methods.map((m) => m.desc))}
                            onSelected={this.onChangeMethod}/>
                    </View>
                </View>

                <View style={{flex: 3}}>
                    <TextInput style={{margin: 10, fontSize: 20}} placeholder={'Instructions'} multiline={true} onChangeText={this.onChangeText}>{this.state.text}</TextInput>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Button style={{flex:1, marginLeft: 10, marginRight: 5, backgroundColor: 'lightgreen'}}
                        isDisabled={!this.isValid()}
                        textStyle={{color:'black'}} onPress={this.onAccept}>{'Accept'}</Button>
                    <Button style={{flex:1, marginLeft: 5, marginRight: 10, backgroundColor: 'lightcoral'}}
                        textStyle={{color:'white'}} onPress={this.props.onDiscard}>{'Cancel'}</Button>
                </View>
            </View>
        );
    }
});

module.exports = OrderDetailView;
