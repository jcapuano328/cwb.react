'use strict'

var React = require('react');
import { View, Image, Text } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var Icons = require('./widgets/icons');
var Current = require('./services/current');
var Roster = require('./services/roster');

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
        let usawreckedbycasualty = Roster.totalWrecked('USA',true);
        let csawreckedbycasualty = Roster.totalWrecked('CSA',true);
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex:1, justifyContent: 'flex-start', alignItems: 'center', borderRightColor: 'gray', borderRightWidth: 1}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={{height: 64, width: 64, resizeMode: 'stretch'}} source={Icons['USA']} />
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: 10, marginTop: 10}}>
                            <Text>Victory Points</Text>
                        </View>
                        <View style={{flex: 3}}>
                            <SpinNumeric value={this.state.usavp} min={0} max={100} onChanged={this.onChangeUSAVP} />
                        </View>
                        <View style={{flex:1}} />
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: 10, marginTop: 10}}>
                            <Text>Wrecked</Text>
                        </View>
                        <View style={{flex: 3}}>
                            <Text>{this.state.usawrecked}</Text>
                        </View>
                        <View style={{flex:1}} />
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <View style={{flex:1}} />
                        <View style={{flex: 3}}>
                            <Text>{this.state.usawreckedbycasualty}</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: 10, marginTop: 10}}>
                            <Text>by Casualty</Text>
                        </View>
                    </View>
                </View>

                <View style={{flex:1, justifyContent: 'flex-start', alignItems: 'center', borderRightColor: 'gray', borderRightWidth: 1}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={{height: 64, width: 64, resizeMode: 'stretch'}} source={Icons['CSA']} />
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: 10, marginTop: 10}}>
                            <Text>Victory Points</Text>
                        </View>
                        <View style={{flex: 3}}>
                            <SpinNumeric value={this.state.csavp} min={0} max={100} onChanged={this.onChangeCSAVP} />
                        </View>
                        <View style={{flex:1}} />
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: 10, marginTop: 10}}>
                            <Text>Wrecked</Text>
                        </View>
                        <View style={{flex: 3}}>
                            <Text>{this.state.csawrecked}</Text>
                        </View>
                        <View style={{flex:1}} />
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <View style={{flex:1}} />
                        <View style={{flex: 3}}>
                            <Text>{this.state.csawreckedbycasualty}</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: 10, marginTop: 10}}>
                            <Text>by Casualty</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = VictoryView;
