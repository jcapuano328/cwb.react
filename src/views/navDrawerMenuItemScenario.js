import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import {Style} from 'react-native-nub';
import moment from 'moment';

var ScenarioNavMenuItem = React.createClass({
    onPress() {
        this.props.onSelected && this.props.onSelected({id: this.props.battle, scenario: {id: this.props.scenario.id}});
    },
    render() {
		let startdt = moment(new Date(this.props.scenario.startDateTime));
		let enddt = moment(new Date(this.props.scenario.endDateTime));
        
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    flex: 1,
                    flexDirection: 'column',
                    margin: 5,
                    //padding: 1,
                    backgroundColor: '#eaeaea',
                    borderRadius: 3,
                }}>
                    <Text style={{fontSize: Style.Font.medium(),textAlign: 'left',marginLeft: 10,marginTop: 2}}>{this.props.scenario.name}</Text>
                    <Text style={{fontSize: Style.Font.smallmedium(),textAlign: 'left',marginLeft: 10,marginTop: 2}}>
                        {startdt.format("MMM DD, YYYY HH:mm")}{' - '}{enddt.format("HH:mm")}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
});

module.exports = ScenarioNavMenuItem;