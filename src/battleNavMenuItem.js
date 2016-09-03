'use strict';

var React = require('react');
import { View, TouchableOpacity, Text, Image, ListView } from 'react-native';
var ScenarioNavMenuItem = require('./scenarioNavMenuItem');
var icons = require('./widgets/icons');

var BattleNavMenuItem = React.createClass({
    getInitialState() {
        return {expanded: false};
    },
    onPress() {
        this.setState({expanded: !this.state.expanded});
    },
    render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={{flex: 1,backgroundColor: '#fff'}}>
                    <View style={{
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        flex: 1,
                        flexDirection: 'row',
                        margin: 5,
                        padding: 5,
                        backgroundColor: '#eaeaea',
                        borderRadius: 3
                    }}>
                        <Image style={{width: 28, height: 96, resizeMode: 'contain'}}
                            source={this.state.expanded ? icons['arrow-down'] : icons['arrow-right']} />
                        <Image style={{
                            //flex: 1,
                            //width: null,
                            //height: null,
                            width: 64,
                            height: 96,
                            resizeMode: 'contain',
                            //backgroundColor: 'transparent',
                        }} source={icons[this.props.battle.image]} />
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 20,textAlign: 'center',margin: 10}}>{this.props.battle.name}</Text>
                            <Text style={{fontSize: 15,textAlign: 'center',margin: 10,color: 'blue'}}>{this.props.battle.publisher}</Text>
                        </View>
                    </View>
                    {this.state.expanded
                        ? this.props.battle.scenarios.map((scenario,i) => {
                            return (
                                <ScenarioNavMenuItem key={i}
                                    scenario={scenario}
                                    onSelected={this.props.onPress}
                                 />
                            );
                        })
                        : <Text/>
                    }
                </View>
            </TouchableOpacity>
        );
    }
});

module.exports = BattleNavMenuItem;
