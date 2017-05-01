import React from 'react';
import { View, TouchableOpacity, Text, Image, ListView } from 'react-native';
import {Arrow,Style} from 'react-native-nub';
import ScenarioNavMenuItem from './navDrawerMenuItemScenario';

var BattleNavMenuItem = React.createClass({
    getInitialState() {
        return {expanded: false};
    },
    onPress() {
        this.setState({expanded: !this.state.expanded});
    },
    render() {
        let battle = this.props.battle || this.props.item || {};
        return (
            <View style={{flex: 1,backgroundColor: '#fff'}}>            
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={this.onPress}>                
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
                            <View style={{marginTop: 40, marginRight: 5}}>
                                <Arrow size={18} direction={this.state.expanded ? 'down' : 'right'} />
                            </View>
                            <Image style={{
                                width: 64,
                                height: 96,
                                resizeMode: 'contain',
                            }} source={this.props.icons[battle.image]} />
                            <View style={{flex: 1}}>
                                <Text style={{fontSize: Style.Font.large(),textAlign: 'center',margin: 10}}>{battle.name}</Text>
                                <Text style={{fontSize: Style.Font.medium(),textAlign: 'center',margin: 10,color: 'blue'}}>{battle.desc}</Text>
                            </View>
                        </View>                                        
                    </TouchableOpacity>
                </View>
                {this.renderScenarios(battle)}
            </View>
        );
    },
    renderScenarios(battle) {
        if (this.state.expanded) {
            return (
                <View>
                    {battle.scenarios.map((scenario,i) => {
                        return (
                            <ScenarioNavMenuItem key={i}
                                battle={battle.id}
                                scenario={scenario}
                                onSelected={this.props.onSelected || this.props.onPress}
                                />
                        );
                    })}                    
                </View>
            );

        }
        return null;                    
    }
});

module.exports = BattleNavMenuItem;