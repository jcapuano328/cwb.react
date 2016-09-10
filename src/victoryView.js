'use strict'

var React = require('react');
import { View, Image, Text } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var Icons = require('./widgets/icons');
var Current = require('./services/current');
var Roster = require('./services/roster');

let ArmyVictoryView = React.createClass({
    render() {
        let wreckedbycasualty = Roster.totalWrecked(this.props.army,true);
        return (
            <View style={{flex:1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{height: 64, width: 96, resizeMode: 'stretch'}} source={Icons[this.props.army]} />
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex: 1, marginLeft: 10}}>
                        <Text>Victory Points</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <SpinNumeric value={this.props.vp} min={0} max={100} onChanged={this.props.onChangeVP} />
                    </View>
                    <View style={{flex:1, marginLeft: 10}}><Text style={{color: 'transparent'}}>by Casualty</Text></View>
                </View>
                <View style={{flex: .5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex: 1, marginLeft: 10}}>
                        <Text>Wrecked</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={{textAlign: 'center'}}>{this.props.wrecked}</Text>
                    </View>
                    <View style={{flex:1, marginLeft: 10}}><Text style={{color: 'transparent'}}>by Casualty</Text></View>
                </View>
                <View style={{flex: .5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex:1, marginLeft: 10}}><Text style={{color: 'transparent'}}>Wrecked</Text></View>
                    <View style={{flex: 2}}>
                        <Text style={{textAlign: 'center'}}>{wreckedbycasualty}</Text>
                    </View>
                    <View style={{flex: 1, marginLeft: 10}}>
                        <Text>by Casualty</Text>
                    </View>
                </View>
                <View style={{flex:6}} />
            </View>
        );
    }
});

let VictoryView = React.createClass({
    getInitialState() {
        let battle = Current.battle();
        return {
            usavp: Current.USAVictoryPoints().toString(),
            usawrecked: Roster.totalWrecked('USA'),
            csavp: Current.CSAVictoryPoints().toString(),
            csawrecked: Roster.totalWrecked('CSA')
        };
    },
    componentDidMount() {
        this.props.events.addListener('reset', this.onReset);
        this.props.events.addListener('onrosterchange', this.onRosterChange);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },
    onReset() {
        let battle = Current.battle();
        this.setState({
            usavp: Current.USAVictoryPoints().toString(),
            csavp: Current.CSAVictoryPoints().toString(),
            usawrecked: Roster.totalWrecked('USA'),
            csawrecked: Roster.totalWrecked('CSA')
        });
    },
    onRosterChange() {
        let battle = Current.battle();
        this.setState({
            usawrecked: Roster.totalWrecked('USA'),
            csawrecked: Roster.totalWrecked('CSA')
        });
    },
    onChangeUSAVP(v) {
        Current.USAVictoryPoints(v);
        Current.save()
        .then(() => {
            this.setState({usavp: v});
        });
    },
    onChangeCSAVP(v) {
        Current.CSAVictoryPoints(v);
        Current.save()
        .then(() => {
            this.setState({csavp: v});
        });
    },
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <ArmyVictoryView army={'USA'} vp={this.state.usavp} wrecked={this.state.usawrecked} onChangeVP={this.onChangeUSAVP}/>
                <ArmyVictoryView army={'CSA'} vp={this.state.csavp} wrecked={this.state.csawrecked} onChangeVP={this.onChangeCSAVP}/>
            </View>
        );
    }
});

module.exports = VictoryView;
